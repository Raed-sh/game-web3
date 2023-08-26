import { useState } from "react";

import classic from "public/images/collection/founderpacks/openButton/button-open-copper.webp";
import classicHover from "public/images/collection/founderpacks/openButton/button-open-copper-hover.webp";
import classicPressed from "public/images/collection/founderpacks/openButton/button-golden-copper-pressed.webp";
import premium from "public/images/collection/founderpacks/openButton/button-open-silver.webp";
import premiumHover from "public/images/collection/founderpacks/openButton/button-open-silver-hover.webp";
import premiumPressed from "public/images/collection/founderpacks/openButton/button-open-silver-pressed.webp";
import legendary from "public/images/collection/founderpacks/openButton/button-open-golden.webp";
import legendaryHover from "public/images/collection/founderpacks/openButton/button-open-golden-hover.webp";
import legendaryPressed from "public/images/collection/founderpacks/openButton/button-golden-copper-pressed.webp";
 

const BACKGROUNDS = [
    {
        title: "classic",
        images: {
            normal: classic,
            hover: classicHover,
            pressed: classicPressed,
        }
    },
    {
        title: "premium",
        images: {
            normal: premium,
            hover: premiumHover,
            pressed: premiumPressed,
        }
    },
    {
        title: "legendary",
        images: {
            normal: legendary,
            hover: legendaryHover,
            pressed: legendaryPressed,
        }
    },
    {
        title: "founder",
        images: {
            normal: legendary,
            hover: legendaryHover,
            pressed: legendaryPressed,
        }
    },
]

const getBackgroundByTitle = (title: string) => BACKGROUNDS.filter((bg) => bg.title === title)[0].images;

const OpenButton = (props: {pack: string, callback: () => void, text: string}) => {
    const backgrounds = getBackgroundByTitle(props.pack);
    const [bg, setBg] = useState(backgrounds.normal);

    const processClick = () => {
        setBg(backgrounds.pressed)
        setTimeout(() => {
            props.callback();
            setBg(backgrounds.normal)
        }, 250)
    }
    return <div
        className='fp-open-btn'
        onClick={() => processClick()}
        onMouseEnter={() => setBg(backgrounds.hover)}
        onMouseLeave={() => setBg(backgrounds.normal)}
        style={{
            backgroundImage: `url(${bg.src})`
        }}
    >
        {props.text}
    </div>
}

export default OpenButton;