import { Twitter, ToiletPaper } from '../utils/fas';
import Opensea from '../images/os.png';
import { Spacer } from '.';

export const RenderFooter = props => {
  return (
    <div id="text-container">
      <p>We meme together. We build together.</p>
      <div id="social-container">
        <a
          href="https://twitter.com/EXSTNTLdotART"
          id="social"
          title="Twitter"
          target="_blank"
          rel="noreferrer">
            <Twitter/>
        </a>
        <Spacer size="0.5"/>
        <a
          href="https://exstntldotart.notion.site/CC0mune-a55e8d401ad44d9a9a1ee8a9aea6169e"
          id="social"
          title="CC0munal Paper"
          target="_blank"
          rel="noreferrer">
            <ToiletPaper/>
        </a>
        <Spacer size="0.5"/>
        <a
          href="https://opensea.io/collection/cc0mune"
          id="social"
          title="Opensea"
          target="_blank"
          rel="noreferrer">
          <span id="social-icon">
            <img id="os-icon" src={Opensea} alt="Opensea"></img>
          </span>
        </a>
      </div>
    </div>
  )
}
