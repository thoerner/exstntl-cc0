import {
  getTimestamp,
  getMintStart,
  mintNFT
} from "../utils/interact";
import { getDate, getTime } from '../utils/dateandtime';
import toast from 'react-hot-toast';
import { mintMsgs } from '../utils/metadata';
import { RenderPrice } from '.';

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

  return (
    <div id="mint-button-area">
      <button id="mintButton" onClick={() => mint()}>
        {mintMsgs[props.minted]}
      </button>
      <RenderPrice
        price={props.price}
      />
    </div>
  );
}
