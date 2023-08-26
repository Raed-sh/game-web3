import { useRouter } from "next/router"
import wallet_connect from "public/images/backgrounds/wallet_connect.png"
import currency1 from "public/images/backgrounds/Currecy_1.png"
import currency2 from "public/images/backgrounds/Currecy_2.png"
import Image from "next/image"
import HoveredButton from "./HoveredButton"
import React, { useContext } from "react"
import Link from "next/link"
import { UserContext } from "@/context/UserContext"
import DiscordConnectButton from "./DiscordConnectButton"
import SuiConnect from "./sui/suiConnect"
import SuiWalletButton from "./sui/SuiWalletButton"

const StoreHead = () => {
  const router = useRouter()
  const { isLoggedIn, fullUserData } = useContext(UserContext)

  return (
    <section className="store-head">
      <button onClick={() => router.push("/shop")} />
      <div>
        {/* <HoveredButton
          bg={require('public/images/backgrounds/fractal.png')}
          hover={require('public/images/backgrounds/fractal.png')}
          style={{
            width: "202px",
            height: "45px",
          }}
        >
          <h5>Connect with Fractal</h5>
        </HoveredButton> */}
        {/* <SuiConnect fullUserData={fullUserData} /> */}
        <SuiWalletButton userId={fullUserData?.id} />
        <DiscordConnectButton url={process.env.NEXT_PUBLIC_DISCORD_SHOP_URL} />

        <HoveredButton
          bg={wallet_connect.src}
          hover={wallet_connect.src}
          style={{
            width: "202px",
            height: "45px",
          }}
          className={"header-button"}
        >
          <Link href="/">
            <h5>Wallet Connect</h5>
          </Link>
        </HoveredButton>

        <h4
          style={{
            backgroundImage: `url(${currency2.src})`,
          }}
        >
          <img src="" alt="" />
          <p className="header-button">0</p>
        </h4>

        <h4
          style={{
            backgroundImage: `url(${currency1.src})`,
          }}
        >
          <img src="" alt="" />
          <p className={"header-button"}>{fullUserData !== null ? fullUserData.web2Tokens || 0 : "Not logged in"}</p>
        </h4>
      </div>
    </section>
  )
}

export default StoreHead
