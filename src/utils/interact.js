import React, { useEffect, useState } from 'react';
import { isMobile } from "react-device-detect";
import { METAMASK_REDIRECT_URL, CONTRACT_ADDRESS, STATUS_READY, STATUS_NOT_READY } from "./constants";

require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require('../contract-abi.json')
const contractAddress = CONTRACT_ADDRESS;

export const getBlockNumber = () => {
  var blockNumber = web3.eth.getBlockNumber();
  return blockNumber;
}

export const getTimestamp = async () => {
  var blockNumber = await getBlockNumber();
  var block = await web3.eth.getBlock(blockNumber);
  var timestamp = block.timestamp;
  return timestamp;
}

export const getMintStart = async () => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  const mintStart = await contract.methods.dailyMintStart().call();
  return mintStart;
}

export const getDailyPrice = async () => {
  const contract = await new web3.eth.Contract(contractABI, contractAddress);
  const price = await contract.methods.dailyPrice().call();
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
  if (window.ethereum) {
     window.contract = await new web3.eth.Contract(contractABI, contractAddress);

      //set up your Ethereum transaction
     const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            value: web3.utils.toHex(web3.utils.toWei(String(await getDailyPrice() * amount), 'ether')), // set payment amount
            'data': window.contract.methods.dailyMint(amount).encodeABI()//make call to NFT smart contract
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
              <div>
                ✅{" "}Check out your transaction on Etherscan:{" "}
                <a target="_blank" id="success" href={'https://etherscan.com/tx/' + txHash}>
                  {'https://etherscan.com/tx/' + txHash}
                </a>
              </div>
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
        status: STATUS_READY,
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
          status: STATUS_READY,
        };
      } else {
        return {
          address: "",
          status: STATUS_NOT_READY,
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
