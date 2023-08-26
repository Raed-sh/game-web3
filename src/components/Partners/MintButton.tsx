import { useEffect, useState } from "react"

import mintBtnNormal from "public/images/partners/Get-tradable-emotes-button.webp"
import mintBtnHover from "public/images/partners/Get-tradable-emotes-button-hover.webp"
import mintBtnPressed from "public/images/partners/Get-tradable-emotes-button-pressed.webp"
import suiIcon from "public/images/partners/Sui-active.webp"

const defaultUrl = `url(${mintBtnNormal.src})`

enum EButtonStates {
  normal,
  hover,
  pressed,
}

export const MintButton = (props: { callback: () => void }) => {
  const [buttonState, setButtonState] = useState(EButtonStates.hover)
  const [bg, setBg] = useState(defaultUrl)

  useEffect(() => {
    switch (buttonState) {
      case EButtonStates.hover:
        setBg(`url(${mintBtnHover.src})`)
        break
      case EButtonStates.pressed:
        setBg(`url(${mintBtnPressed.src})`)
        break
      default:
        setBg(defaultUrl)
        break
    }
  }, [buttonState])

  const processClick = () => {
    setButtonState(EButtonStates.pressed)

    setTimeout(() => {
      props.callback()
      setButtonState(EButtonStates.normal)
    }, 250)
  }

  return (
    <div
      id="partners-mint-button"
      className=" animate-pulse"
      style={{
        backgroundImage: bg,
      }}
      onMouseEnter={() => setButtonState(EButtonStates.hover)}
      onMouseLeave={() => setButtonState(EButtonStates.normal)}
      onClick={() => processClick()}
    >
      <h2>Get Tradable Partner Emotes</h2>
      <img id="partner-icon" src={suiIcon.src} />
    </div>
  )
}
