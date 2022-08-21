import { RenderPrice } from '.';
import {
  getTimestamp,
  getMintStart,
  mintNFT
} from "../utils/interact";
import toast from 'react-hot-toast';
import { getDate, getTime } from '../utils/dateandtime';

export const MintButton = props => {
  const mint = async () => {
    var mintStart = await getMintStart();
    var time = await getTimestamp();
    if (time < mintStart) {
      var date = await getDate(mintStart);
      time = await getTime(mintStart);
      toast("Mint inactive until \n" + date + " @ " + time + "!");
    } else {
      let tx = await mintNFT(1);
      if (tx.success === true) {
        toast(tx.status,
        { style: {
          minWidth: '90vw',
          duration: 10000,
          },
        });
      } else {
        toast(tx.status);
      }
    }
  }

  var msgs = ["Mint the Bird", "Mint the Dickbutt", "Mint the Noun",
              "Mint the Mfer", "Mint the Alien", "Mint the Slug",
              "Mint the Toad", "Mint the Marc", "Mint the Mind",
              "Mint the Punk", "Mint the Grifter", "Mint the Phunk",
              "Mint the Dino", "Mint the Uma", "Minting Soon"];
  return (
    <div id="mint-button-area">
      <button id="mintButton" onClick={() => mint()}>
        {msgs[props.minted]}
      </button>
      <RenderPrice
        price={props.price}
      />
    </div>
  );
}
