import { IFounderCard } from "@/utils/CONSTANTS"
import { useState } from "react";

const FounderCard = (props: {card: IFounderCard, children: any}) => {
    const [hover, setHover] = useState(false);

    return <div
        style={{
            backgroundImage: `url(${
                hover ? 
                props.card.cardBGHover.src :
                props.card.cardBG.src
            })`,
            position: 'relative',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`card-cont fp-${props.card.title}`}
    >{props.children}</div>
}

export default FounderCard;