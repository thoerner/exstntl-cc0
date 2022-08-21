import { RenderSubtitle } from '.';
import Logo from '../images/logo.png';

export const RenderTitle = props => {
  return (
    <div id="logoContainer">
      <img src={Logo} id="logo" alt="CC0mune Logo"></img>
      <RenderSubtitle/>
    </div>
  );
}
