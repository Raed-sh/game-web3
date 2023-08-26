import { IBoosterCard } from "@/utils/CONSTANTS"
import { useState } from "react"
import { useRouter } from "next/router"
import Count from "./Count"
import ComingSoon from "../BoosterPacks/ComingSoon"

// set to false before merging
const EMOTES_DISABLED = false

const CollectionBoosterPack = (props: { pack: IBoosterCard }) => {
  const router = useRouter()
  const { pack } = props
  const [hover, setHover] = useState(false)
  // console.log('INDIVIDUAL BP:', pack)

  const isEmotePack = pack.link === "emote-pack"

  return (
    <div
      key={pack.link}
      className="collection-bp-display"
      style={{
        backgroundImage: `url(${hover ? pack.collection_bg_hover : pack.collection_bg})`,
        filter: hover ? "drop-shadow(0px 0px 30px rgba(206, 189, 141, 0.5))" : "none",
        cursor: isEmotePack && EMOTES_DISABLED ? "not-allowed" : "pointer",
      }}
      title={isEmotePack && EMOTES_DISABLED ? "Coming soon!" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (isEmotePack && EMOTES_DISABLED) return
        router.push(`/collection/${pack.link}`)
      }}
    >
      <div>
        {/* TODO: display whether nft */}
        <Count count={pack.qtyOwned ? pack.qtyOwned : 1} />
      </div>
      {isEmotePack ? (
        <h2>
          {pack.qty} {pack.qty > 1 ? "emotes" : "emote"}
        </h2>
      ) : (
        <h2>
          {pack.qty} {pack.qty > 1 ? "cards" : "card"}
        </h2>
      )}
        {isEmotePack && <ComingSoon displaySubtext={false}/>}
    </div>
  )
}
export default CollectionBoosterPack
