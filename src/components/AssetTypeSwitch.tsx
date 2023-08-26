import React, { useContext } from "react"
import Image from "next/image"
import { AssetContext, AssetTypes } from "@/context/AssetsContext"
import switchIcon from "public/images/icons/switch.svg"

const AssetTypeSwitch = () => {
  const { assetType, setAssetType } = useContext(AssetContext)

  // console.log('ASSET TYPE:', assetType)

  return (
    <div className="switch py-16 " id="asset-switch">
      <button
        className={assetType === AssetTypes.tradeable ? "act" : ""}
        //  TODO: uncomment once the tradeable assets are enabled
        onClick={() => setAssetType(AssetTypes.tradeable)}
      >
        Tradable Items
      </button>
      {/* <div id='switcher-coming-soon'>
            <p>Coming soon!</p>
        </div> */}
      <button className={assetType === AssetTypes.plain ? "act" : ""} onClick={() => setAssetType(AssetTypes.plain)}>
        Plain Assets
      </button>
      <Image
        className="switcher"
        src={switchIcon}
        alt="Switcher"
        onClick={() => setAssetType(assetType === AssetTypes.plain ? AssetTypes.tradeable : AssetTypes.plain)}
      />
    </div>
  )
}

export default AssetTypeSwitch
