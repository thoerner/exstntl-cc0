import toast from 'react-hot-toast';
import { nfts, nftImgs, soldNftImgs, minters } from '../utils/metadata';

var cleanMinters = [];
for (var i = 0; i < minters.length; i++) {
  if (minters[i] !== null) {
    cleanMinters.push(minters[i]);
  }
}

export const RenderNfts = props => {
  const renderNft = (i) => {
    var nft, src;
    if (props.minted > i) {
      src = soldNftImgs[i];
      nft = nfts[i];
    } else if (props.minted === i) {
      src = nftImgs[i - 1];
      nft = nfts[i - 1];
    } else {
      src = nftImgs[i];
      nft = nfts[i];
    }
    const element = <img
        src={src}
        className="nft"
        id={nft}
        alt={nft}
        onClick={() => nftToast(i) }>
      </img>;
    return element;
  }

  const nftToast = (i) => {
    var msg;
    var emoji = "";
    if (i >= cleanMinters.length && i > props.minted) {
      msg = "Coming soon!";
      emoji = "🎉";
    } else if ( i >= cleanMinters.length && cleanMinters.length <= i ) {
      msg = "Just minted!";
    } else {
      msg = "Minted by " + cleanMinters[i] + "!";
    }
    toast(msg, {
      icon: emoji
    });
  }

  const nftImages = nfts.map((nft, i) => <span key={nft}>{nfts[props.minted]===nft || i===nfts.length-1 ? "" : renderNft(i)}</span>)
  return (
    <div id="nft-container">
      {nftImages}
    </div>
  )
}
