import React, { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { UserContext } from "@/context/UserContext"
import BoosterPacksWrapper from "@/components/BoosterPacksWrapper"
import HoveredButton from "@/components/HoveredButton"
import { IBoosterCard } from "@/utils/CONSTANTS"
import addToCardBtnBg from "public/images/backgrounds/add-to-cart.webp"
import addToCardBtnHoverBg from "public/images/backgrounds/add-to-cart-hover.webp"
import addToCardBtnPressedBg from "public/images/backgrounds/add-to-cart-pressed.webp"
import HoveredSection from "@/components/HoveredSection"
import buy_crrency from "public/images/miscs/Buy-currency.webp"
import { MARKET_BACKGROUNDS, MARKET_ICONS, MARKET_IMGS } from "public/images"
import Image from "next/image"
import Link from "next/link"
import ComingSoon from "@/components/BoosterPacks/ComingSoon"

const BoosterPack = () => {
  const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)
  const [loading, setLoading] = useState<boolean>(true)
  const [purchase, setPurchase] = useState<boolean>(false)
  const [pack, setPack] = useState<IBoosterCard | null>(null)
  const [buyQty, setBuyQty] = useState<number>(1)
  const [proceesPhase, setProcessPhase] = useState<string | null>(null)
  const router = useRouter()
  const { link } = router.query

  const isEmotePack = pack ? pack.link === "emote-pack" : false;

  useEffect(() => {
    if (!link) return
      ; (async () => {
        const packResult = await fetch("/api/getBoosterPackByLink", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            link: link,
          }),
        }).then((res) => res.json())
        if (packResult.length) {
          setPack(packResult[0])
        } else {
          router.push("404")
        }
        setLoading(false)
      })()
  }, [link, router])

  const handleBuy = async (pack: IBoosterCard, qty: number) => {
    console.log("FUD", fullUserData)
    console.log("handleBuy", pack, qty)
    try {
      //  decrement tokens from user based on qty and pack price
      setPurchase(true)
      const updateTokensResult = await fetch("/api/updateUserWeb2Tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: fullUserData?.id,
          tokens: -pack.price * qty, // pack.price * qty -------------------> TODO: 1000 is just a placeholder!!!!
          type: "buy-booster-pack",
        }),
      }).then((res) => res.json())

      console.log("updateTokensResult", updateTokensResult)
      if (updateTokensResult.status !== 200) throw new Error("error")
      // setProcessPhase("success") //not yet

      //  add pack to users web2 assets
      const addPackToUserResult = await fetch("/api/updateUserWeb2Assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: fullUserData?.id,
          assets: [
            {
              id: pack.link, // pack.id  -------------------> TODO: 1000 is just a placeholder!!!!
              type: "pack",
              count: qty, // qty -------------------> TODO: 1 is just a placeholder!!!!
            },
          ],
          type: "buy-booster-pack",
        }),
      }).then((res) => res.json())

      console.log("addPackToUserResult", addPackToUserResult)
      fetchUserDetails()
      if (addPackToUserResult.status !== 200) throw new Error("error")

      setPurchase(false)
      setProcessPhase("success")
    } catch (error) {
      console.log("error", error)
      setPurchase(false)
      setProcessPhase("error")
    }
  }

  const handleBuyQtyChange = (n: number) => {
    if (buyQty + n < 1) return
    if ((buyQty + n) * pack!.price > fullUserData.web2Tokens) return
    setBuyQty(buyQty + n)
  }

  return (
    <BoosterPacksWrapper>
      {!loading && pack && (
        <div
          className="booster-card"
          style={{
            backgroundImage: `url(${pack.blur_bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              backgroundRepeat: "no-repeat",
              width: "568px",
              height: "268px",
              display: "flex",
              alignItems: "flex-end",
              paddingBottom: "2rem",
              transform: "translateY(-2rem)",
              backgroundImage: `url(${pack.storePreview.src})`,
              backgroundSize: "contain",
            }}
          >
            {proceesPhase === "success" ? (
              <HoveredButton
                bg={MARKET_BACKGROUNDS.explore_bg.src}
                hover={MARKET_BACKGROUNDS.explore_bg_hover.src}
                style={{
                  width: "250px",
                  height: "62px",
                }}
                onClick={() => router.push(`/collection/${pack.link}`)}
                title="SHOW COLLECTED"
              />
            ) : (<>
              {purchase ? <span id='purchase-in-progress'>Purchase in progress...</span> :
                <HoveredButton
                  bg={addToCardBtnBg.src}
                  hover={addToCardBtnHoverBg.src}
                  clicked={addToCardBtnPressedBg.src}
                  style={{
                    width: "200px",
                    height: "92px",
                    marginTop: "-1rem",
                  }}
                  onClick={() => handleBuy(pack, buyQty)}
                >
                  <h5>Buy</h5>
                </HoveredButton>
              }</>)
            }
          </div>

          {!proceesPhase ? (
            <>
              <div className="counter-style">
                <span>
                  <Image src={"/images/new-store/ac-coin.svg"} alt="" width={50} height={50} />
                  {pack.price * buyQty} <span>AC</span>
                </span>
                <section>
                  <Image
                    src={"/images/icons/minus.svg"}
                    width={50}
                    height={50}
                    alt=""
                    style={{
                      opacity: buyQty > 1 ? 1 : 0.5,
                      cursor: buyQty > 1 ? "pointer" : "default",
                    }}
                    onClick={() => handleBuyQtyChange(-1)}
                  />
                  <span style={{minWidth: "83px", textAlign: "right"}}>{buyQty} Pack{buyQty > 1 && "s"}</span>
                  <Image
                    src={"/images/icons/plus.svg"}
                    width={50}
                    height={50}
                    alt=""
                    onClick={() => handleBuyQtyChange(+1)}
                  />
                </section>
              </div>
              <section className="pack-info mt-5">
                <h3>{pack.title}</h3>
                <div
                  style={{
                    width: "100%",
                    height: "1px",

                    backgroundImage: "radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%)",
                  }}
                  className="my-3"
                />
                { isEmotePack ?
                  <h4>{proceesPhase === "success" ? `${buyQty} packs` : `Contains ${pack.qty} Emotes`}</h4>
                  : 
                  <h4>{proceesPhase === "success" ? `${buyQty} packs` : `${pack.qty} Cards`}</h4>
                }
                { isEmotePack && <ComingSoon displaySubtext={true} />}
                <ul className="flex flex-wrap justify-center mt-4">
                  <p>{pack.desc}</p>
                </ul>
              </section>
            </>
          ) : proceesPhase === "success" ? (
            <div className="bp-purchase-success">
              <span>{buyQty} Pack</span>
              <h3>{pack.title}</h3>
              <div
                style={{
                  width: "100%",
                  height: "1px",

                  backgroundImage: "radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%)",
                }}
                className="my-3"
              />
              <Image src={MARKET_ICONS.success} alt="Success!" />
              <h3>Success!</h3>
            </div>
          ) : (
            <>
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "Roboto",
                  fontWeight: 300,
                  fontSize: 18,
                  color: "#BAB3BB",
                }}
                className="text-center"
              >
                You dont have enough <span>Aether Coins</span> to buy this item.
                {"\n"}
                Please buy game currency and try again
              </p>
              <div
                className="not-enough"
                style={{
                  position: "absolute",
                  bottom: 0,
                }}
              >
                <Link href={"/shop/currency-store"}>
                  <button>
                    <Image src={MARKET_ICONS.d_arr} alt="" />
                    <h3>currency store</h3>
                  </button>
                </Link>
                <Image src={buy_crrency} alt="" />
              </div>
            </>
          )}
        </div>
      )}
    </BoosterPacksWrapper>
  )
}

export default BoosterPack
