import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Float "mo:base/Float";
import List "mo:base/List";
import Trie "mo:base/Trie";

module {

  public type Citizen = {
    dateOfEntry : Nat;
    userName : Text;
    lastInsuranceClaim : Int;
    lastFoodCalim : Int;
    lastHospitalClaim : Int;
    tokens : Nat
  };

  public type User = {
    isCitizen : Bool;
    isVisitor : Bool;
    userName : Text;
    visaExpiryDate : ?Int;
    lastInsuranceClaim : Int;
    lastFoodClaim : Int;
    lastHospitalClaim : Int;
    tokens : Nat
  };

  public type Visa = {
    dateOfPurchase : Int;
    amount : Nat;
    recipient : Principal;
    dateOfExpiry : Int
  };

  public type Citizenship = {
    dateOfPurchase : Int;
    amount : Nat;
    recipient : Principal
  };

  public type ProposalPayload = {
    title:Text;
    description:Text;
    execFunc:{
    #changeVisaCost : Nat;
    #changeCitizenshipCost : Nat;
    #closeCountry;
    #openCountry;
    #changeVisitorMultiplier : Float;
    #changeCitizenMultiplier : Float;
    #changeVisaPurchaseCost : Nat;
    #changeVisaRenewCost : Nat
    }
  };

  public type CountryStats = {
    name : Text;
    mutlipliers : {
      citizen : Text;
      visitor : Text
    };
    priviledges : {
      food : Nat;
      medical : Nat;
      insurance : Nat
    };
    costs : {
      newVisa : Nat;
      renewVisa : Nat;
      citizenship : Nat
    };
    people : {
      all : Nat;
      citizens : Nat
    };

  };

  public type ClaimHistory = {
    claimType : {
      #food;
      #medical;
      #insurance
    };
    recipient : Principal;
    timeOfClaim : Int;
    amount : Int;
    isClaimed : Bool;

  };

  public type Result<Ok, Err> = Result.Result<Ok, Err>;

  public type Asset = {
    id : Text;
    name : Text;
    purchaseAmount : Nat;
    revenuePerDay : Nat;
    lastClaimDate : Int
  };

  public type TransferResult = {
    #success : Nat;
    #error : Text
  };

  public type Response<T> = {
    status : Nat16;
    status_text : Text;
    data : ?T;
    error_text : ?Text
  };


 public type Proposal = {
    id:Nat;
    votes_no : Nat;
    voters : List.List<Principal>;
    state : ProposalState;
    timestamp : Int;
    deadline:Int;
    proposer : Principal;
    votes_yes : Nat;
    payload : ProposalPayload;
  };

public type Vote = { #no; #yes };
public type VoteArgs = { vote : Vote; proposal_id : Nat };


public type ProposalState = {
      // A failure occurred while executing the proposal
      #failed : Text;
      // The proposal is open for voting
      #open;
      // The proposal is currently being executed
      #executing;
      // Enough "no" votes have been cast to reject the proposal, and it will not be executed
      #rejected;
      // The proposal has been successfully executed
      #succeeded;
      // Enough "yes" votes have been cast to accept the proposal, and it will soon be executed
      #accepted;
  };

public func proposal_key(t:Nat) : Trie.Key<Nat> = { key = t; hash = Int.hash t };
 public func proposals_fromArray(arr: [(Nat,Proposal)]) : Trie.Trie<Nat, Proposal> {
      var s = Trie.empty<Nat, Proposal>();
      for ((id,proposal) in arr.vals()) {
          s := Trie.put(s, proposal_key(id), Nat.equal, proposal).0;
      };
      s
  };




}
