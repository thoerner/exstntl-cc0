import toast from 'react-hot-toast';
import { connectWallet } from '../utils/interact';

export const WalletButton = props => {
  const connectWalletPressed = async () => {
     const walletResponse = await connectWallet();
     var tempStatus = props.status;
     props.setStatus(walletResponse.status);
     if (tempStatus === walletResponse.status) {
       toast(props.status);
     }
     props.setWallet(walletResponse.address);
  };

  return (
    <button id="walletButton" onClick={connectWalletPressed}>
      {props.walletAddress.length > 0 ? (
        String(props.walletAddress).substring(0, 6) +
        "..." +
        String(props.walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
}
