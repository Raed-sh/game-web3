import { useEffect, useState } from "react"

import bgBPactive from '../../../public/images/collection/menu/booster-p-menu.webp';
import bgBP from '../../../public/images/collection/menu/booster-p-menu-na.webp';
import bgFPactive from '../../../public/images/collection/menu/menu-fp-banner-active.webp';
import bgFP from '../../../public/images/collection/menu/menu-fp-banner-na.webp';

export enum PackOptions {
    booster, founder
}

const PackSelector = (props: {
    pack: PackOptions, text: string, active: boolean, callback: () => void
}) => {
    const getBG = () => {
        let result;
        switch (props.pack) {
            case PackOptions.founder:
                if (props.active) result = bgFPactive
                else result = bgFP
                break;
            default:
                if (props.active) result = bgBPactive;
                else result = bgBP;
                break;
        }
        return result;
    }

    const [bg, setBg] = useState(getBG())

    useEffect(() => {
        setBg(getBG())
    }, [props.active])


    return <div
        key={`pack-selector-${props.pack === PackOptions.booster ? "booster" : "founder"}`}
        className={props.active ? "collection-pack-selector collection-pack-selector-active" : "collection-pack-selector"}
        style={{
            backgroundImage: `url(${bg.src})`
        }}
        onClick={() => props.callback()}
    >
        {props.text}
    </div>
}

export default PackSelector;