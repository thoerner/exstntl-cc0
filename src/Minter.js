import React, { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  getDailyPrice,
  getMinted,
  getTimestamp,
  getMintStart
} from "./utils/interact.js";
import Logo from './images/logo.png';
import Opensea from './images/os.png';
import Default from './images/cc0x.png';

import { Alien, AlienSold,
         Moonbird, MoonbirdSold,
         Dickbutt, DickbuttSold,
         Noun, NounSold,
         Mfer, MferSold,
         Larvalad, LarvaladSold,
         Toad, ToadSold,
         Cryptomarc, CryptomarcSold,
         Dresmarsreal, DresmarsrealSold,
         Fastfoodpunk, FastfoodpunkSold,
         Grifters, GriftersSold,
         Phunk, PhunkSold,
         Tinydino, TinydinoSold,
         Uma, UmaSold } from './images/nfts/';
import { CONTRACT_ADDRESS, STATUS_READY, STATUS_NOT_READY, STATUS_NO_MASK } from './utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Eth, Twitter, ToiletPaper } from './utils/fas';
import { freeMintText } from './utils/highlights';
import { RenderTitle, RenderFooter, MintButton,
         RenderHighlight, RenderNfts, MintCounter,
         WalletButton, RenderX } from './components/';

library.add(fab, fas);

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [minted, setMinted] = useState(-1);
  const [amount, setAmount] = useState(1);

  const nfts = ["moonbird", "dickbutt", "noun",
                "mfer", "alien", "larvalad",
                "toad", "cryptomarc", "dresmarsreal",
                "fastfoodpunk", "grifters", "phunk",
                "tinydino", "uma", "default"];
  const nftImgs = [ Moonbird, Dickbutt, Noun,
                    Mfer, Alien, Larvalad,
                    Toad, Cryptomarc, Dresmarsreal,
                    Fastfoodpunk, Grifters, Phunk,
                    Tinydino, Uma, Default ];
  const soldNftImgs = [ MoonbirdSold, DickbuttSold, NounSold,
                        MferSold, AlienSold, LarvaladSold,
                        ToadSold, CryptomarcSold, DresmarsrealSold,
                        FastfoodpunkSold, GriftersSold, PhunkSold,
                        TinydinoSold, UmaSold];

  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    setPrice(await getDailyPrice());
    setMinted(await getMinted());
    addWalletListener();
  }, []);

  useEffect(() => {
    if (status != "") {
      toast(status);
    }
  }, [status]);

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus(STATUS_READY);
        } else {
          setWallet("");
          setStatus(STATUS_NOT_READY);
        }
      });
    } else {
      setStatus(STATUS_NO_MASK);
    }
  }

  return (
    <div className="Minter">
      <Toaster
        toastOptions={{ position: 'bottom-center',
          style: {
            background: '#1A1A1A',
            color: '#fffcef',
            textAlign: 'center',
          },
        }}
      />
      <RenderX/>
      <WalletButton
        status={status}
        setStatus={setStatus}
        walletAddress={walletAddress}
      />
      <MintCounter
        minted={minted}/>
      <div id="mint-container">
        <RenderTitle/>
        <RenderHighlight
          nftImgs={nftImgs}
          nfts={nfts}
          minted={minted}
          price={price}
        />
        <RenderNfts
          minted={minted}
          soldNftImgs={soldNftImgs}
          nfts={nfts}
          nftImgs={nftImgs}/>
        <RenderFooter/>
      </div>
    </div>
  );
};

export default Minter;
