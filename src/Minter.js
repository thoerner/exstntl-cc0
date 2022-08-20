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
import X from './images/x.png';
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
import { RenderSubtitle, RenderFooter, MintButton } from './components/';

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

  const connectWalletPressed = async () => {
     const walletResponse = await connectWallet();
     var tempStatus = status;
     setStatus(walletResponse.status);
     if (tempStatus === walletResponse.status) {
       toast(status);
     }
     setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(String(amount));
    setStatus(status);
  };

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

const getDate = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).substr(-2);
  var day = ("0" + date.getDate()).substr(-2);

  return month + "/" + day + "/" + year ;
}

const getTime = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var t = "AM";
  var hour = ("0" + date.getHours()).substr(-2);
  var minutes = ("0" + date.getMinutes()).substr(-2);
  var seconds = ("0" + date.getSeconds()).substr(-2);

  if (hour > 12) {
    hour = hour - 12;
    t = "PM";
  } else if (hour == 0) {
    hour = 12;
  }

  return hour + ":" + minutes + t;
}



const RenderX = props => {
  return (
    <div id="x-container">
      <a href="https://www.exstntl.art/" target="_blank" rel="noreferrer"><img src={X} id="x"></img></a>
    </div>
  )
}

const WalletButton = props => {
  return (
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
}

const MintCounter = props => {
  return (
    <a
      href={"https://etherscan.com/token/" + CONTRACT_ADDRESS}
      target="_blank"
      rel="noreferrer">
      <p id="mint-counter">
        <span id="count">{minted}</span> / <span id="qmark">?</span> minted
      </p>
    </a>
  );
}

const RenderTitle = props => {
  return (
    <div id="logoContainer">
      <a href="#"><img src={Logo} id="logo"></img></a>
      <RenderSubtitle/>
    </div>
  );
}





const RenderNfts = props => {
  const nftImages = nfts.map((nft, i) => <span>{nfts[minted]===nft || i===nfts.length-1 ? "" : renderNft(i)}</span>)
  return (
    <div id="nft-container">
      {nftImages}
    </div>
  )
}

const renderNft = (i) => {
  var nft, src;
  if (minted > i) {
    src = soldNftImgs[i];
    nft = nfts[i];
  } else if (minted === i) {
    src = nftImgs[i - 1];
    nft = nfts[i - 1];
  } else {
    src = nftImgs[i];
    nft = nfts[i];
  }
  const element = <img src={src} className="nft" id={nft}
    onClick={() => nftToast(i) }></img>;
  return element;
}

const nftToast = (i) => {
  var minters = [ "moykle.eth", "IronStride", "liamtpd.eth",
                  "mniml.eth", "anon 0xE8a1...c990", "our friend 0xE8a1",
                  "a dedicated collector", "chonkyrubi.eth", "a Protector ⚔️🛡️",
                  "localcryptogod.eth", "ultrajack.eth", "anon 0x0DAE...6183"];
  if (i >= minters.length && i > minted) {
    var msg = "Coming soon! 🎉";
  } else if ( i >= minters.length && minters.length <= i ) {
    var msg = "Just minted!";
  } else {
    var msg = "Minted by " + minters[i] + "!";
  }
  toast(msg);
}

const renderHightLightImage = (i) => {
  var src = nftImgs[i];
  const element = <img src={src} className="nft activeNft" id={nfts[i]} onClick={() => onActiveNftClick()}></img>;
  return element;
}

const onActiveNftClick = () => {
  var nounText = <div>
    <strong>noun <i>/naʊn/</i></strong>
    <br></br>
    a word that refers to a person,
    place, thing, event, substance, or quality
  </div>

  var msgs = ["h00 h00!", "i'm a dickbutt!", nounText,
              "mfin mfer", "take me to ur leader", "meh",
              "ribbit", "Marcy Marc", "More brain. More power.",
              "Would you like CC0 with that?", "Grifters gonna grift.",
              "Let's get Phunky", "Not extinct.", "Uma", "CC0 ❌ EXSTNL"];
  var emojis = ["🦉", "🍆", "", "🖕", "🛸", "🐌",
                "🐸", "💁", "🧠", "🍟", "💰", "🔥", "🦖", "🌍"];

  toast(msgs[minted], { icon: emojis[minted] });
}

const mint = async () => {
  var mintStart = await getMintStart();
  var time = await getTimestamp();
  if (time < mintStart) {
    var date = await getDate(mintStart);
    var time = await getTime(mintStart);
    toast("Mint inactive until \n" + date + " @ " + time + "!");
  } else {
    let tx = await mintNFT(1);
    if (tx.success == true) {
      toast(tx.status,
      { style: {
        minWidth: '90vw',
        duration: 10000,
        },
      });
    } else {
      toast(tx.status);
    }
  }
}

const RenderHighlight = props => {
  var text = freeMintText;
  return (
    <div id="highlight">
      <div id="highlight-left-container">
        <div id="highlight-text-container">
          {text}
        </div>
        <MintButton
          mint={mint}
          price={price}
          minted={minted}
        />
      </div>
      {renderHightLightImage(minted)}
    </div>
  )
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
      <WalletButton/>
      <MintCounter/>
      <div id="mint-container">
        <RenderTitle/>
        <RenderHighlight/>
        <RenderNfts/>
        <RenderFooter/>
      </div>
    </div>
  );
};

export default Minter;
