import { FP_PURCHASE } from "public/images";

const Button = (props: {
    text: string,
    callback: () => void,
}) => {
    return <span
        className="fp-progress-button"
        onClick={() => props.callback()}
    >
        <img src={FP_PURCHASE.btn.src} />
        <h3>{props.text}</h3>
    </span>
}

export default Button;