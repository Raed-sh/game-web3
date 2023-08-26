import { fixNFTcards, getElementIcon } from "@/utils/collection";
import { CARD_FRAMES, COLLECTION } from "public/images";
import { useState } from "react";
import soulboundIcon from "public/images/icons/soulboundIcon.svg"
import nftIcon from "public/images/collection/icons/NFT-sign.webp"

export interface CardDetails {
    id: string;
    isNFT?: boolean;
    count: number;
    attack: number | string;
    circulation: number;
    description: string;
    element: string;
    hp: number | string;
    mana: number | string;
    name: string;
    race: string;
    rarity: string;
    season: number;
    type: string;
    isPromo?: boolean;
}

export const capitalizeFirstLetter = (input: string) => input.charAt(0).toUpperCase() + input.slice(1);

const getFolderFromType = (rawType: string) => {
    switch (rawType) {
        case "spell":
            return "Spells"
        case "relic":
            return "Relics"
        case "creature":
        default:
            return "Creatures"
    }
}

const getCardFrame = (rarity: string) => {
    switch (rarity) {
        case "rare":
            return CARD_FRAMES.rare.src
        case "epic":
            return CARD_FRAMES.epic.src
        case "legendary":
            return CARD_FRAMES.legendary.src
        case "uncommon":
            return CARD_FRAMES.uncommon.src
        default:
            return CARD_FRAMES.common.src
    }
}

const getImgSrc = (card: CardDetails) => {
    const rarity = capitalizeFirstLetter(card.rarity);
    const typeFolder = getFolderFromType(card.type);
    let cardFilename;
    if (card.race !== "" && card.race !== "none") {
        cardFilename = `${capitalizeFirstLetter(card.name)}-${card.element}-${card.race}-${card.rarity}`;
    } else {
        cardFilename = `${capitalizeFirstLetter(card.name)}-${card.element}-${card.rarity}`;
    }

    return `/images/cards/${rarity}/${typeFolder}/${cardFilename}.webp`
}

const cleanDescription = (rawDescription: string) => {
    if (rawDescription) return rawDescription.replaceAll(/\<sprite(.+)\>:?/gm, "");
    else return ""
}

const Card = (props: { card: CardDetails, display: string }) => {
    const [hover, setHover] = useState(false);
    const card = props.card.isNFT ? fixNFTcards(props.card) : props.card;
    const display = props.display;

    const elementIcon = getElementIcon(card.element);
    card.description = cleanDescription(card.description)

    return <div
        className={hover ? "card-wrapper card-hover" : "card-wrapper card-nohover"}
        key={card.isNFT ? `nft-card-${card.id}`: `web2-card-${card.id}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <div className={`card-display-${display}`}>
            <img src={getCardFrame(card.rarity)} alt='card frame' className="card-frame" />
            <img src={getImgSrc(card)} alt='card image' className="card-image" />
            <div className="card-stats" datatype={card.type}>
                <span className="card-stat card-mana">{card.mana}</span>
                <span className="card-stat card-attack">{card.type !== "spell" ? card.attack : " "}</span>
                <span className="card-stat card-hp">{card.hp}</span>
            </div>
            <div className="card-text">
                <span className="card-name">{card.name}</span>
                {/* <br />
                <span className="card-description">{card.description}</span> */}
                {card.race && card.race !== "none" && <span className="card-race">{card.race}</span>}
                {!card.race || card.race === "none" && <span className="card-race">{card.type}</span>}
            </div>
            {elementIcon && <img src={elementIcon.src} alt={`${card.element} element icon`} className={"card-icon"} />}
            {card.isNFT && <img src={nftIcon.src} className="nft-icon card-nft-icon" />}
        </div>
        <div className={hover ? `card-description-box card-description-${display}` : `card-description-hide card-description-box card-description-${display}`}>
            {(card.count > 1 && hover) && <div className="card-count-wrapper">
                 <div className="card-count"
                    style={{backgroundImage: `url(${COLLECTION.collectionAssetAv.src})`}}
                >
                    <p>x{card.count}</p>
                </div>
            </div>}
            {card.isPromo && <div className="card-soulbound-icon" style={{backgroundImage: `url(${soulboundIcon.src})`}}></div>}
            <div className="card-description-info">
                <div className="card-description-icon-wrapper">
                    {elementIcon && <img src={elementIcon.src} alt={`${card.element} element icon`} className="card-description-icon" />}
                </div>
                <span className="card-description-name">{card.name}</span>
                {card.race && card.race !== "none" && <span className="card-description-race">{card.race}</span>}
            </div>
            <div className="card-description">
                {card.description}
            </div>
            <div className="card-description-rarity">{card.rarity}</div>
        </div>
    </div>
}

export default Card;