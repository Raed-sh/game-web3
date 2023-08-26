import React from "react"

type Props = {}

const SoulboundDisclaimer = (props: Props) => {
  return (
    <div className="italic text-gray-500 flex justify-center w-full text-xs relative top-14">
      <div className="max-w-2xl text-center">
        *In Cards of Ethernity, Soulbound assets are a distinct category of items that are permanently tied to a player's account.
        Unlike tradable Web3 assets, Soulbound items cannot be exchanged or transferred between users.
      </div>
    </div>
  )
}

export default SoulboundDisclaimer
