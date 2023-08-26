import { useState } from "react"

export interface IEmote {
    isNFT: boolean
    id: string
    rarity: string
    reaction: string
    image_url: string
    name: string
  }
  

const Web2Emote = (props: {
    emote: IEmote,
}) => {
    const {emote} = props
    return <div
        key={`web2-emote-${emote.id}`}
        className='collection-emote'
    >
        <div className="emote-display">
            <h2>{emote.name}</h2>
            <img src={emote.image_url} crossOrigin="anonymous" />
            <h3>{emote.rarity}</h3>
        </div>
    </div>
}

export default Web2Emote