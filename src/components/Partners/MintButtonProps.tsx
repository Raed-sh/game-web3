import { useEffect, useState } from "react"

import btnNormal from "public/images/partners/btn.svg"
import btnHover from "public/images/partners/btn-hover.svg"
import btnPressed from "public/images/partners/btn-pressed.svg"

const defaultUrl = `url(${btnNormal.src})`

enum EButtonStates {
    normal, hover, pressed
}

export const MintButtonProps = (props: {text: string, callback: () => void}) => {
    const [buttonState, setButtonState] = useState(EButtonStates.hover)
    const [bg, setBg] = useState(defaultUrl)

    useEffect(() => {
        switch (buttonState) {
            case EButtonStates.hover:
                setBg(`url(${btnHover.src})`)
                break
            case EButtonStates.pressed:
                setBg(`url(${btnPressed.src})`)
                break
            default:
                setBg(defaultUrl)
                break
        }
    }, [buttonState])

    const processClick = () => {
        setButtonState(EButtonStates.pressed)

        setTimeout(() => {
            props.callback();
            setButtonState(EButtonStates.normal)
        }, 250)
    }

    return <div
        className="partners-button"
        style={{
            backgroundImage: bg
        }}
        onMouseEnter={() => setButtonState(EButtonStates.hover)}
        onMouseLeave={() => setButtonState(EButtonStates.normal)}
        onClick={() => processClick()}
    >
        <h2>{props.text}</h2>
    </div>
}