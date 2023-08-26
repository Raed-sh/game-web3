import { FP_PURCHASE } from "public/images";

const FpPurchaseStage = () => {
    return <div id='fp-purchase-stage'>
        <img id='fp-stage-bg' src={FP_PURCHASE.bg.src} />
        <h3 id='transaction-process'>Transaction Processing</h3>
        <div id='fp-purchase-spinner'>
            <img id='fp-spinner-outer' src={FP_PURCHASE.icons.fpProcessing.src} />
            <img id='fp-spinner-inner' src={FP_PURCHASE.icons.fpProcessingIcon.src} />
        </div>
    </div>
}

export default FpPurchaseStage;