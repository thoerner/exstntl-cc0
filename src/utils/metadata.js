import { Alien, AlienSold,
         Moonbird, MoonbirdSold,
         Dickbutt, DickbuttSold,
         Noun, NounSold,
         Mfer, MferSold,
         Larvalad, LarvaladSold,
         Toad, ToadSold,
         Cryptomarc, CryptomarcSold,
         Dresmarsreal, DresmarsrealSold,
         Fastfoodpunk, FastfoodpunkSold,
         Grifters, GriftersSold,
         Phunk, PhunkSold,
         Tinydino, TinydinoSold,
         Uma, UmaSold } from '../images/nfts/';
import Default from '../images/cc0x.png';

var nounText = <div>
  <strong>noun <i>/naʊn/</i></strong>
  <br></br>
  a word that refers to a person,
  place, thing, event, substance, or quality
</div>

export const nftMeta = [
  {
    name: "moonbird",
    img: Moonbird,
    soldImg: MoonbirdSold,
    mintMsg: "Mint the Bird",
    highlightMsg: "h00 h00!",
    emoji: "🦉",
    minter: "moykle.eth"
  },
  {
    name: "dickbutt",
    img: Dickbutt,
    soldImg: DickbuttSold,
    mintMsg: "Mint the Dickbutt",
    highlightMsg: "i'm a dickbutt!",
    emoji: "🍆",
    minter: "IronStride.eth"
  },
  {
    name: "noun",
    img: Noun,
    soldImg: NounSold,
    mintMsg: "Mint the Noun",
    highlightMsg: nounText,
    emoji: "",
    minter: "liamtpd.eth"
  },
  {
    name: "mfer",
    img: Mfer,
    soldImg: MferSold,
    mintMsg: "Mint the Mfer",
    highlightMsg: "mfin mfer",
    emoji: "🖕",
    minter: "mniml.eth"
  },
  {
    name: "alien",
    img: Alien,
    soldImg: AlienSold,
    mintMsg: "Mint the Alien",
    highlightMsg: "take me to ur leader",
    emoji: "🛸",
    minter: "anon 0xE8a1...c990"
  },
  {
    name: "larvalad",
    img: Larvalad,
    soldImg: LarvaladSold,
    mintMsg: "Mint the Slug",
    highlightMsg: "meh",
    emoji: "🐌",
    minter: "our friend 0xE8a1"
  },
  {
    name: "toad",
    img: Toad,
    soldImg: ToadSold,
    mintMsg: "Mint the Toad",
    highlightMsg: "ribbit",
    emoji: "🐸",
    minter: "a dedicated collector"
  },
  {
    name: "cryptomarc",
    img: Cryptomarc,
    soldImg: CryptomarcSold,
    mintMsg: "Mint the Marc",
    highlightMsg: "Marcy Marc",
    emoji: "💁",
    minter: "chonkyrubi.eth"
  },
  {
    name: "dresmarsreal",
    img: Dresmarsreal,
    soldImg: DresmarsrealSold,
    mintMsg: "Mint the Mind",
    highlightMsg: "More brain. More power.",
    emoji: "🧠",
    minter: "a Protector ⚔️🛡️"
  },
  {
    name: "fastfoodpunk",
    img: Fastfoodpunk,
    soldImg: FastfoodpunkSold,
    mintMsg: "Mint the Punk",
    highlightMsg: "Would you like CC0 with that?",
    emoji: "🍟",
    minter: "localcryptogod.eth"
  },
  {
    name: "grifters",
    img: Grifters,
    soldImg: GriftersSold,
    mintMsg: "Mint the Grifter",
    highlightMsg: "Grifters gonna grift.",
    emoji: "💰",
    minter: "ultrajack.eth"
  },
  {
    name: "phunk",
    img: Phunk,
    soldImg: PhunkSold,
    mintMsg: "Mint the Phunk",
    highlightMsg: "Let's get Phunky",
    emoji: "🔥",
    minter: "anon 0x0DAE...6183"
  },
  {
    name: "tinydino",
    img: Tinydino,
    soldImg: TinydinoSold,
    mintMsg: "Mint the Dino",
    highlightMsg: "Not extinct.",
    emoji: "🦖",
    minter: null
  },
  {
    name: "uma",
    img: Uma,
    soldImg: UmaSold,
    mintMsg: "Mint the Uma",
    emoji: "🌍",
    highlightMsg: "Uma",
    minter: null
  },
  {
    name: "default",
    img: Default,
    soldImg: null,
    mintMsg: "Minting Soon",
    highlightMsg: "CC0 ❌ EXSTNL",
    emoji: "",
    minter: null
  }
]

var i;
var nfts = [];
for (i = 0; i < nftMeta.length; i++) {
  nfts.push(nftMeta[i].name);
}

var nftImgs = [];
for (i = 0; i < nftMeta.length; i++) {
  nftImgs.push(nftMeta[i].img);
}

var soldNftImgs = [];
for (i = 0; i < nftMeta.length; i++) {
  soldNftImgs.push(nftMeta[i].soldImg);
}

var mintMsgs = [];
for (i = 0; i < nftMeta.length; i++) {
  mintMsgs.push(nftMeta[i].mingMsg);
}

var emojis = [];
for (i = 0; i < nftMeta.length; i++) {
  emojis.push(nftMeta[i].emoji);
}

var highlightMsgs = [];
for (i = 0; i < nftMeta.length; i++) {
  highlightMsgs.push(nftMeta[i].highlightMsg);
}

export {nfts, nftImgs, soldNftImgs, mintMsgs, emojis, highlightMsgs};
