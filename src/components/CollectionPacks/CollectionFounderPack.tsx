import { useEffect, useState } from "react";

import classic from "../../../public/images/collection/founderpacks/Mc-Classic-fp.webp"
import classicHover from "../../../public/images/collection/founderpacks/Mc-Classic-fp-hover.webp"
import premium from "../../../public/images/collection/founderpacks/Mc-Premium-fp.webp"
import premiumHover from "../../../public/images/collection/founderpacks/Mc-Premium-fp-hover.webp"
import legendary from "../../../public/images/collection/founderpacks/Mc-Legendary-fp.webp"
import legendaryHover from "../../../public/images/collection/founderpacks/Mc-Legendary-fp-hover.webp"
import nftIcon from "public/images/collection/icons/NFT-sign.webp"

import Count from "./Count";
import { useRouter } from "next/router";

export interface IFounderPack {
    isNFT: boolean
    id: string
    type: string
    count: number
}

export interface INFTFounderPack {
    isNFT: boolean
    // ID is created on web3 pack retrieval by reusing tokenId
    id: string
    // count is same as balance
    count: number
    address: string
    attributes: {
      Adventurer: string
      "Closed Beta Key": string
      "Discord Role": string
      Ethernal: string
      "Exclusive Card Back": string
      "Founder Booster Pack": string
      "Golden Ticket": string
      Heirloom: string
      "Name Reservation": string
      Type: string
    }
    balance: number
    chain: string
    description: string
    external_url: string
    image: string
    name: string
    tokenId: number
}

const BACKGROUNDS = {
    classic: {
        regular: classic,
        hover: classicHover,
    },
    premium: {
        regular: premium,
        hover: premiumHover,
    },
    legendary: {
        regular: legendary,
        hover: legendaryHover,
    },
}

const CollectionFounderPack = (props: {pack: IFounderPack | INFTFounderPack}) => {
    const router = useRouter();
    const {pack} = props;
    const [hover, setHover] = useState(false);
    const [bg, setBg] = useState(BACKGROUNDS.classic);

    useEffect(() => {
        if (pack.isNFT) {
            setBg(BACKGROUNDS.legendary)
        } else {
            // @ts-ignore
            switch (pack.id) {
                case "legendary-founderpack":
                    setBg(BACKGROUNDS.legendary);
                    break;
                case "premium-founderpack":
                    setBg(BACKGROUNDS.premium);
                    break;
                default:
                    setBg(BACKGROUNDS.classic);
                    break;
            }
        }
    }, [props.pack])

    return <div key={pack.id}
        className='collection-fp-display'
        style={{
            backgroundImage: `url(${ hover ? bg.hover.src : bg.regular.src})`,
            filter: hover ? "drop-shadow(0px 0px 30px rgba(206, 189, 141, 0.5))" : "none",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
            let destination = `/collection/premium-packs/${pack.id.split('-')[0]}`
            if (pack.isNFT) {
                destination = `/collection/nft-premium-pack/`
            }
            router.push(destination)
        }}
    >
        <div>
            {/* TODO: display whether web3 pack */}
            {pack.isNFT && <img src={nftIcon.src} className="nft-icon pack-nft-icon" />}
            <Count count={pack.count} />
        </div>
        <h2>{pack.isNFT ? "Founder Pack" : pack.id.split('-')[0]}</h2>
    </div>
}

export default CollectionFounderPack;