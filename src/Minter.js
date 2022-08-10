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
import { Caret, Eth, Twitter, ToiletPaper } from './components/fas';
import { moonbirdText, dickbuttText, alienText, freeMintText } from './utils/highlights';

library.add(fab, fas);


const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [minted, setMinted] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [amount, setAmount] = useState(1);
  const [activeNft, setActiveNft] = useState("default");
  const [prevNft, setPrevNft] = useState(null);
  const maxMint = 20;
  const minMint = 1;


  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address);
    //setStatus(status);
    setPrice(await getDailyPrice());
    var minted = await getMinted();
    setMinted(await minted);
    setMaxTokens(await getMaxTokens());
    addWalletListener();
    switch (true) {
      case minted == 0:
        setActiveNft("moonbird");
        break;
      case minted == 1:
        setActiveNft("dickbutt");
        break;
      case minted == 2:
        setActiveNft("noun");
        break;
      case minted == 3:
        setActiveNft("mfer");
        break;
      case minted == 4:
        setActiveNft("alien");
        break;
      case minted == 5:
        setActiveNft("larvalad");
        break;
      case minted == 6:
        setActiveNft("toad");
        break;
      default:
        setActiveNft("default")
    }
  }, []);

  useEffect(() => {
    console.log(status);
    if (status != "") {
      toast((t) => (status), {
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
      <a href="#"><img src={Logo} id="logo"></img></a>
    </div>
  );
}

const RenderPrice = props => {
  return (
    <div id="price">{price} ETH</div>
  );
}

const MintButton = props => {
  var text = '';
  switch (activeNft) {
    case "moonbird":
      text = 'Mint the Bird';
      break;
    case "dickbutt":
      text = 'Mint the Dickbutt';
      break;
    case "mfer":
      text = 'Mint the Mfer';
      break;
    case "alien":
      text = 'Mint the Alien';
      break;
    case "noun":
      text = 'Mint the Noun';
      break;
    case "larvalad":
      text = 'Mint the Slug';
      break;
    case "toad":
      text = 'Mint the Toad';
      break;
    default:
      text = 'Coming Soon';
  }
  return (
    <button id="mintButton" onClick={() => mint()}>
      {text}
    </button>
  );
}

const MintCounter = props => {
  return (
    <a href={"https://etherscan.com/token/" + CONTRACT_ADDRESS} target="_blank"><p id="mint-counter"><span id="count">{minted}</span> / <span id="qmark">?</span> minted</p></a>
  );
}

const RenderStatus = props => {
  return (
    <p id="status">
      {status}
    </p>
  );
}

const renderNft = (nft) => {
  var psrc = null;
  var pnft = null;
  var src = null;
  switch (nft) {
    case "moonbird":
      src = Moonbird;
      break;
    case "dickbutt":
      pnft = "moonbird";
      psrc = Moonbird;
      if (minted > 1) {
        src = DickbuttSold;
      } else {
        src = Dickbutt;
      }
      break;
    case "noun":
      pnft = "dickbutt";
      psrc = Dickbutt;
      if (minted > 2) {
        src = NounSold;
      } else {
        src = Noun;
      }
      break;
    case "mfer":
      pnft = "noun";
      psrc = Noun;
      if (minted > 3) {
        src = MferSold;
      } else {
        src = Mfer;
      }
      break;
    case "alien":
      pnft = "mfer";
      psrc = Mfer;
      if (minted > 4) {
        src = AlienSold;
      } else {
        src = Alien;
      }
      break;
    case "larvalad":
      pnft = "alien";
      psrc = Alien;
      if (minted > 5) {
        src = LarvaladSold;
      } else {
        src = Larvalad;
      }
      break;
    case "toad":
      pnft = "larvalad";
      psrc = Larvalad;
      if (minted > 6) {
        src = ToadSold;
      } else {
        src = Toad;
      }
      break;

    default:
  }
  const element = <img src={activeNft===nft ? psrc : src} className="nft" id={activeNft===nft ? pnft : nft}
    onClick={() => nftToast(nft) }></img>;
  return element;
}

const nftToast = (nft) => {
  if (nft == "noun") {
    toast("Minted by liamtpd.eth!",
      { position: 'bottom-center',
        style: {
        background: '#1A1A1A',
        color: '#fffcef',
        textAlign: 'center',
        },
      });
  } else if (nft == "dickbutt") {
    toast("Minted by IronStride!",
      { position: 'bottom-center',
        style: {
        background: '#1A1A1A',
        color: '#fffcef',
        textAlign: 'center',
        },
      });
  } else if (nft == "moonbird") {
    toast("Minted by moykle.eth!",
      { position: 'bottom-center',
        style: {
        background: '#1A1A1A',
        color: '#fffcef',
        textAlign: 'center',
        },
      });
  } else {
    toast("Coming soon! 🎉",
      { position: 'bottom-center',
        style: {
        background: '#1A1A1A',
        color: '#fffcef',
        textAlign: 'center',
        },
      });
  }

}

const SmallSpacer = props => {
  return (
    <div className="small-spacer"></div>
  )
}

const RenderNfts = props => {

  return (
    <div id="nft-container">
      {activeNft==="moonbird" ? "" : renderNft("moonbird")}
      {activeNft==="dickbutt" ? "" : renderNft("dickbutt")}
      {activeNft==="noun" ? "" : renderNft("noun")}
      {activeNft==="mfer" ? "" : renderNft("mfer")}
      {activeNft==="alien" ? "" : renderNft("alien")}
      {activeNft==="larvalad" ? "" : renderNft("larvalad")}
      {activeNft==="toad" ? "" : renderNft("toad")}
    </div>
  )
}

const RenderTextContent = props => {
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

const RenderX = props => {
  return (
    <div id="x-container">
      <a href="https://www.exstntl.art/" target="_blank"><img src={X} id="x"></img></a>
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
    case "larvalad":
      cSrc = Larvalad;
      break;
    default:
      cSrc = Default;
  }
  const element = <img src={cSrc} className="nft activeNft" id={nft} onClick={() => onActiveNftClick()}></img>;
  return element;
}

const onActiveNftClick = () => {
  var text = '';
  var emoji = '';
  switch (activeNft) {
    case "moonbird":
      text = "h00 h00!";
      emoji = '🦉';
      break;
    case "dickbutt":
      text = "i'm a dickbutt!";
      emoji = '🍆';
      break;
    case "alien":
      text = "take me to ur leader";
      emoji = '🛸';
      break;
    case "noun":
      text = <div>
        <strong>noun <i>/naʊn/</i></strong>
        <br></br>
        a word that refers to a person,
        place, thing, event, substance, or quality
      </div>
      break;
    case "mfer":
      text = "mfin mfer";
      emoji = '🖕';
      break;
    case "toad":
      text = "ribbit";
      emoji = '🐸';
      break;
    case "larvalad":
      text = "meh";
      emoji = '🐌';
      break;
    default:
      text = "CC0 ❌ EXSTNL";
    }
  toast(text,
  { icon: emoji,
    position: 'bottom-center',
    style: {
    background: '#1A1A1A',
    color: '#fffcef',
    textAlign: 'center',
    },
  });
}

const mint = async () => {
  var mintStart = await getMintStart();
  var time = await getTimestamp();
  if (time < mintStart) {
    var date = await getDate(mintStart);
    var time = await getTime(mintStart);
    toast("Mint inactive until \n" + date + " @ " + time + "!",
    { position: 'bottom-center',
      style: {
      background: '#1A1A1A',
      color: '#fffcef',
      textAlign: 'center',
      },
    });
  } else {
    let tx = await mintNFT(1);
    if (tx.success == true) {
      toast(tx.status,
      { position: 'bottom-center',
        style: {
        background: '#1A1A1A',
        color: '#fffcef',
        textAlign: 'center',
        minWidth: '90vw',
        duration: 10000,
        },
      });
    } else {
      toast(tx.status,
      { position: 'bottom-center',
        style: {
        background: '#1A1A1A',
        color: '#fffcef',
        textAlign: 'center',
        },
      });
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
      <MintCounter/>
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
