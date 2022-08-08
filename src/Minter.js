import React, { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  getPrice,
  getMinted,
  getMaxTokens
} from "./utils/interact.js";
import Logo from './images/logo.png';
import Alien from './images/nfts/alien.png';
import Dickbutt from './images/nfts/dickbutt.png';
import Mfer from './images/nfts/mfer.png';
import Moonbird from './images/nfts/moonbird.png';
import Noun from './images/nfts/noun.png';
import Toad from './images/nfts/toad.png';
import X from './images/x.png';
import { STATUS_READY, STATUS_NOT_READY } from './utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Caret, Eth, Twitter } from './components/fas';
import { moonbirdText, dickbuttText, alienText } from './utils/highlights';

library.add(fab, fas);


const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [minted, setMinted] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [amount, setAmount] = useState(1);
  const [activeNft, setActiveNft] = useState("moonbird");
  const [prevNft, setPrevNft] = useState(null);
  const maxMint = 20;
  const minMint = 1;


  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    //setStatus(status);
    setPrice(await getPrice());
    setMinted(await getMinted());
    setMaxTokens(await getMaxTokens());
    addWalletListener();
  }, []);

  useEffect(() => {
    if (status != "") {
      toast(status, {
        position: "bottom-center",
        style: {
          background: '#1A1A1A',
          color: '#fffcef',
          textAlign: 'center',
        },
      });
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

  function addWalletListener() {
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const incAmount = () => {
  if (amount < maxMint) {
    setAmount(amount + 1);
  }
}

const decAmount = () => {
  if (amount > minMint) {
    setAmount(amount - 1);
  }
}

const Switch = props => {
  const { test, children } = props;
  // filter out only children with a matching prop
  return children.find(child => {
    return child.props.value === test
  });
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

const RenderLogo = props => {
  return (
    <div id="logoContainer">
      <img src={Logo} id="logo"></img>
    </div>
  );
}

const RenderPrice = props => {
  return (
    <div id="price">{price} ETH</div>
  );
}

const MintButton = props => {
  return (
    <button class="button one" id="mintButton" onClick={onMintPressed}>
      Mint
    </button>
  );
}

const MintCounter = props => {
  return (
    <p>{minted} / {maxTokens} minted</p>
  );
}

const RenderStatus = props => {
  return (
    <p id="status">
      {status}
    </p>
  );
}

function renderNft(nft) {
  var pSrc = null;
  var cSrc = null;
  switch (prevNft) {
    case "moonbird":
      pSrc = Moonbird;
      break;
    case "dickbutt":
      pSrc = Dickbutt;
      break;
    case "alien":
      pSrc = Alien;
      break;
    case "noun":
      pSrc = Noun;
      break;
    case "mfer":
      pSrc = Mfer;
      break;
    case "toad":
      pSrc = Toad;
      break;
    default:
  }
  switch (nft) {
    case "moonbird":
      cSrc = Moonbird;
      break;
    case "dickbutt":
      cSrc = Dickbutt;
      break;
    case "alien":
      cSrc = Alien;
      break;
    case "noun":
      cSrc = Noun;
      break;
    case "mfer":
      cSrc = Mfer;
      break;
    case "toad":
      cSrc = Toad;
      break;
    default:
  }
  const element = <img src={activeNft===nft ? pSrc : cSrc} className="nft" id={activeNft===nft ? prevNft : nft}></img>;
  return element;
}

const RenderNfts = props => {

  return (
    <div id="nft-container">
      {activeNft==="moonbird" ? "" : renderNft("moonbird")}
      {activeNft==="dickbutt" ? "" : renderNft("dickbutt")}
      {activeNft==="alien" ? "" : renderNft("alien")}
      {activeNft==="noun" ? "" : renderNft("noun")}
      {activeNft==="mfer" ? "" : renderNft("mfer")}
      {activeNft==="toad" ? "" : renderNft("toad")}
    </div>
  )
}

const RenderTextContent = props => {
  return (
    <div id="text-container">
      <p>We meme together. We build together.
      {" "}<a href="https://twitter.com/EXSTNTLdotART" id="social" target="_blank"><Twitter/></a>
      </p>
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

const RenderX = props => {
  return (
    <div id="x-container">
      <img src={X} id="x"></img>
    </div>
  )
}

function renderHightLightImage(nft) {
  var cSrc = null;
  switch (nft) {
    case "moonbird":
      cSrc = Moonbird;
      break;
    case "dickbutt":
      cSrc = Dickbutt;
      break;
    case "alien":
      cSrc = Alien;
      break;
    case "noun":
      cSrc = Noun;
      break;
    case "mfer":
      cSrc = Mfer;
      break;
    case "toad":
      cSrc = Toad;
      break;
    default:
  }
  const element = <img src={cSrc} className="nft activeNft" id={nft}></img>;
  return element;
}

const RenderHighlight = props => {
  var text = null;
  switch (activeNft) {
    case "moonbird":
      text = moonbirdText;
      break;
    case "dickbutt":
      text = dickbuttText;
      break;
    case "alien":
      text = alienText;
      break;
    default:
      text = "blah";
  }
  return (
    <div id="highlight">
      <div id="highlight-text-container">
        {text}
      </div>
      {renderHightLightImage(activeNft)}
    </div>
  )
}

function onNftClick(nft) {
  setPrevNft(activeNft);
  setActiveNft(nft);
}

  return (
    <div className="Minter">
      <Toaster/>
      <RenderX/>
      <WalletButton/>

      <div id="mint-container">
        <RenderLogo/>
        <RenderSubtitle/>
        <RenderHighlight/>
        <RenderNfts/>
        <RenderTextContent/>
      </div>

    </div>
  );
};

export default Minter;
