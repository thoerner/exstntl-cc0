import React, { useEffect, useState } from "react";
import {
  getCurrentWalletConnected,
  getDailyPrice,
  getMinted,
} from "./utils/interact.js";
import {
  STATUS_READY,
  STATUS_NOT_READY,
  STATUS_NO_MASK
} from './utils/constants';
import toast, { Toaster } from 'react-hot-toast';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  RenderTitle, RenderFooter,
  RenderHighlight, RenderNfts, MintCounter,
  WalletButton, RenderX
} from './components/';

library.add(fab, fas);

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [minted, setMinted] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const {address, status} = await getCurrentWalletConnected();
      setPrice(await getDailyPrice());
      setMinted(await getMinted());
      setWallet(address);
      addWalletListener();
      setStatus(status);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (status !== "") {
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
        setWallet={setWallet}
        walletAddress={walletAddress}
      />
      <MintCounter
        minted={minted}/>
      <div id="mint-container">
        <RenderTitle/>
        <RenderHighlight
          minted={minted}
          price={price}
        />
        <RenderNfts
          minted={minted}
        />
        <RenderFooter/>
      </div>
    </div>
  );
};

export default Minter;
