import { createHallidayWallet } from "@/utils/fetchesToAPI"
import React, { useEffect, useState } from "react"

// type Props = {}

const SuiConnect = ({ fullUserData }: any) => {
  const [walletAddress, setWalletAddress] = useState(fullUserData?.hallidaySuiWallet || null)

  useEffect(() => {
    console.log("fullUserData", fullUserData)
    if (!fullUserData?.hallidaySuiWallet && fullUserData?.id && !walletAddress) {
      createHallidayWallet(fullUserData.id).then((res) => {
        console.log("FINAL RES", res)
        setWalletAddress(res.wallet_address)
      })
    }

    if (fullUserData?.hallidaySuiWallet && !walletAddress) {
      setWalletAddress(fullUserData?.hallidaySuiWallet)
    }
  }, [fullUserData])

  useEffect(() => {
    console.log("wallet address", walletAddress)
  }, [walletAddress])

  //display the wallet address in a button with a copy to clipboard button

  return (
    <div>
      <p>WALLET ADDRESS</p>
      <p>WALLET ADDRESS: {walletAddress}</p>
    </div>
  )
}

export default SuiConnect
