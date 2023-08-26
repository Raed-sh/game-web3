import React, { useContext, useState } from "react"
import bpBackground from "public/images/backgrounds/Bp-bg.png";

const BoosterPacksWrapper = (props: { children: any; title?: string }) => {
  return (
    <div
      className="w-full h-full bg-center bg-cover flex flex-col items-center gap-4 bg-[url('/images/backgrounds/Bp-bg.png')]"
    >
      <div className="relative" id='booster-wrapper'>
        {props.children}
      </div>
    </div>
  )
}

export default BoosterPacksWrapper
