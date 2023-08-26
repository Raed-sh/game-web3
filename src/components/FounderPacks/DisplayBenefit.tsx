import { FpOpeningStages } from "@/pages/collection/premium-packs/[link]";
import { FOUNDERPACKS, WEB3_FOUNDERPACKS } from "@/utils/CONSTANTS";
import { IAdventurer, ICard, ICardBack, IEthernal, IPack, IOpeningResult } from "@/utils/fpInterfaces";
import { useEffect, useState } from "react";
import ResultAdventurer from "../Benefits/ResultAdventurer";
import ResultCardBack from "../Benefits/ResultCardBack";
import ResultCardBackExclusive from "../Benefits/ResultCardBackExclusive";
import ResultCardCarousel from "../Benefits/ResultCardCarousel";
import ResultEmotePack from "../Benefits/ResultEmotePack";
import ResultEthernal from "../Benefits/ResultEthernal";
import ResultNFTCardCarousel from "../Benefits/ResultNFTCardCarousel";
import ResultTicket from "../Benefits/ResultTicket";
import { CardDetails } from "../Card";
import { BenefitCard } from "./OpeningCarousel";

const DisplayBenefit = (props: {
    result: IOpeningResult | null,
    benefit: string | null,
    pack: string,
    isNFT?: boolean
}) => {
    const {result, benefit} = props;

    const pack = props.isNFT ? WEB3_FOUNDERPACKS[props.pack] : FOUNDERPACKS[props.pack];

    const [chosenBenefit, setChosenBenefit] = useState(pack.benefits[0]);


    useEffect(() => {
        setChosenBenefit(pack.benefits.filter((b: any) => b.benefit === benefit)[0]);
    }, [benefit])

    console.log('CHOSEN BENEFIT:', chosenBenefit)

    return <>
        {result && <div id='benefits-wrapper'>
            <div id='benefits-selected-benefit'>
                {/* TODO: check if changes with benefit selection */}
                <BenefitCard
                    key={"chosen-benefit-preview"}
                    // {...chosenBenefit}
                    id={chosenBenefit.id}
                    img={chosenBenefit.img}
                    desc={chosenBenefit.desc}
                    benefit={chosenBenefit.benefit}
                    pack={props.pack}
                    stage={FpOpeningStages.result}
                    className={""}
                    showReveal={false}
                />
            </div>
            <div id='benefits-details'>
                {/* we expect error at each stage because the benefitToDisplay possible types are a bit too wide */}
                {/* this can probably be fixed but I am not sure how atm */}
                {benefit === "common-card" && (
                    props.isNFT ? <ResultNFTCardCarousel cards={props.result?.common as CardDetails[]} benefit={benefit} pack={pack} /> : 
                    <ResultCardCarousel cards={props.result?.common as ICard[]} benefit={benefit} pack={pack}/>
                )}
                {benefit === "uncommon-card" && props.result?.uncommon && props.isNFT && <ResultNFTCardCarousel cards={props.result?.uncommon!} benefit={benefit} pack={pack}/>}
                {/* @ts-expect-error */}
                {benefit === "founder-card" && <ResultCardCarousel cards={props.result?.founder} benefit={benefit} pack={pack}/>}
                {benefit === "founder-nft-card" && <ResultNFTCardCarousel cards={props.result?.founder as CardDetails[]} benefit={benefit} pack={pack}/>}
                {/* @ts-expect-error */}
                {benefit === "adventurer" && <ResultAdventurer adventurers={props.isNFT ? [props.result?.adventurer,] : props.result?.adventurer} isNFT={props.isNFT}/>}
                {/* @ts-expect-error */}
                {benefit === "ethernal" && <ResultEthernal ethernals={props.isNFT ? [props.result?.ethernal, ] : props.result?.ethernal} isNFT={props.isNFT} />}
                {benefit === "emote-pack" && <ResultEmotePack />}
                {benefit === "card-back-silver" && <ResultCardBack type={"silver"} />}
                {benefit === "card-back-golden" && <ResultCardBack type={"golden"} />}
                {benefit === "deck-ticket" && <ResultTicket benefit={benefit} />}
                {benefit === "corvun-raffle-ticket" && <ResultTicket benefit={benefit} />}
                {benefit === "exclusive-card-back" && <ResultCardBackExclusive />}
                {benefit === "fp-deck" && <ResultNFTCardCarousel cards={props.result?.basic as CardDetails[]} benefit={benefit} pack={pack} />}
            </div>
        </div>}
    </>
}

export default DisplayBenefit;