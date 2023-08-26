import { COLLECTION } from "public/images"

import store_bg from "public/images/backgrounds/store-updated-bg.webp"
import openingBg from "public/images/backgrounds/deluxePacksBg.webp";

import packsBg from "public/images/backgrounds/packsBg.webp"
// import booster_bg from "public/images/backgrounds/Booster-Packs-main-bg-4k.webp"
import React, { useState } from "react"

export enum CollectionDisplay {
  packs,
  collected,
}

const CollectionWrapper = (props: {
  children: any
  title?: string
  useOpeningBackground?: boolean
  usePacksBackground?: boolean
  displaySwitcher: () => void
  displayValue: CollectionDisplay
  hideSwitcher?: boolean
}) => {
  const [buttonImage, setButtonImage] = useState(COLLECTION.buttons.changeBtn)
  const displayValue = props.displayValue

  // useEffect(() => {
  //   // redirect users to shop if they are not logged in and trying to use access a collection page
  //   if (!isLoggedIn) {
  //     router.push("/shop")
  //   }
  // }, [isLoggedIn])

  const getBackground = () => {
    if (props.useOpeningBackground || props.usePacksBackground) {
      if (props.useOpeningBackground) return openingBg.src
      if (props.usePacksBackground) return packsBg.src
    }
    return store_bg.src
  }

  const handleCollectionSwitch = () => {
    setButtonImage(COLLECTION.buttons.changeBtnPressed)
    props.displaySwitcher()
    setTimeout(() => {
      setButtonImage(COLLECTION.buttons.changeBtn)
    }, 250)
  }

  return (
    <div
      
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${getBackground()})`,
        backgroundSize: "cover",
        backgroundPositionX: "-100px",
        paddingTop: "5rem",
      }}
    >

      <div className="collection-wrapper">
        {/* <div className="collection-container">
          <Image src={MARKET_IMGS.golden_line} alt="" className="golden-line" />
        </div> */}

        <section className="booster-h">
          {!props.hideSwitcher && (
            <div id="collection-switch">
              <div
                id="collection-switch-unpacking"
                className={
                  displayValue === CollectionDisplay.packs
                    ? "collection-switch-box collection-switch-box-active"
                    : "collection-switch-box"
                }
                onClick={() => {
                  if (displayValue !== CollectionDisplay.packs) handleCollectionSwitch()
                }}
              >
                <img
                  src={
                    displayValue === CollectionDisplay.packs
                      ? COLLECTION.backgrounds.unpacking.active.src
                      : COLLECTION.backgrounds.unpacking.inactive.src
                  }
                />
                <span>PACKS</span>
              </div>
              <div
                id="collection-switch-collected"
                className={
                  displayValue === CollectionDisplay.collected
                    ? "collection-switch-box collection-switch-box-active"
                    : "collection-switch-box"
                }
                onClick={() => {
                  if (displayValue !== CollectionDisplay.collected) handleCollectionSwitch()
                }}
              >
                <img
                  src={
                    displayValue === CollectionDisplay.collected
                      ? COLLECTION.backgrounds.collected.active.src
                      : COLLECTION.backgrounds.collected.inactive.src
                  }
                />
                <span>ITEMS</span>
              </div>
              <div id="collection-switch-button">
                <img
                  src={buttonImage.src}
                  onMouseOver={() => setButtonImage(COLLECTION.buttons.changeBtnHover)}
                  onMouseOut={() => setButtonImage(COLLECTION.buttons.changeBtn)}
                  onClick={() => handleCollectionSwitch()}
                />
              </div>
            </div>
          )}
          <div></div>
        </section>
        {props.children}
      </div>
    </div>
  )
}

export default CollectionWrapper
