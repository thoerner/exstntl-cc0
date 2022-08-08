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
import { STATUS_READY, STATUS_NOT_READY } from './utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Caret, Eth, Twitter } from './components/fas';

library.add(fab, fas);


const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [minted, setMinted] = useState(0);
  const [maxTokens, setMaxTokens] = useState(0);
  const [amount, setAmount] = useState(1);
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

const RenderNfts = props => {
  var activeNft = "moonbird";
  return (
    <div id="nft-container">
      <img src={Moonbird} className={activeNft === "moonbird" ? "nft activeNft" : "nft"} id="moonbird"></img>
      <img src={Dickbutt} className={activeNft === "dickbutt" ? "nft activeNft" : "nft"} id="dickbutt"></img>
      <img src={Alien} className={activeNft === "alien" ? "nft activeNft" : "nft"} id="alien"></img>
      <img src={Noun} className={activeNft === "noun" ? "nft activeNft" : "nft"} id="noun"></img>
      <img src={Mfer} className={activeNft === "mfer" ? "nft activeNft" : "nft"} id="mfer"></img>
      <img src={Toad} className={activeNft === "toad" ? "nft activeNft" : "nft"} id="toad"></img>
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

const RenderHighlight = props => {
  return (
    <div id="highlight">
      <p>Moonbirds are a collection of 10,000 non-fungible tokens issued under
      the ERC-721 standard on Ethereum’s network that took flight on April 16th,
      2022.</p>
      <p>According to the official website, Moonbirds NFTs represent
      “utility-enabled PFPs that feature a richly diverse and unique pool of
      rarity-powered traits.”</p>
    </div>
  )
}

  return (
    <div className="Minter">
      <Toaster/>
      <WalletButton/>

      <div id="mint-container">
        <RenderLogo/>
        <RenderSubtitle/>
        <RenderNfts/>
        <RenderHighlight/>
        <RenderTextContent/>
      </div>

    </div>
  );
};

export default Minter;
