import { RenderSubtitle } from '.';
import Logo from '../images/logo.png';

export const RenderTitle = props => {
  return (
    <div id="logoContainer">
      <a href="#"><img src={Logo} id="logo"></img></a>
      <RenderSubtitle/>
    </div>
  );
}
