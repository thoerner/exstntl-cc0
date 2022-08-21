import { MintButton } from '.';
import { freeMintText } from '../utils/highlights';
import toast from 'react-hot-toast';
import { nfts, nftImgs, highlightMsgs, emojis } from '../utils/metadata';

export const RenderHighlight = props => {
  const onActiveNftClick = () => {
    toast(highlightMsgs[props.minted], { icon: emojis[props.minted] });
  }
  const renderHightLightImage = (i) => {
    var src = nftImgs[i];
    const element = <img
        src={src}
        className="nft activeNft"
        id={nfts[i]}
        alt={nfts[i]}
        onClick={() => onActiveNftClick()}>
      </img>;
    return element;
  }
  var text = freeMintText;
  return (
    <div id="highlight">
      <div id="highlight-left-container">
        <div id="highlight-text-container">
          {text}
        </div>
        <MintButton
          price={props.price}
          minted={props.minted}
        />
      </div>
      {renderHightLightImage(props.minted)}
    </div>
  )
}
