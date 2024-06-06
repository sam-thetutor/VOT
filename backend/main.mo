import Types "./Types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Int "mo:base/Int";
import List "mo:base/List";
import Trie "mo:base/Trie";
import ICPLedger "canister:icp_ledger_canister";
import Fuzz "mo:fuzz";
import VOT "./vot";

actor class AMERICA() = this {
  let fuzz = Fuzz.Fuzz();
  let VOTLedger = VOT.VOT();


//proposals
stable var proposal_vote_threshold :Nat =0;
stable var proposal_submission_deposit : Nat=0;
stable var tokenTransferFee : Nat=0;


  // store visa purchase history
  private var visaPurchaseHistory = HashMap.HashMap<Text, Types.Visa>(0, Text.equal, Text.hash);
  private var citizenshipPurchaseHistory = HashMap.HashMap<Text, Types.Citizenship>(0, Text.equal, Text.hash);
  private var claimHistory = HashMap.HashMap<Text, Types.ClaimHistory>(0, Text.equal, Text.hash);
  private var countryResidents = HashMap.HashMap<Principal, Types.User>(0, Principal.equal, Principal.hash);

  // private var proposalStore = HashMap.HashMap<Text, Types.Proposal>(0, Text.equal, Text.hash);
  stable var proposalStore = Types.proposals_fromArray([]);


   stable var citizenMultiplier = 1.3;
   stable var visitorMultiplier = 1.1;
   stable var foodStamp :Int=10;
   stable var medicalStamp=10;
   stable var insuranceStamp=10;


  stable let twentyFourInNanoseconds = 24*60*60*1000000000;
  stable let thirtyDaysInNanoseconds : Int = 30 * 24 * 60 * 60 * 1000000000;
  stable var citizenshipCost = 10000000; //cost to obtain permanent citizenship
  stable var visaRenewCost = 50000000;
  stable var visaCost = 100000000; //cost to obtain a visa
  stable var isCountryOpen = true; //bool to open and close the country for new citizens

func proposal_get(id : Nat) : ?Types.Proposal = Trie.get(proposalStore, Types.proposal_key(id), Nat.equal);
func proposal_put(id : Nat, proposal : Types.Proposal) {
    proposalStore := Trie.put(proposalStore, Types.proposal_key(id), Nat.equal, proposal).0;
};




//submit a proposal
public shared({caller}) func submit_proposal(_prop:Types.ProposalPayload,_deadline:Int) : async Types.Response<Text>{

let userBal = await VOTLedger.balanceOf(caller);

if(userBal > proposal_submission_deposit){

  let trans = await VOTLedger.transfer(caller,Principal.fromActor(this),proposal_submission_deposit);
  switch(trans) {
    case(#ok) {
      // let proposalId = fuzz.text.randomAlphabetic(12);

      // let proposalKey = fuzz.text.randomAlphabetic(12);
      let proposalId = fuzz.nat.randomRange(2**128, 2**256);
      let proposalKey = fuzz.nat.randomRange(2**128, 2**256);


      let proposal : Types.Proposal = {
                id=proposalId;
                timestamp = Time.now();
                proposer = caller;
                payload=_prop;
                state = #open;
                deadline=_deadline;
                votes_yes = 0;
                votes_no = 0;
                voters = List.nil();
            };
            proposal_put(proposalKey,proposal);
          //  proposalStore.put(proposalId,proposal);
           return {status = 201;status_text = "Ok";data = null;error_text = null};
    };
    case(_) { 
    return {status = 404;status_text = "Ok";data = null;error_text = ?"proposal submission fee transfer failed"};
    };
  };

}
else{
   return {status = 404;status_text = "Ok";data = null;error_text = ?"user dones not have enough token balance to submit a proposal"}

}
};

//vote on a proposal

public shared({caller}) func vote_on_proposal(args:Types.VoteArgs) : async Types.Response<Types.ProposalState>{

  switch(proposal_get(args.proposal_id)) {
    case(null) {return {status = 404;status_text = "Ok";data = null;error_text = ?"proposal with id not found"}  };
    case(?proposal) {

      var state = proposal.state;
      if(state != #open){
        return {status = 404;status_text = "Ok";data = null;error_text = ?"proposal is not open for voting"}
      };
      switch(countryResidents.get(caller)) {
        case(null) { return {status = 404;status_text = "Ok";data = null;error_text = ?"user does not exisit in the country records"} };
        case(?user) {

          let userBal = await VOTLedger.balanceOf(caller);
          if(userBal == 0){
            {status = 404;status_text = "Ok";data = null;error_text = ?"user does not have enough tokens for voting"}
          }else{
          var votingPower=0;
          if(user.isCitizen){
            votingPower := Int.abs(Float.toInt(Float.fromInt(userBal)*citizenMultiplier))
          }else{
            votingPower := Int.abs(Float.toInt(Float.fromInt(userBal)*visitorMultiplier))
          };

          if (List.some(proposal.voters, func (e : Principal) : Bool = e == caller)) {
            return {status = 404;status_text = "Ok";data = null;error_text = ?"user has already voted"}
            };
            if(Time.now() < proposal.deadline){
            return {status = 404;status_text = "Ok";data = null;error_text = ?"deadline has already paseed"}

            };

            var votes_yes = proposal.votes_yes;
            var votes_no = proposal.votes_no;

            switch (args.vote) {
              case (#yes) { votes_yes += votingPower };
              case (#no) { votes_no += votingPower };
              };

            let voters = List.push(caller, proposal.voters);

             if (votes_yes >= proposal_vote_threshold) {
                              // Refund the proposal deposit when the proposal is accepted
                              ignore do ? {
                                await VOTLedger.transfer(Principal.fromActor(this),proposal.proposer,proposal_submission_deposit);
                              };
                              state := #accepted;
                          };
                          
                          if (votes_no >=proposal_vote_threshold) {
                              state := #rejected;
                          };

                          let updated_proposal = {
                            id=proposal.id;
                              votes_yes;                              
                              votes_no;
                              voters;
                              state;
                              deadline=proposal.deadline;
                              timestamp = proposal.timestamp;
                              proposer = proposal.proposer;
                              payload = proposal.payload;
                          };

                          proposal_put(args.proposal_id,updated_proposal);
                          return {status = 201;status_text = "Ok";data = null;error_text = null}
          };
         };
      };

     };
  };
};

//execute all accepted proposals
func execute_accepted_proposals() : async () {
        let accepted_proposals = Trie.filter(proposalStore, func (_ : Nat, proposal : Types.Proposal) : Bool = proposal.state == #accepted);
        // Update proposal state, so that it won't be picked up by the next heartbeat
        for ((id, proposal) in Trie.iter(accepted_proposals)) {
            update_proposal_state(proposal, #executing);
        };

        for ((id, proposal) in Trie.iter(accepted_proposals)) {
            switch (await execute_proposal(proposal)) {
            case (#ok) { update_proposal_state(proposal, #succeeded); };
            case (#err(err)) { update_proposal_state(proposal, #failed(err)); };
            };
        };
    };


        func execute_proposal(proposal: Types.Proposal) : async Types.Result<(), Text> {
        // try {
        //     let payload = proposal.payload;
        //     ignore await ICRaw.call(payload.canister_id, payload.method, payload.message);
        //     #ok
        // }
        // catch (e) { #err(Error.message e) };
        return #ok();
    };

    func update_proposal_state(proposal: Types.Proposal, state: Types.ProposalState) {
        let updated = {
            state;
            id = proposal.id;
            deadline=proposal.deadline;
            votes_yes = proposal.votes_yes;
            votes_no = proposal.votes_no;
            voters = proposal.voters;
            timestamp = proposal.timestamp;
            proposer = proposal.proposer;
            payload = proposal.payload;
        };
        proposal_put(proposal.id, updated);
    };





//get all the proposals
public query func get_all_proposals():async Types.Response<[Types.Proposal]>{
  let allProposals = Iter.toArray(Iter.map(Trie.iter(proposalStore), func (kv : (Nat, Types.Proposal)) : Types.Proposal = kv.1));

     return {status = 200;status_text = "Ok";data = ?allProposals;error_text = ?"user dones not have enough token balance to submit a proposal"}
};


//get a specific proposal
public func get_proposal_details(_prop:Nat):async Types.Response<Types.Proposal>{
let res = proposal_get(_prop);
     return {status = 200;status_text = "Ok";data = res;error_text = ?"user dones not have enough token balance to submit a proposal"}
};



  //change the cost price of visa
  func changeVisaCost(amount : Nat) : async () {
    visaCost := amount
  };

  //change the cost price of citizenship
  func changeCitizenshipCost(amount : Nat) : async () {
    citizenshipCost := amount
  };

  //close the country from new entries
  func closeCounty() : async () {
    isCountryOpen := false;

  };

  //open the country for new citizens
  func openCounty() : async () {
    isCountryOpen := true;

  };

  //get all the previous claim data

  public query func getClaimHistory():async Types.Response<[(Text,Types.ClaimHistory)]>{
    let res = Iter.toArray<(Text,Types.ClaimHistory)>(claimHistory.entries());
      return {status = 201;status_text = "Ok";data =?res;error_text = null};
  };


//get visa purchase history
public query func getVisaPurchaseHistory():async Types.Response<[(Text,Types.Visa)]>{
    let res = Iter.toArray<(Text,Types.Visa)>(visaPurchaseHistory.entries());
      return {status = 201;status_text = "Ok";data =?res;error_text = null};
  };

  //get citizenship purchase history
  public query func getCitizenPurchaseHistory():async Types.Response<[(Text,Types.Citizenship)]>{
    let res = Iter.toArray<(Text,Types.Citizenship)>(citizenshipPurchaseHistory.entries());
      return {status = 201;status_text = "Ok";data =?res;error_text = null};
  };



  // //get info stats about the country
  // public func get_country_stats():async Types.Response<Types.CountryStats>{
  //    let stats ={
  //     name="Wakanda";
  //     multipliers={
  //       citizen=citizenMultiplier;
  //       visitor=visitorMultiplier
  //     };
  //     priviledges={
  //       food=foodStamp;
  //       medical=medicalStamp;
  //       insurance=insuranceStamp
  //     };
  //     costs={
  //       newVisa=visaCost;
  //       renewVisa=visaRenewCost;
  //       citizenship=citizenshipCost
  //     };
  //     people={
  //       all=countryResidents.size();
  //       citizens=citizenshipPurchaseHistory.size()
  //     };


  //    }l;
  //    return {status = 201;status_text = "Ok";data = ?stats;error_text = null


  // };

  // };


  //purchase visa account

  public shared ({ caller }) func purchaseVisa(_name : Text) : async Types.Response<Text> {
  assert(isCountryOpen ==true);
    switch (countryResidents.get(caller)) {
      case (null) {
         let transferResults = await transferFrom(caller, visaCost);
        switch (transferResults) {
          case (#success(number)) {
            let visaId = fuzz.text.randomAlphabetic(12);
            let nextExpiryDate = Time.now() + thirtyDaysInNanoseconds;

            visaPurchaseHistory.put(
              visaId,
              {dateOfPurchase = Time.now();amount = visaCost;recipient = caller;dateOfExpiry = nextExpiryDate
              },
            );
            countryResidents.put(
              caller,
              {isCitizen = false;isVisitor = true;userName = _name;visaExpiryDate = ?nextExpiryDate;lastInsuranceClaim = 0;lastFoodClaim = 0;lastHospitalClaim = 0;tokens = 0
              },
            );
            return {status = 201;status_text = "Ok";data = null;error_text = null
            }
          };
          case (#error(text)) {
            let errText = "visa purchase failed ";
            return {status = 404;status_text = "Ok";data = null;error_text = ?errText
            }
          }
        }
      };
      case (?user) {
        return {status = 404;status_text = "Ok";data = null;error_text = ?"unable to purchase a visa at the moment"
        };

      }
    };

  };

  //renew the visa for a month

  public shared ({ caller }) func renewVisa() : async Types.Response<Text> {
assert(isCountryOpen ==true);
    switch (countryResidents.get(caller)) {
      case (?data) {
        if (data.isVisitor) {
          switch (data.visaExpiryDate) {
            case (?date) {

              let transferResults = await transferFrom(caller, visaRenewCost);
              switch (transferResults) {
                case (#success(number)) {
                  let visaId = fuzz.text.randomAlphabetic(12);

                  let newExpiryDate = switch (data.visaExpiryDate) {
                    case (null) { thirtyDaysInNanoseconds };
                    case (?date) { date + thirtyDaysInNanoseconds }
                  };

                  visaPurchaseHistory.put(
                    visaId,
                    {dateOfPurchase = Time.now();amount = visaCost;recipient = caller;dateOfExpiry = newExpiryDate
                    },
                  );
                  countryResidents.put(
                    caller,
                    {
                      data with visaExpiryDate = ?newExpiryDate;

                    },
                  );
                  return {status = 201;status_text = "Ok";data = null;error_text = null
                  }

                };
                case (#error(text)) {
                  return {status = 404;status_text = "Ok";data = null;error_text = ?"failed to renew visa"
                  }

                }
              };

            };
            case (null) {

              return {status = 404;status_text = "Ok";data = null;error_text = ?"visa has no expiry date"
              }
            }
          };

        } else if (data.isCitizen) {
          return {status = 404;status_text = "Ok";data = null;error_text = ?"you dont have any visa to renew. purchase one first"
          }

        } else {
          return {status = 404;status_text = "Ok";data = null;error_text = ?"unable to renew visa at the moment"
          }
        }
      };
      case (null) {
        return {status = 404;status_text = "Ok";data = null;error_text = ?"you dont have any visa to renew. purchase one first"
        }
      }
    }
  };

  //purchase citizenship
  public shared ({ caller }) func purchaseCitizenShip(_name : Text) : async Types.Response<Text> {
assert(isCountryOpen ==true);
    switch (countryResidents.get(caller)) {
      case (null) {
         let transferResults = await transferFrom(caller, citizenshipCost);
        switch (transferResults) {
          case (#success(number)) {
            let citizenshipId = fuzz.text.randomAlphabetic(12);
            citizenshipPurchaseHistory.put(
              citizenshipId,
              {dateOfPurchase = Time.now();amount = citizenshipCost;recipient = caller},
            );

            countryResidents.put(
              caller,
              {isCitizen = true;isVisitor = false;userName = _name;visaExpiryDate = null;lastInsuranceClaim = 0;lastFoodClaim = 0;lastHospitalClaim = 0;tokens = 0
              },
            );
            return {status = 201;status_text = "Ok";data = null;error_text = null
            }
          };
          case (#error(text)) {
            return {status = 404;status_text = "Ok";data = null;error_text = ?"citizenship purchase failed"
            }
          }
        };

      };
      case (?data) {
      return {status = 404;status_text = "Ok";data = null;error_text = ?"citizenship purchase failed"
      }
    };

  };
  };

  //upgrade from visa to citizenship
  public shared({caller}) func upgradeToCitizenship():async Types.Response<Text>{
    assert(isCountryOpen);
    switch(countryResidents.get(caller)) {
      case(null) { 
        return {status = 404;status_text = "Ok";data = null;error_text = ?"use is not registered anywhere"}
       };
      case(?data) {

        if(data.isCitizen){
          return {status = 404;status_text = "Ok";data = null;error_text = ?"user already citizen"}

        }else  if(data.isVisitor){
          let transferResults = await transferFrom(caller, citizenshipCost);
          switch (transferResults) {
            case (#success(number)) {
              let citizenshipId = fuzz.text.randomAlphabetic(12);
              citizenshipPurchaseHistory.put(citizenshipId,{dateOfPurchase = Time.now();amount = citizenshipCost;recipient = caller});
              countryResidents.put(caller,{data with isCitizen=true;isVisitor=false;visaExpiryDate=null;});
              return {status = 201;status_text = "Ok";data = null;error_text = null
              }
            };
            case (#error(text)) {
              return {status = 404;status_text = "Ok";data = null;error_text = ?"citizenship purchase failed"
              }
            }
          };

        }else{
          return {status = 404;status_text = "Ok";data = null;error_text = ?"unable to upgrade citizenship"}
        }

       };
    };
  };

  //get the profile of the citizen
  public func get_citizen_profile(_cit:Principal) :async Types.Response<Types.User>{
    let _user = countryResidents.get(_cit);
    return {status = 200;status_text = "Ok";data =_user; error_text = null}
  };

  //get all citizens
  public query func get_all_citizens():async Types.Response<[(Principal,Types.User)]>{
        return {status = 200;status_text = "Ok";data =?Iter.toArray<(Principal,Types.User)>(countryResidents.entries()); error_text = null}
  };

  
// claim the insurance money
public shared({caller}) func claimFoodPriviledge():async Types.Response<Text>{
  switch(countryResidents.get(caller)) {
    case(?data) {

      var _amt:Nat =0;

      if(data.isCitizen){
        _amt:= Int.abs(Float.toInt(Float.fromInt(foodStamp)*citizenMultiplier));
      }else {
        _amt := Int.abs(Float.toInt(Float.fromInt(foodStamp) * visitorMultiplier));
      };

      if(Time.now() < data.lastFoodClaim + twentyFourInNanoseconds){
        return {status = 404;status_text = "Ok";data =null; error_text = ?"you can onl claim one a day"}

      };

      let claimData = {claimType=#food;recipient=caller;timeOfClaim=Time.now();amount=_amt;isClaimed=true;};
     let claimId = fuzz.text.randomAlphabetic(12);
     let mintClaim = await VOTLedger.mint(caller,_amt);

     if(mintClaim == #ok()){

      countryResidents.put(caller,{data with lastFoodClaim=Time.now()});

      claimHistory.put(claimId,claimData);
    return {status = 200;status_text = "Ok";data =null; error_text = null}
     }else{
      claimHistory.put(claimId,{claimData with isClaimed = false});
      countryResidents.put(caller,{data with lastFoodClaim=Time.now()});
      return {status = 200;status_text = "Ok";data =null; error_text = ?"failed to claim foodstamp"}

     }
    };
    case(null) {
      return {status = 404;status_text = "Ok";data = null;error_text = ?"user does not exist"}
     };
  };
};


//claim medical stamps. ideally should be once per month
public shared({caller}) func claimHospitalPriviledge():async Types.Response<Text>{
  switch(countryResidents.get(caller)) {
    case(?data) {

      var _amt =0;

      if(data.isCitizen){
        _amt:= Int.abs(Float.toInt(Float.fromInt(medicalStamp)*citizenMultiplier));
      }else {
        _amt := Int.abs(Float.toInt(Float.fromInt(medicalStamp) * visitorMultiplier));
      };

      if(Time.now() < data.lastHospitalClaim + 30*twentyFourInNanoseconds){
      return {status = 200;status_text = "Ok";data =null; error_text = ?"you can only claim once per month"}

      };

      let claimData = {claimType=#medical;recipient=caller;timeOfClaim=Time.now();amount=_amt;isClaimed=true};
     let claimId = fuzz.text.randomAlphabetic(12);
    let mintClaim = await VOTLedger.mint(caller,_amt);

if(mintClaim == #ok){
      claimHistory.put(claimId,claimData);
      countryResidents.put(caller,{data with lastHospitalClaim=Time.now()});

      return {status = 200;status_text = "Ok";data =null; error_text = null}
    }else{
      claimHistory.put(claimId,{claimData with isClaimed=false});
      countryResidents.put(caller,{data with lastHospitalClaim=Time.now()});
      return {status = 200;status_text = "Ok";data =null; error_text =?"claiming hospital failed"}
    }
    };
    case(null) {
      return {status = 404;status_text = "Ok";data = null;error_text = ?"user does not exist"}



     };
  };
};


//claim insurance stamps. ideally should be once per month
public shared({caller}) func claimInsurancePriviledge():async Types.Response<Text>{
  switch(countryResidents.get(caller)) {
    case(?data) {

      var _amt =0;

      if(data.isCitizen){
        _amt:= Int.abs(Float.toInt(Float.fromInt(insuranceStamp)*citizenMultiplier));
      }else {
        _amt := Int.abs(Float.toInt(Float.fromInt(insuranceStamp) * visitorMultiplier));
      };

      if(Time.now() < data.lastInsuranceClaim + 30*twentyFourInNanoseconds){
    return {status = 200;status_text = "Ok";data =null; error_text = ?"you can only claim insurance once per month"}

      };

      let claimData = {claimType=#insurance;recipient=caller;timeOfClaim=Time.now();amount=_amt;isClaimed=true;};

     let claimId = fuzz.text.randomAlphabetic(12);
     let mintClaim = await VOTLedger.mint(caller,_amt);

     if(mintClaim == #ok()){
      claimHistory.put(claimId,claimData);
            countryResidents.put(caller,{data with lastInsuranceClaim=Time.now()});

    return {status = 200;status_text = "Ok";data =null; error_text = null}
     }else{
      countryResidents.put(caller,{data with lastInsuranceClaim=Time.now()});
      claimHistory.put(claimId,{claimData with isClaimed = false});
      return {status = 200;status_text = "Ok";data =null; error_text = ?"failed to claim foodstamp"}

     }      
    };
    case(null) {
      return {status = 404;status_text = "Ok";data = null;error_text = ?"user does not exist"}
     };
  };
};



//get token balance of the user
public func get_user_token_balance(_usr:Principal):async Types.Response<Nat>{
  let bal = await VOTLedger.balanceOf(_usr);
  return {status = 200;status_text = "Ok";data = ?bal;error_text = null}
};

//transfer tokens to another user
public shared({caller}) func transfer_tokens(_rec:Principal,_amt:Nat):async Types.Response<Text>{
  let res = await VOTLedger.transfer(caller,_rec,_amt-tokenTransferFee);
  switch(res) {
    case(#ok()) {
        return {status = 200;status_text = "Ok";data = null;error_text = null}
      };
    case(#err(error)) {
        return {status = 404;status_text = "Ok";data = null;error_text = ?error}
     };
  };
};
//get the token total supply
public func get_total_supply():async Nat{
  return await VOTLedger.totalSupply();
};


//change the citizen multiplier
func changeCitizenMultiplier(_amt:Float):async(){
  citizenMultiplier :=_amt
};

//change the visitor multiplier
func changeVisitorMultiplier(_amt:Float):async(){
  visitorMultiplier :=_amt
};


//chnage the visa purchase cost fee

func changeVisaPurchaseCost(_amt:Float):async(){
  citizenMultiplier :=_amt
};

func changeVisaRenewCost(_amt:Float):async(){
  citizenMultiplier :=_amt
};
























  func transferFrom(owner_ : Principal, amount_ : Nat) : async Types.TransferResult {
    Debug.print("transferring from " #Principal.toText(owner_) # " by " #Principal.toText(Principal.fromActor(this)) # " " #Nat.toText(amount_));
    let transferResult = await ICPLedger.icrc2_transfer_from({
      from = { owner = owner_; subaccount = null };
      amount = amount_;
      fee = null;
      created_at_time = null;
      from_subaccount = null;
      to = { owner = Principal.fromActor(this); subaccount = null };
      spender_subaccount = null;
      memo = null
    });
    var res = 0;
    switch (transferResult) {
      case (#Ok(number)) {
        return #success(number)
      };
      case (#Err(msg)) {Debug.print("transfer error  ");
        switch (msg) {
          case (#BadFee(number)) {return #error("Bad Fee")};
          case (#GenericError(number)) {return #error("Generic")};
          case (#BadBurn(number)) {return #error("BadBurn")};
          case (#InsufficientFunds(number)) {return #error("Insufficient Funds")};
          case (#InsufficientAllowance(number)) {return #error("Insufficient Allowance ")};
          case _ {Debug.print("ICP err")}};
        return #error("ICP transfer other error")
      }
    }
  };
}
