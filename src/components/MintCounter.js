import { CONTRACT_ADDRESS } from '../utils/constants';

export const MintCounter = props => {
  return (
    <a
      href={"https://etherscan.com/token/" + CONTRACT_ADDRESS}
      target="_blank"
      rel="noreferrer">
      <p id="mint-counter">
        <span id="count">{props.minted}</span> / <span id="qmark">?</span> minted
      </p>
    </a>
  );
}
