import { MintButton } from '.';
import { freeMintText } from '../utils/highlights';
import toast from 'react-hot-toast';

export const RenderHighlight = props => {
  const onActiveNftClick = () => {
    var nounText = <div>
      <strong>noun <i>/naʊn/</i></strong>
      <br></br>
      a word that refers to a person,
      place, thing, event, substance, or quality
    </div>

    var msgs = ["h00 h00!", "i'm a dickbutt!", nounText,
                "mfin mfer", "take me to ur leader", "meh",
                "ribbit", "Marcy Marc", "More brain. More power.",
                "Would you like CC0 with that?", "Grifters gonna grift.",
                "Let's get Phunky", "Not extinct.", "Uma", "CC0 ❌ EXSTNL"];
    var emojis = ["🦉", "🍆", "", "🖕", "🛸", "🐌",
                  "🐸", "💁", "🧠", "🍟", "💰", "🔥", "🦖", "🌍"];

    toast(msgs[props.minted], { icon: emojis[props.minted] });
  }
  const renderHightLightImage = (i) => {
    var src = props.nftImgs[i];
    const element = <img src={src} className="nft activeNft" id={props.nfts[i]} onClick={() => onActiveNftClick()}></img>;
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
