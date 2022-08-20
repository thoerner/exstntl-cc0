import { RenderPrice } from '.';

export const MintButton = props => {
  var msgs = ["Mint the Bird", "Mint the Dickbutt", "Mint the Noun",
              "Mint the Mfer", "Mint the Alien", "Mint the Slug",
              "Mint the Toad", "Mint the Marc", "Mint the Mind",
              "Mint the Punk", "Mint the Grifter", "Mint the Phunk",
              "Mint the Dino", "Mint the Uma", "Minting Soon"];
  return (
    <div id="mint-button-area">
      <button id="mintButton" onClick={() => props.mint()}>
        {msgs[props.minted]}
      </button>
      <RenderPrice
        price={props.price}
      />
    </div>
  );
}
