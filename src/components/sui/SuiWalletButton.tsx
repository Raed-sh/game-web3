import { getShinamiWallet } from "@/utils/fetchesToAPI"
import Image from "next/image"
import React, { useEffect, useState } from "react"

const SuiWalletButton = ({ userId }: { userId: string }) => {
  const [shinamiWallet, setShinamiWallet] = useState("")
  const [copied, setCopied] = useState(false)
  const handleClick = async () => {
    const wallet = await getShinamiWallet(userId)
    setShinamiWallet(wallet)
  }

  const handleCopy = () => {
    shinamiWallet && navigator.clipboard.writeText(shinamiWallet)
    setCopied(true)
  }

  useEffect(() => {
    // wait 2 seconds and reset copied state
    const timeout = setTimeout(() => {
      setCopied(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className=" bg-black bg-opacity-30 cursor-pointer flex rounded px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg gap-2">
      <Image src={require("public/images/partners/Sui.webp")} alt="SUI Wallet" width={10} height={10} />
      {shinamiWallet ? (
        <p onClick={handleCopy} className={``}>
          {copied
            ? "Copied!"
            : shinamiWallet.substring(0, 6) + "..." + shinamiWallet.substring(shinamiWallet.length - 4)}
        </p>
      ) : (
        <p className="" onClick={handleClick}>
          SUI Wallet
        </p>
      )}
    </div>
  )
}

export default SuiWalletButton
