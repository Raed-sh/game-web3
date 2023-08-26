import SoulBoundLogo from "public/images/collection/founderpacks/soulbound.svg";
import { useState } from "react";

const part1 = "Soulbound in Cards of Ethernity refers to a unique category of assets that are permanently tied to a player's account."
const part2 = "Unlike tradable or Web3 assets, Soulbound items cannot be exchanged or transferred between users."

const SoulBoundTooltip = `${part1} ${part2}`;

const SoulBound = () => {
    const [hover, setHover] = useState(false)
    return <>
        <img src={SoulBoundLogo.src} className='soulbound-logo' onMouseEnter={() => setHover(true)}/>
        <div
            id='soulbound-explanation'
            className={hover ? "soulbound-show" : "soulbound-hide"}
            onMouseLeave={() => setHover(false)}
        >
            <p>{SoulBoundTooltip}</p>
        </div>
    </>
}

export default SoulBound;