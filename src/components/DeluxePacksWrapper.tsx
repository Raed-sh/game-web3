import { ReactNode, useCallback, useContext, useState } from "react"
import { useRouter } from "next/router"

import fpBg from "public/images/backgrounds/FP-store-bg.webp";

const DeluxePacksWrapper = (props: { children: ReactNode }) => {

  const { query } = useRouter()

  return (
    <div className="w-full h-full bg-center bg-cover flex flex-col items-center"
      style={{
        backgroundImage: `url(${fpBg.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative top-20">
        {props.children}
      </div>
    </div>
  )
}
export default DeluxePacksWrapper