import { useState } from "react"

import transferBtn from "public/images/partners/button.webp";
import transferBtnHover from "public/images/partners/button-hover.webp";
import suiIcon from "public/images/partners/Sui-active.webp"

export interface INftEmote {
    isNFT: boolean
    address: string
    attributes: {
      rarity: string
      reaction: string
    }
    chain: string
    image: string
    name: string
    type: string
  }
  

const NftEmote = (props: {
    emote: INftEmote,
    callback: (emote: INftEmote) => void,
}) => {
    const [hover, setHover] = useState(false);
    const [transferHover, setTransferHover] = useState(false);
    const {emote} = props
    return <div
        key={`nft-emote-${emote.type}`}
        className='collection-emote'
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <div className="emote-display">
            {emote.chain === "sui" && <div className="collection-sui-logo" style={{backgroundImage: `url(${suiIcon.src})`}} />}
            <h2>{emote.name}</h2>
            <img src={emote.image} />
            <h3>{emote.attributes.rarity}</h3>
        </div>
        {hover && <div className="emote-hover">
            {emote.chain === 'sui' &&
            <div className="transfer-button"
                onMouseEnter={() => setTransferHover(true)}
                onMouseLeave={() => setTransferHover(false)}
                style={{
                    backgroundImage: `url(${ transferHover ? transferBtnHover.src : transferBtn.src})`
                }}
                onClick={() => props.callback(emote)}
            >
                <h2>TRANSFER</h2>
            </div>}
        </div>}
    </div>
}

export default NftEmote