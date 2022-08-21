import toast from 'react-hot-toast';
import { nfts, nftImgs, soldNftImgs } from '../utils/metadata';

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
    var minters = [ "moykle.eth", "IronStride", "liamtpd.eth",
                    "mniml.eth", "anon 0xE8a1...c990", "our friend 0xE8a1",
                    "a dedicated collector", "chonkyrubi.eth", "a Protector ⚔️🛡️",
                    "localcryptogod.eth", "ultrajack.eth", "anon 0x0DAE...6183"];
    var msg;
    if (i >= minters.length && i > props.minted) {
      msg = "Coming soon! 🎉";
    } else if ( i >= minters.length && minters.length <= i ) {
      msg = "Just minted!";
    } else {
      msg = "Minted by " + minters[i] + "!";
    }
    toast(msg);
  }


  const nftImages = nfts.map((nft, i) => <span key={nft}>{nfts[props.minted]===nft || i===nfts.length-1 ? "" : renderNft(i)}</span>)
  return (
    <div id="nft-container">
      {nftImages}
    </div>
  )
}
