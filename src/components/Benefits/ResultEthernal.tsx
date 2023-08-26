import { IEthernal } from "@/utils/fpInterfaces";
import { getVideoByName } from "../Ethernal";

const ResultEthernal = (props: {ethernals: IEthernal[], benefit: string, isNFT?: boolean}) => {
    const ethernal = props.ethernals[0];

    return <div id='result-adventurer-preview'>
        <div id='ethernal-description'>
            <h2>{ethernal.name}</h2>
            {/* We are not getting nearly enough ethernal data from the backend to populate this section */}
            {/* need to add something to constants later with all the info ? */}
            {/* <div id='preview-adventurer-details'>
                <h2>{ethernal.description}</h2>
            </div> */}
            {/* {elementIcon && <img src={elementIcon.src} alt={`${ethernal.element} element icon`} className={"card-preview-icon"} />} */}
            <p>
                {!props.isNFT && "This asset is also available as tradable item."}
            </p>
        </div>
        <div id='ethernal-display'>
            <video src={getVideoByName(ethernal.name)} autoPlay muted loop />
        </div>
    </div>
}

export default ResultEthernal;