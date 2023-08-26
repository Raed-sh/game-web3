import React, { useEffect, useState } from "react"

import { executeGaslessTransaction } from "@/utils/fetchesToAPI"
import { buildAndConvertB64, createTransferTransactionBlock } from "@/utils/suiHelpers"

const testUserId = "newguy2" //same as above

const TransferObject = ({ to, objectId }: { to: string; objectId: string }) => {
  const handleTransfer = async () => {
    const tx = await createTransferTransactionBlock(to, objectId)
    const b64Tx = await buildAndConvertB64(tx)
    const transferResult = await executeGaslessTransaction(testUserId, b64Tx)
    console.log("transferResult", transferResult)
  }

  return (
    <div className=" p-4 w-fit border-2 hover:bg-yellow-400 transition-all">
      <button onClick={handleTransfer}>TRANSFER</button>
    </div>
  )
}

export default TransferObject
