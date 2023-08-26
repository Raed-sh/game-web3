import React, { useEffect, useState } from "react"

import { createShinamiWallet, getShinamiWallet, mintEmote } from "@/utils/fetchesToAPI"

enum TxStatus {
  None = "none",
  Pending = "pending",
  Success = "success",
  Error = "error",
}

const MintEmote = ({ userId }: { userId: string }) => {
  const [shinamiWallet, setShinamiWallet] = useState(null)
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.None)

  const handleClick = async () => {
    console.log("user id: ", userId)
    let wallet = await getShinamiWallet(userId)
    if (wallet.code) {
      wallet = await createShinamiWallet(userId)
    }
    console.log("wallet: ", wallet)
    setShinamiWallet(wallet)
    const mintResult = await mintEmote(userId, wallet)
    console.log("Minted Emote: ", mintResult)
    //NOTE: effects.created[].reference.objectId is the asset minted
  }

  return (
    <div className="flex flex-col items-center">
      <p>{shinamiWallet && shinamiWallet}</p>
      {txStatus == TxStatus.None ? (
        <button onClick={handleClick}>MINT EMOTE</button>
      ) : (
        <p>Transaction Status: {txStatus}</p>
      )}
    </div>
  )
}

export default MintEmote
