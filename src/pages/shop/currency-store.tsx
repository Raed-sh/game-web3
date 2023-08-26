import React, { useContext, useEffect, useState } from "react"
import PaymentModal from "@/components/PaymentModal"
import { ClientContext } from "@/context/ClientContext/index"
import Web3PaymentModal from "../../components/Web3PaymentModal"
import wallet_connect from "public/images/icons/WalletConnect.png"
// -----------

import { UserContext } from "@/context/UserContext"
import { CURRENCIES, CurrencyContext } from "@/context/CurrencyContext"
import { ADVENTURER_ICONS, BUNDLES, MARKET_BACKGROUNDS, MARKET_ICONS, STORE } from "public/images"
import { useDisconnect } from "wagmi"
import LayoutWrapper from "@/components/layoutWrapper"
import Bundle from "@/components/CurrencyStore/Bundle"
import Amount from "@/components/CurrencyStore/Amount"

// -----------

const CurrencyStore = () => {
  const { intentId, setIntentId, setClientSecret } = useContext(ClientContext)
  const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)
  // user balance, loaded from the UserContext
  const [balance, setBalance] = useState(0)

  const [success, setSuccess] = useState(false)

  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (isLoggedIn && fullUserData.web2Tokens) {
      setBalance(fullUserData.web2Tokens)
    }
  }, [isLoggedIn, fullUserData])

  // console.log("store isLoggedIn", isLoggedIn, fullUserData)

  const CRYSTALS = [
    {
      id: 1,
      amount: 1000,
      title: "1000",
      price: "2.50",
      img: BUNDLES.b1,
    },
    {
      id: 2,
      amount: 2100,
      title: "2100",
      price: "5.00",
      img: BUNDLES.b2,
    },
    {
      id: 3,
      amount: 4400,
      title: "4400",
      price: "10.00",
      img: BUNDLES.b3,
    },
    {
      id: 4,
      amount: 9000,
      title: "9000",
      price: "20.00",
      img: BUNDLES.b4,
    },
    {
      id: 5,
      amount: 23200,
      title: "23200",
      price: "50.00",
      img: BUNDLES.b5,
    },
    {
      id: 6,
      amount: 50000,
      title: "50000",
      price: "100.00",
      img: BUNDLES.b6,
    },
  ]

  //const [purchaseMethod, setPurchaseMethod] = useState("Visa")
  const { currency, setCurrency } = useContext(CurrencyContext)
  const [buyCrystal, setBuyCrystal] = useState<any>(undefined)
  const [maticPrice, setMaticPrice] = useState<number>(0)

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserDetails()
      setBalance(fullUserData.web2Tokens)
    }
  }, [success])

  useEffect(() => {
    if (buyCrystal !== undefined) {
      fetch("/api/updatePaymentIntent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Connection: "keep-alive",
          Accept: "*/*",
        },
        body: JSON.stringify({
          intentId: intentId,
          selectedPrice: buyCrystal.price,
        }),
      })
        .then((r) => r.json())
        .then((response) => {
          // console.log("update response: ", response)
          setIntentId(response.updatedId)
          setClientSecret(response.updatedSecret)
        })
    }
  }, [buyCrystal, intentId, setIntentId, setClientSecret])

  const resetStore = () => {
    setBuyCrystal(undefined)
    setSuccess(false)
  }

  useEffect(() => {
    if (currency.text == CURRENCIES[1].text && maticPrice == 0) {
      const fetchMaticPrice = async () => {
        let matic = await fetch("https://api.coincap.io/v2/assets")
          .then((response) => response.json())
          .then((response) => response.data.filter((item: any) => item.symbol == "MATIC")[0].priceUsd)

        setMaticPrice(matic)
      }
      fetchMaticPrice()
    }
  }, [currency])

  return (
    // <LayoutWrapper title="Currency Store" icon="/images/icons/Coin.webp" displayCurrency={true}>
    <div id="currency-store-wrapper" className="h-full">
      {/* TODO: add GIFT STORE (at some point in the future) */}
      {buyCrystal === undefined && (
        <>
          {currency.text != CURRENCIES[1].text ? ( // CURRENCIES[1].text = "MATIC"
            <>
              {CRYSTALS.map((b) => (
                <Bundle key={b.id} item={b} callback={() => setBuyCrystal(b)} maticPrice={0} />
              ))}
            </>
          ) : (
            <>
              {CRYSTALS.map((b) => (
                <Bundle key={b.id} item={b} callback={() => setBuyCrystal(b)} maticPrice={maticPrice} />
              ))}
            </>
          )}
        </>
      )}

      {buyCrystal && (
        <div id="currency-store-purchase">
          {success && <div id="currency-store-success"></div>}
          {!success && (
            <div id="currency-store-details">
              <img src={buyCrystal.img.preview.src} className="purchase-banner" />
              <div id="purchase-amount-container">
                <Amount text={buyCrystal.title} />
              </div>
              <div id="purchase-balance">
                <div className="balance-text">
                  <h3>Current balance :</h3>
                  <span>{balance} AEG</span>
                </div>
                <div className="balance-text">
                  <h3>Buying :</h3>
                  <span>{buyCrystal ? buyCrystal.title : 0} AEG</span>
                </div>
                <div className="balance-text purchase-new-balance">
                  <h3>New balance :</h3>
                  <span>{buyCrystal ? balance + parseInt(buyCrystal.title) : balance} AEG</span>
                </div>
                <div
                  style={{
                    border: "1px solid #7E7057",
                    margin: "2rem 0",
                  }}
                />
                <div className="balance-text">
                  <h3>Total :</h3>
                  {/* would be good to have live price conversion here but unsure what the prices will be */}
                  <span>${buyCrystal.price}</span>
                </div>
              </div>
            </div>
          )}
          <div id="currency-store-checkout">
            {!success && (
              <>
                {currency.text == CURRENCIES[1].text ||
                currency.text == CURRENCIES[2].text ||
                currency.text == CURRENCIES[3].text ? (
                  <Web3PaymentModal
                    buyCrystal={buyCrystal}
                    setBuyCrystal={setBuyCrystal}
                    callback={() => setSuccess(true)}
                  />
                ) : (
                  <PaymentModal
                    buyCrystal={buyCrystal}
                    setBuyCrystal={setBuyCrystal}
                    callback={() => setSuccess(true)}
                  />
                )}
              </>
            )}
            {success && (
              <div id="purchase-success">
                <div id="back-to-currency-store" onClick={() => resetStore()}>
                  <h3>To the currency store</h3>
                  <img src={STORE.arrow.src} />
                </div>
                <div id="result-display">
                  <img id="result-coin" src={STORE.coin.src} />
                  <h2>New balance:</h2>
                  <div id="new-balance">
                    <h3>{balance} </h3>
                    <img src={STORE.coin.src} />
                  </div>
                  <div id="separator"></div>
                  <h2>Success!</h2>
                  <img id="result-sign" src={STORE.sign.src} />
                  <img src={STORE.coins.src} id="result-coins" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
  {
    /* </LayoutWrapper> */
  }
}
export default CurrencyStore
