import toast from 'react-hot-toast';

export const RenderNfts = props => {
  const renderNft = (i) => {
    var nft, src;
    if (props.minted > i) {
      src = props.soldNftImgs[i];
      nft = props.nfts[i];
    } else if (props.minted === i) {
      src = props.nftImgs[i - 1];
      nft = props.nfts[i - 1];
    } else {
      src = props.nftImgs[i];
      nft = props.nfts[i];
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
    if (i >= minters.length && i > props.minted) {
      var msg = "Coming soon! 🎉";
    } else if ( i >= minters.length && minters.length <= i ) {
      var msg = "Just minted!";
    } else {
      var msg = "Minted by " + minters[i] + "!";
    }
    toast(msg);
  }


  const nftImages = props.nfts.map((nft, i) => <span>{props.nfts[props.minted]===nft || i===props.nfts.length-1 ? "" : renderNft(i)}</span>)
  return (
    <div id="nft-container">
      {nftImages}
    </div>
  )
}
