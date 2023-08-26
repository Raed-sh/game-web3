import { FP_PURCHASE } from "public/images";
import Button from "./Button";

const ErrorStage = (props: {
    error: string,
    callback: () => void,
}) => {
    return <div id='fp-stage-error'>
        <img id='fp-stage-bg' src={FP_PURCHASE.bg.src} />
        <h3 id='transaction-error'>Transaction failed</h3>
        <img id='fp-error-img' src={FP_PURCHASE.icons.fpFailed.src} />
        <p id='fp-error-text'>{props.error}</p>
        <p id='fp-error-subtext'>Please try again</p>
        {/* TODO: button */}
        <div id='fp-error-btn'>
            <Button text={"Retry"} callback={props.callback}/>
        </div>
    </div>
}

export default ErrorStage;