import React, { useContext, useState } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { UserContext } from "@/context/UserContext"
import { STORE } from "public/images"
import StoreHead from "./StoreHead"
import { MintButton } from "./Partners/MintButton"
import { MintWindow } from "./Partners/MintWindow"

const MarketplaceWrapper = (props: { children: any, showPartnersIcon?: boolean }) => {
  const router = useRouter()
  const pathname = router.pathname
  const { isLoggedIn, checkIfHasCrafted } = useContext(UserContext)
  const [showPartners, setShowPartners] = useState(false);

  const closeCallback = () => {
    setShowPartners(false)
    checkIfHasCrafted()
  }

  return (
    <motion.div
      className="store-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >

      <div
        style={{
          height: "100%",
          width: "100%",
          paddingTop: "1em",
          backgroundImage: `url(${STORE.bg.src})`,
          position: "relative",
        }}
      >
        {showPartners && <MintWindow closeCallback={() => closeCallback()} />}
        {props.showPartnersIcon && <MintButton callback={() => setShowPartners(true)} />}
        {pathname === "/shop/currency-store" && <div className="blur-bg" />}
        <StoreHead />

        <div className="market-container">
          <h1>Aether Store</h1>
          {props.children}
        </div>
      </div>
    </motion.div>
  )
}

export default MarketplaceWrapper
