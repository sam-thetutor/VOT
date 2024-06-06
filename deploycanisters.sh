#!/bin/bash
# create the canisters on the local network
NETWORK="local"

dfx canister create icp_ledger_canister --network "${NETWORK}"


dfx canister create frontend --network "${NETWORK}"
dfx canister create backend --network "${NETWORK}"

## store the principal id of the cli user
dfx identity use testID

export MINTER_ACCOUNT_ID=$(dfx ledger account-id)

export DEFAULT_ACCOUNT_ID=$(dfx ledger account-id)


echo "deploying the siws canister"
dfx deploy ic_siws_provider --argument $'(
    record {
        domain = "127.0.0.1";
        uri = "http://127.0.0.1:5173";
        salt = "my secret salt";
        chain_id = opt "mainnet"; 
        scheme = opt "http";
        statement = opt "Login to the app";
        sign_in_expires_in = opt 300000000000;       # 5 minutes
        session_expires_in = opt 604800000000000;    # 1 week
        targets = opt vec {
            "'$(dfx canister id ic_siws_provider)'"; # Must be included
            "'$(dfx canister id backend)'";  # Allow identity to be used with this 
            "'$(dfx canister id frontend)'";  # Allow identity to be used with this canister

        };
    }
)'





## deploy the icp-ledger-canistercanister
echo "Step 2: deploying icp_ledger_canister..."
dfx deploy  icp_ledger_canister --argument "
  (variant {
    Init = record {
      minting_account = \"$MINTER_ACCOUNT_ID\";
      initial_values = vec {
        record {
          \"$DEFAULT_ACCOUNT_ID\";
          record {
            e8s = 10_000_000_000 : nat64;
          };
        };
      };
      send_whitelist = vec {};
      transfer_fee = opt record {
        e8s = 10_000 : nat64;
      };
      token_symbol = opt \"ICP\";
      token_name = opt \"Local ICP\";
    }
  })
" --mode=reinstall -y


##deploy the internet identity canister
echo "Deploying the internet identity canister"
dfx deploy internet_identity --network "${NETWORK}"


echo "Deploying the backend canister"
dfx deploy backend --network "${NETWORK}" 

## Generate the .did files for all the canisters
echo "Generating .did files for the canisters"
dfx generate

## deploy the frontend canister
echo "Deploying the whole application on the network"
dfx deploy --network "${NETWORK}"

echo "Done with the deployment"


# dfx canister call icp_ledger_canister icrc1_transfer '
#   (record {
#     to=(record {
#       owner=(principal "2vxsx-fae")
#     });
#     amount=90_000_0000000000000
#   })
# '



# txsrk-ebkng-zq2zz-x77go-anqz5-pcrm4-73555-j6uhl-5yavj-jiplp-3ae