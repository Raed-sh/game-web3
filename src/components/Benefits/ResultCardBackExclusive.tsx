import goldenCardBack from "public/images/collection/founderpacks/Founder_back-golden.webp"
import silverCardBack from "public/images/collection/founderpacks/Founder_back-silver.webp"
import { useState } from "react"

import Back from "public/images/collection/founderpacks/benefits/Back_button.svg";
import Forward from "public/images/collection/founderpacks/benefits/Forward_button.svg";

const ResultCardBackExclusive = () => {
    const [currentId, setCurrentId] = useState(0);

    const reduceId = () => {
        if (currentId - 1 < 0) {
            setCurrentId(1)
        } else {
            setCurrentId(0)
        }
    }

    const increaseId = () => {
        if (currentId + 1 > 1) {
            setCurrentId(0)
        } else {
            setCurrentId(1)
        }
    }

    return <div id='result-adventurer-preview'>
        <div id='cardback-description'>
            <h2>Exclusive Card Back</h2>
            <h3>2 exclusive card backs</h3>
            
            <ol>
                <li><h3>1. Golden card back</h3></li>
                <li><h3>2. Silver card back</h3></li>
            </ol>
            
            <p>
                It's exclusive card backs that are available only as Founder pack content.
            </p>
            <p>
                These assets are also tradable.
            </p>
        </div>
        <div id='cardback-display'>
            <div id='cardback-switch'>
                <div id='card-switcher'>
                    <img src={Back.src} className='card-switcher-nav' onClick={() => reduceId()} />
                    <span>Item {currentId + 1 } from 2</span>
                    <img src={Forward.src} className='card-switcher-nav' onClick={() => increaseId()} />
                </div>
            </div>
            <img src={currentId === 1 ? silverCardBack.src : goldenCardBack.src} />
        </div>
    </div>
}

export default ResultCardBackExclusive;