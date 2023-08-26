import { ADVENTURERS_INFORMATION } from "@/utils/CONSTANTS";
import { IAdventurer } from "@/utils/fpInterfaces";
import { capitalizeFirstLetter } from "../Card";

import { getAdventurerCard, IAdventurersInformation } from "../Adventurer";

const ResultAdventurer = (props: {adventurers: IAdventurer[] | IAdventurersInformation[], benefit: string, isNFT?: boolean}) => {
    const adventurer = props.adventurers[0];
    
    // @ts-ignore
    const fullAdventurer = ADVENTURERS_INFORMATION.filter((adv: IAdventurersInformation) => {
        return adv.id == adventurer.id
    })[0];

    const getCard = () => {
        if (props.isNFT) {
            // @ts-ignore
            return adventurer.image
        } else return getAdventurerCard(adventurer.element)
    }


    return <div id='result-adventurer-preview'>
        <div id='card-description'>
            <h2>Adventurer of {capitalizeFirstLetter(fullAdventurer.element)}</h2>
            {/* all adventurers are lvl1 by default */}
            <h4>Level 1</h4>
            <div id='preview-adventurer-details'>
                <h3 id='preview-adventurer-name'>{adventurer.name}</h3>
                <p className="preview-adventurer-text"><span>Personality Type:</span> {fullAdventurer.personality}</p>
                <p className="preview-adventurer-text"><span>Character Archetype:</span> {fullAdventurer.archetype}</p>
            </div>
            <p>
                {!props.isNFT && "This asset is also available as tradable item."}
            </p>
        </div>
        <div id='adventurer-display'>
            <img className="adventurer-preview-card" src={getCard()} crossOrigin="anonymous"/>
        </div>
    </div>
}

export default ResultAdventurer;