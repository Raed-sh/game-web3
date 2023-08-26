import { useState } from "react";

import classic from "public/images/layout/fb/buttons/copper-button.webp";
import classicHover from "public/images/layout/fb/buttons/copper-button-hover.webp";
import classicPressed from "public/images/layout/fb/buttons/copper-button-pressed.webp";
import premium from "public/images/layout/fb/buttons/silver-button.webp";
import premiumHover from "public/images/layout/fb/buttons/silver-button-hover.webp";
import premiumPressed from "public/images/layout/fb/buttons/silver-button-pressed.webp";
import legendary from "public/images/layout/fb/buttons/golden-button.webp";
import legendaryHover from "public/images/layout/fb/buttons/golden-button-hover.webp";
import legendaryPressed from "public/images/layout/fb/buttons/golden-button-pressed.webp";


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
    }
]

const getBackgroundByTitle = (title: string) => BACKGROUNDS.filter((bg) => bg.title === title)[0].images;

const BuyButton = (props: { pack: string, callback: () => void, text: string }) => {
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
        className='fp-buy-btn'
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

export default BuyButton;