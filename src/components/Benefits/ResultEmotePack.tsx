import emotePack from "public/images/collection/founderpacks/Emotes-pack.webp"
import ComingSoon from "../Collection/ComingSoon";
import SoulBound from "../FounderPacks/SoulBound";

const ResultEmotePack = () => {

    return <div id='result-adventurer-preview'>
        <div id='cardback-description'>
            <ComingSoon />
            <h2>Emote Pack</h2>
            <h3>Contains 3 emotes</h3>
            <p>
                A few more Aether emotes here, to rich your collection. Those assets are also available as tradable items.
            </p>
        </div>
        <div id='cardback-display'>
            <img src={emotePack.src} />
        </div>
    </div>
}

export default ResultEmotePack;