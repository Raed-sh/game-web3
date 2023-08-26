import { FP_PURCHASE, MARKET_ICONS } from "public/images";
import Button from "./Button";

const SuccessStage = (props: {
    packType: string,
    callback: () => void,
}) => {
    let background = FP_PURCHASE.packBg.classic;

    switch (props.packType) {
        case "premium":
            background = FP_PURCHASE.packBg.premium;
            break;
        case "legendary":
            background = FP_PURCHASE.packBg.legendary;
            break;
        default:
            break;
    }

    return <div id='fp-success'>
        <img id='fp-stage-bg' src={background.src} />
        <div id='fp-success-content'>
            <h1 id='fp-success-title'>
                {props.packType} Deluxe Pack
            </h1>
            {/* TODO: show plain/tradeable assets once the latter is implemented */}
            <p id='fp-success-subtitle'>
                Plain Assets
            </p>
            <h3 id='fp-success-text'>Success!</h3>
            <div id='fp-success-checkmark'>
                <img src={MARKET_ICONS.success.src} />
            </div>
            <div id='fp-success-btn'>
                <Button text={"SHOW COLLECTED"} callback={props.callback}/>
            </div>
        </div>
    </div>
}

export default SuccessStage;