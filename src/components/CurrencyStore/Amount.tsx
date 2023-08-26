import { BUNDLES } from "public/images";
import { useState } from "react"

const Amount = (props: {text: string}) => {
    const [image, setImage] = useState(BUNDLES.amount.normal);
    const [isHover, setIsHover] = useState(false);

    const processClick = () => {
        setImage(BUNDLES.amount.pressed);

        setTimeout(() => {
            setImage(BUNDLES.amount.normal)
            // TODO: callback here
        }, 250);
    }

    return <div
        className="amount-box"
        onMouseEnter={() => {
            setIsHover(true);
            setImage(BUNDLES.amount.hover)
        }}
        onMouseLeave={() => {
            setIsHover(false);
            setImage(BUNDLES.amount.normal)
        }}
        onClick={() => processClick()}
    >
        <img src={image.src} alt='amount of coins you will get upon purchase' />
        <h4>{props.text}</h4>
        <img src={BUNDLES.amount.icon.src} className='amount-icon'/>
    </div>
}

export default Amount;