import React, { useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
import { METAMASK_REDIRECT_URL, CONTRACT_ADDRESS } from "./constants";

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../contract-abi.json')
const contractAddress = CONTRACT_ADDRESS;

export const getPrice = async () => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  const price = await contract.methods.price().call();
  return price / (10 ** 18);
}

export const getMinted = async () => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  const minted = await contract.methods.totalSupply().call();
  return minted;
}

export const getMaxTokens = async () => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  const maxTokens = await contract.methods.maxTokens().call();
  return maxTokens;
}

export const mintNFT = async (amount) => {
  //error handling
   if (amount.trim() == "") {
     return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
     }
    }
  if (window.ethereum) {
     window.contract = await new web3.eth.Contract(contractABI, contractAddress);

      //set up your Ethereum transaction
     const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            value: web3.utils.toHex(web3.utils.toWei(String(await getPrice() * amount), 'ether')), // set payment amount
            'data': window.contract.methods.mint(amount).encodeABI()//make call to NFT smart contract
     };

    //sign the transaction via Metamask
     try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: (
              <span>
                <p>
                  {" "}
                  ✅{" "}
                  Check out your transaction on Etherscan:{" "}
                  <a target="_blank" id="success" href={`https://rinkeby.etherscan.io/tx/` + txHash}>
                    {`https://rinkeby.etherscan.io/tx/` + txHash}
                  </a>
                </p>
              </span>
            ),
        }
     } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }

     }

   } else {
     window.location.href = METAMASK_REDIRECT_URL;
     return {
       address: "",
       status: (
         <span>
           <p>
             {" "}
             🦊{" "}
             <a target="_blank" href={`https://metamask.io/download.html`}>
               You must use Metamask or a Web3 browser to mint.
             </a>
           </p>
         </span>
       ),
     };
   }

}

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Press the button to mint your NFTs.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    window.location.href = METAMASK_REDIRECT_URL;
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must use Metamask or a Web3 browser to mint.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Press the buttons to mint your NFT(s).",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top left button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {

    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must use Metamask or a Web3 browser to mint.
            </a>
          </p>
        </span>
      ),
    };
  }
};