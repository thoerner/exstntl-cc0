import React, { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  getDailyPrice,
  getMinted,
  getMaxTokens,
  getTimestamp,
  getBlockNumber,
  getMintStart
} from "./utils/interact.js";
import Logo from './images/logo.png';
import Alien from './images/nfts/alien.png';
import AlienSold from './images/nfts/alien.png';
import Dickbutt from './images/nfts/dickbutt.png';
import DickbuttSold from './images/nfts/sold/dickbutt.png';
import Mfer from './images/nfts/mfer.png';
import MferSold from './images/nfts/sold/mfer.png';
import Moonbird from './images/nfts/sold/moonbird.png';
import MoonbirdSold from './images/nfts/sold/moonbird.png';
import Noun from './images/nfts/noun.png';
import NounSold from './images/nfts/sold/noun.png';
import Toad from './images/nfts/toad.png';
import ToadSold from './images/nfts/sold/toad.png';
import Larvalad from './images/nfts/larvalad.png';
import LarvaladSold from './images/nfts/sold/larvalad.png';
import Opensea from './images/os.png';
import Default from './images/cc0x.png';
import X from './images/x.png';
import { CONTRACT_ADDRESS, STATUS_READY, STATUS_NOT_READY } from './utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Eth, Twitter, ToiletPaper } from './components/fas';
import { moonbirdText, dickbuttText, alienText, freeMintText } from './utils/highlights';

library.add(fab, fas);

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [minted, setMinted] = useState(-1);
  const [amount, setAmount] = useState(1);
  const [activeNft, setActiveNft] = useState("default");
  const [prevNft, setPrevNft] = useState(null);
  const maxMint = 20;
  const minMint = 1;

  const nfts = ["moonbird", "dickbutt", "noun", "mfer", "alien", "larvalad", "toad", "default"];
  const nftImgs = [Moonbird, Dickbutt, Noun, Mfer, Alien, Larvalad, Toad, Default];
  const soldNftImgs = [MoonbirdSold, DickbuttSold, NounSold, MferSold, LarvaladSold, ToadSold];


  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    //setStatus(status);
    setPrice(await getDailyPrice());
    var minted = await getMinted();
    setMinted(await minted);
    addWalletListener();
    setActiveNft(nfts[minted]);
  }, []);

  useEffect(() => {
    if (status != "") {
      toast((t) => (status));
    }
  }, [status]);

  const connectWalletPressed = async () => {
     const walletResponse = await connectWallet();
     setStatus(walletResponse.status);
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
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download.html`}>
          You must use Metamask or a Web3 browser to mint.
        </a>
      </p>
    );
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
  }

  return hour + ":" + minutes + t;
}

const SmallSpacer = props => {
  return (
    <div className="small-spacer"></div>
  )
}

const RenderX = props => {
  return (
    <div id="x-container">
      <a href="https://www.exstntl.art/" target="_blank"><img src={X} id="x"></img></a>
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
      target="_blank">
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

const RenderPrice = props => {
  return (
    <div id="price">{price} <Eth/> <span className="small-text">+ gas</span></div>
  );
}

const MintButton = props => {
  var msgs = ["Mint the Bird", "Mint the Dickbutt", "Mint the Noun",
              "Mint the Mfer", "Mint the Alien", "Mint the Slug",
              "Mint the Toad", "Minting Soon"];
  return (
    <div id="mint-button-area">
      <button id="mintButton" onClick={() => mint()}>
        {msgs[minted]}
      </button>
      <RenderPrice/>
    </div>
  );
}

const RenderNfts = props => {
  const nftImages = nfts.map((nft, i) => <span>{activeNft===nft || i===nfts.length-1 ? "" : renderNft(i)}</span>)
  return (
    <div id="nft-container">
      {nftImages}
    </div>
  )
}

const renderNft = (i) => {
  var pnft, psrc, src;
  pnft = nfts[i - 1];
  psrc = nftImgs[i - 1];
  if (minted > i) {
    src = soldNftImgs[i];
  } else {
    src = nftImgs[i];
  }
  const element = <img src={activeNft===nfts[i] ? psrc : src} className="nft" id={activeNft===nfts[i] ? pnft : nfts[i]}
    onClick={() => nftToast(i) }></img>;
  return element;
}

const nftToast = (i) => {
  var msgs = ["Minted by moykle.eth!", "Minted by IronStride!", "Minted by liamtpd.eth!"];
  if (i > msgs.length) {
    var msg = "Coming soon! 🎉";
  } else {
    var msg = msgs[i];
  }
  toast(msg);
}

const RenderFooter = props => {
  return (
    <div id="text-container">
      <p>We meme together. We build together.</p>
      <div id="social-container">
        <a
          href="https://twitter.com/EXSTNTLdotART"
          id="social"
          title="Twitter"
          target="_blank">
            <Twitter/>
        </a>
        <SmallSpacer/>
        <a
          href="https://exstntldotart.notion.site/CC0mune-a55e8d401ad44d9a9a1ee8a9aea6169e"
          id="social"
          title="CC0munal Paper"
          target="_blank">
            <ToiletPaper/>
        </a>
        <SmallSpacer/>
        <a
          href="https://opensea.io/collection/cc0mune"
          id="social"
          title="Opensea"
          target="_blank">
          <span id="social-icon">
            <img id="os-icon" src={Opensea}></img>
          </span>
        </a>
      </div>
    </div>
  )
}

const RenderSubtitle = props => {
  return (
    <div id="subtitle">
      <p>We're not a community, we're a CC0mune.</p>
    </div>
  )
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

  var msgs = ["h00 h00!", "i'm a dickbutt!", nounText, "mfin mfer", "take me to ur leader", "meh", "ribbit", "CC0 ❌ EXSTNL"];
  var emojis = ["🦉", "🍆", "", "🖕", "🛸", "🐌", "🐸", ""];

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
        <MintButton/>
      </div>
      {renderHightLightImage(minted)}

    </div>
  )
}

const onNftClick = (nft) => {
  setPrevNft(activeNft);
  setActiveNft(nft);
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
