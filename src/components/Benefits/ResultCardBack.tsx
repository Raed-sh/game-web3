import goldenCardBack from "public/images/collection/founderpacks/Founder_back-golden.webp"
import silverCardBack from "public/images/collection/founderpacks/Founder_back-silver.webp"

const ResultCardBack = (props: {type: string}) => {
    console.log('cardback type:', props.type)

    return <div id='result-adventurer-preview'>
        <div id='cardback-description'>
            <h2>Exclusive Card Back</h2>
            <p>
                It's an exclusive card back that is available only as Deluxe pack content.
            </p>
            <p>
                This asset is also available as tradable item.
            </p>
        </div>
        <div id='cardback-display'>
            <img src={props.type === "silver" ? silverCardBack.src : goldenCardBack.src} />
        </div>
    </div>
}

export default ResultCardBack;