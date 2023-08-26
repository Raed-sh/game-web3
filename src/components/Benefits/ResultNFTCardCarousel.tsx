import { getElementIcon } from "@/utils/collection";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import Card, { CardDetails } from "../Card";

import Back from "public/images/collection/founderpacks/benefits/Back_button.svg";
import Forward from "public/images/collection/founderpacks/benefits/Forward_button.svg";
import nftBorder from "public/images/collection/founderpacks/nft-border.webp"
import SoulBound from "../FounderPacks/SoulBound";

const ResultNFTCardCarousel = (props: {cards: CardDetails[], benefit: string, pack: any}) => {
    const [chosenBenefit, setChosenBenefit] = useState(props.pack.benefits[0]);
    const [cardToLeft, setCardToLeft] = useState(props.cards.length > 1 ? props.cards[props.cards.length - 1] : null)
    const [selectedCard, setSelectedCard] = useState(props.cards[0])
    const [cardToRight, setCardToRight] = useState(props.cards.length > 1 ? props.cards[1] : null)
    const [elementIcon, setElementIcon] = useState<StaticImageData | null>(null);

    const [selectedId, setSelectedId] = useState(0);

    const reduceId = () => {
        if (selectedId - 1 < 0) {
            setSelectedId(props.cards.length - 1)
        } else {
            setSelectedId(selectedId - 1)
        }
    }

    const increaseId = () => {
        if (selectedId + 1 >= props.cards.length) {
            setSelectedId(0)
        } else {
            setSelectedId(selectedId + 1)
        }
    }

    useEffect(() => {
        // this honestly looks like a fucking joke
        setSelectedCard(props.cards[selectedId])
        if (props.cards.length == 1) {
            setCardToLeft(null)
            setCardToRight(null)
        }
        if (props.cards.length == 2) {
            setCardToRight(null);
            if (selectedId === 0)
                setCardToLeft(props.cards[1])
            else if (selectedId === 1)
                setCardToLeft(props.cards[0])
        }
        if (props.cards.length > 2) {
            if (selectedId === 0) {
                setCardToLeft(props.cards[props.cards.length - 1])
            } else {
                setCardToLeft(props.cards[selectedId - 1])
            }

            if (selectedId === props.cards.length - 1) {
                setCardToRight(props.cards[0])
            } else {
                setCardToRight(props.cards[selectedId + 1])
            }
        }
    }, [selectedId])

    useEffect(() => {
        const icon = getElementIcon(selectedCard.element);
        setElementIcon(icon);
    }, [selectedCard])

    useEffect(() => {
        // benefit is fetched wrong here
        console.log(props.benefit)
        setChosenBenefit(props.pack.benefits.filter((b: any) => b.benefit === props.benefit)[0]);
    }, [props.benefit])

    const cleanDescription = (rawDescription: string) => {
        if (rawDescription) return rawDescription.replaceAll(/\<sprite(.+)\>:?/gm, "");
        else return ""
    }

    return <div id='result-card-preview'>
        <div id='card-description'>
            {chosenBenefit.benefit === "founder-card" && <SoulBound />}
            <h2>{chosenBenefit.desc.split('(')[0]}</h2>
            <h4>Contains {props.cards.length} cards</h4>
            <p>
                It's exclusive cards that are available only as Founder pack content.
            </p>
            <p>
                Could be used as tradable item.
            </p>

            <div id='preview-card-details'>
                <div>
                    <h3>{selectedCard.name}</h3>
                    <span>
                        <h5>{ selectedCard.race !== "none" && selectedCard.race}</h5>
                        {elementIcon && <img src={elementIcon.src} alt={`${selectedCard.element} element icon`} className={"card-preview-icon"} />}
                    </span>
                </div>
                <h3 id='preview-card-rarity'>{selectedCard.rarity}</h3>
                <p>
                    {cleanDescription(selectedCard.description)}
                </p>
            </div>
        </div>
        <div id='card-display'>
            <div id='card-switcher'>
                <img src={Back.src} className='card-switcher-nav' onClick={() => reduceId()} />
                <span>Card {selectedId + 1 } from {props.cards.length}</span>
                <img src={Forward.src} className='card-switcher-nav' onClick={() => increaseId()} />
            </div>
            <div id='card-preview-display' className={`card-preview-display-${props.cards.length}`}>
                {[cardToLeft, selectedCard, cardToRight].map((displayCard: CardDetails | null, index: number) => {
                    if (!displayCard) return null
                    // card-preview-1 will be the larger card to be shown on top here
                    return <div id={`card-preview-${index}`} className='nft-card'>
                        <div className="nft-card-border" style={{
                            backgroundImage: `url(${nftBorder.src})`
                        }} />
                        <Card card={displayCard} display="collection" />
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default ResultNFTCardCarousel;