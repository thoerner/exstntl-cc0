import { Eth } from '../utils/fas';

export const RenderPrice = props => {
  return (
    <div id="price">{props.price} <Eth/> <span className="small-text">+ gas</span></div>
  );
}
