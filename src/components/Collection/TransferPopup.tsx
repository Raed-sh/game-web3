import { UserContext } from "@/context/UserContext"
import { getShinamiWallet } from "@/utils/fetchesToAPI"
import { useContext, useEffect, useState } from "react"
import CloseButton from "../Partners/CloseButton"
import CopyButton from "./CopyButton"
import { INftEmote } from "./NftEmote"

import transferBtn from "public/images/partners/button.webp"
import transferBtnHover from "public/images/partners/button-hover.webp"
import warning from "public/images/partners/warning.webp"

import { executeGaslessTransaction } from "@/utils/fetchesToAPI"
import { buildAndConvertB64, createTransferTransactionBlock } from "@/utils/suiHelpers"

export enum AssetTypes {
  emote,
}

enum TransferStage {
  preview,
  result,
}

// only emote right now
const TransferPopup = (props: {
  asset: INftEmote
  callback: () => void
  assetType: AssetTypes.emote
  resultCallback: () => void
}) => {
  const [stage, setStage] = useState(TransferStage.preview)
  const { fullUserData } = useContext(UserContext)
  const [shinamiWallet, setShinamiWallet] = useState("")
  const [targetWallet, setTargetWallet] = useState("")

  const [sendHover, setSendHover] = useState(false)

  const [disabled, setDisabled] = useState(false)

  const [txDigest, setTxDigest] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getShinamiWallet(fullUserData.id).then((r: any) => setShinamiWallet(r))
  }, [])

  const executeTransfer = async () => {
    if (isLoading) return
    setIsLoading(true)
    setErrorMessage("")
    if (targetWallet === shinamiWallet) {
      setErrorMessage("Unable to send to the same address")
      return
    }
    if (targetWallet.length !== 66 && !targetWallet.startsWith("0x")) {
      setErrorMessage("Not a valid Sui address")
      return
    }
    if (targetWallet && !disabled) {
      setDisabled(true)
      const tx = await createTransferTransactionBlock(targetWallet, props.asset.address)
      const b64Tx = await buildAndConvertB64(tx)
      const transferResult = await executeGaslessTransaction(fullUserData.id, b64Tx)
      console.log("transferResult", transferResult)
      if (transferResult.effects && transferResult.effects.status.status === "success") {
        setTxDigest(transferResult.digest)
        setStage(TransferStage.result)
        props.resultCallback()
        setIsLoading(false)
      } else {
        setErrorMessage(transferResult.data.details)
      }
    }
  }

  return (
    <div id="transfer-asset-background">
      <div id="transfer-asset">
        <div id="partners-close-wrapper">
          <CloseButton callback={props.callback} />
        </div>
        <div id="partners-mint-title">
          <h2>Transfer tradable items for free</h2>
        </div>
        <div id="stage-result" className="partner-stage">
          <div id="partners-main-text">
            {stage === TransferStage.preview && (
              <>
                <h2>Transfer items to your personal wallet</h2>
                <div className="transfer-input-wrapper">
                  <label htmlFor="current-wallet">My in-game SUI address:</label>
                  <input
                    type="text"
                    id="current-wallet"
                    disabled
                    defaultValue={shinamiWallet}
                    className="transfer-input"
                  />
                  <CopyButton value={shinamiWallet} />
                </div>

                <div className="transfer-input-wrapper">
                  <label htmlFor="target-wallet">Transfer to a Sui wallet:</label>
                  <input
                    type="text"
                    id="target-wallet"
                    defaultValue={targetWallet}
                    className="transfer-input"
                    onChange={(e) => setTargetWallet(e.target.value)}
                  />
                  <CopyButton value={targetWallet} />
                </div>

                {errorMessage && <h3 id="transfer-error-message">{errorMessage}</h3>}

                <div className="send-and-warning">
                  <div
                    className="transfer-button"
                    onMouseEnter={() => setSendHover(true)}
                    onMouseLeave={() => setSendHover(false)}
                    style={{
                      backgroundImage: `url(${sendHover ? transferBtnHover.src : transferBtn.src})`,
                    }}
                    onClick={() => executeTransfer()}
                  >
                    <h2>{isLoading ? "Sending..." : "Send"}</h2>
                  </div>
                  <div id="transfer-warning">
                    <img src={warning.src} />
                    <p id="transfer-warning-text">
                      <b>Warning:</b> You will not be able to use the item in game if you transfer out of your in-game
                      wallet.
                    </p>
                  </div>
                </div>
              </>
            )}

            {stage === TransferStage.result && (
              <>
                <h2>Success!</h2>
                <div className="transfer-input-wrapper">
                  <label htmlFor="result-wallet">Your item was sent to:</label>
                  <input
                    type="text"
                    id="result-wallet"
                    disabled
                    defaultValue={targetWallet}
                    className="transfer-input"
                  />
                  <CopyButton value={targetWallet} />
                </div>

                <div className="transfer-input-wrapper transfer-hash-link">
                  <label htmlFor="result-digest">Transfer hash link:</label>
                  <input type="text" id="result-digest" disabled defaultValue={txDigest} className="transfer-input" />
                  <CopyButton
                    value={`https://suiexplorer.com/txblock/${txDigest}?network=${process.env.NEXT_PUBLIC_SUI_NETWORK}`}
                  />
                </div>
              </>
            )}
          </div>
          <div id="partners-main-right">
            <div id="partners-result-display">
              {props.assetType == AssetTypes.emote && (
                <>
                  <h2>{props.asset.name}</h2>
                  <img id="result-emote" src={props.asset.image} />
                  <h3>{props.asset.attributes.rarity}</h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransferPopup
