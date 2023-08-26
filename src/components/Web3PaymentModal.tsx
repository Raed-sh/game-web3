import { FC, useCallback, useEffect, useState, useRef, useContext, useLayoutEffect } from "react"
import { ClientContext } from "../context/ClientContext/index"
import { CURRENCIES, CurrencyContext } from "@/context/CurrencyContext"
import { UserContext } from "../context/UserContext"
import {
  useAccount,
  usePrepareSendTransaction,
  useWaitForTransaction,
  useSendTransaction,
  usePrepareContractWrite,
  useContractWrite,
  useDisconnect,
  useSwitchNetwork,
} from "wagmi"
import {
  ADMIN_WALLET,
  USDT_CONTRACT_ABI,
  USDT_CONTRACT_ADDRESS,
  USDC_CONTRACT_ADDRESS,
  USDC_CONTRACT_ABI,
  USDC_GOERLI_CONTRACT_ADDRESS,
  USDC_GOERLI_CONTRACT_ABI,
} from "../utils/CONSTANTS"
import { BigNumber, utils } from "ethers"
import { useWeb3Modal } from "@web3modal/react"
import { MARKET_ICONS } from "public/images"
import { MARKET_IMGS } from "public/images"
import { awaitTxThenUpdateTokens } from "@/utils/fetchesToAPI"
import { getMaticPrice } from "@/utils/web3Functions/getMaticPrice"

export const Web3PaymentModal: FC<any> = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMaticPrice, setCurrentMaticPrice] = useState(0)
  const [value, setValue] = useState<bigint | undefined>(undefined)
  const { address, isConnected } = useAccount()
  const { isLoggedIn, fullUserData, fetchUserDetails } = useContext(UserContext)
  const { currency, setCurrency } = useContext(CurrencyContext)
  const { open } = useWeb3Modal()
  const [loading, isL] = useState(true)

  const { switchNetwork, chains } = useSwitchNetwork()

  const { disconnect } = useDisconnect()

  //Native payments tx preparation
  const { config: nativePaymentsConfig, error: nativePaymentsError } = usePrepareSendTransaction({
    to: ADMIN_WALLET,
    value: value,
  })
  const {
    data: nativePaymentsData,
    sendTransaction: sendNativePaymentsTransaction,
    error: sendNativePaymentsTxError,
  } = useSendTransaction(nativePaymentsConfig)
  const { isLoading: isNativePaymentLoading, isSuccess: isNativePaymentSuccess } = useWaitForTransaction({
    hash: nativePaymentsData?.hash,
  })
  //Stable coin USDT payments tx preparation
  const { config: contractUSDTConfig, isError: isPrepareUSDTContractError } = usePrepareContractWrite({
    address: USDT_CONTRACT_ADDRESS,
    abi: USDT_CONTRACT_ABI,
    functionName: "transfer",
    args: [ADMIN_WALLET, props.buyCrystal.price * 1000000],
  })
  const {
    data: contractUSDTData,
    write: writeUSDT,
    error: USDTContractWriteError,
  } = useContractWrite(contractUSDTConfig)
  const { isLoading: isContractUSDTLoading, isSuccess: isContractUSDTSuccess } = useWaitForTransaction({
    hash: contractUSDTData?.hash,
  })
  //Stable coin USDC payments tx preparation
  const { config: contractUSDCConfig, isError: isPrepareUSDCContractError } = usePrepareContractWrite({
    address: USDC_CONTRACT_ADDRESS, //USDC_GOERLI_CONTRACT_ADDRESS
    abi: USDC_CONTRACT_ABI, //USDC_GOERLI_CONTRACT_ABI,
    functionName: "transfer",
    args: [ADMIN_WALLET, props.buyCrystal.price * 1000000],
  })
  const {
    data: contractUSDCData,
    write: writeUSDC,
    error: USDCContractWriteError,
  } = useContractWrite(contractUSDCConfig)
  const { isLoading: isContractUSDCLoading, isSuccess: isContractUSDCSuccess } = useWaitForTransaction({
    hash: contractUSDCData?.hash,
  })

  useEffect(() => {
    disconnect()
    const fetchEthPrice = async (setValue: React.Dispatch<React.SetStateAction<bigint | undefined>>) => {
      let maticPrice = await getMaticPrice()

      setValue(utils.parseEther((props.buyCrystal.price / maticPrice).toFixed(6)).toBigInt())
      setCurrentMaticPrice(maticPrice)
    }
    fetchEthPrice(setValue)
  }, [])

  useEffect(() => {
    const txHash = contractUSDCData?.hash || contractUSDTData?.hash || nativePaymentsData?.hash || null

    if (txHash) {
      console.log("txhashhhh:", txHash)
      awaitTxThenUpdateTokens(fullUserData.id, txHash, Number(props.buyCrystal.title))
    }
  }, [contractUSDCData, contractUSDTData, nativePaymentsData])

  useEffect(() => {
    if (isNativePaymentSuccess || isContractUSDCSuccess || isContractUSDTSuccess) {
      fetchUserDetails()
      props.callback()
    }
  }, [isNativePaymentSuccess, isContractUSDCSuccess, isContractUSDTSuccess])

  const handleTransaction = async () => {
    if (isConnected) {
      //check if user is on the right network, if not, switch to the right network
      console.log("chains:", chains)

      if (currency.text == CURRENCIES[1].text) {
        if (sendNativePaymentsTransaction && !nativePaymentsError) {
          sendNativePaymentsTransaction()
        } else if (nativePaymentsError) {
          console.log("There was an error preparing your native token payment")
        } else console.log("sendTransaction for native payments is undefined")
      } else if (currency.text == CURRENCIES[2].text) {
        if (writeUSDT) {
          writeUSDT()
        } else {
          console.log("write for USDT payments is undefined")
        }
      } else if (currency.text == CURRENCIES[3].text) {
        if (writeUSDC) {
          writeUSDC()
        } else {
          console.log("write for USDC payments is undefined")
        }
      }
    } else {
      open()
    }
  }

  return (
    <div className="web3-payment-modal">
      {isNativePaymentLoading ? (
        <div className="loading-modal">
          <p className="gray">This could take a few minutes. Thanks for waiting!</p>
          <p className=" text-red-500 text-center">DO NOT LEAVE THIS SCREEN UNTIL YOUR TRANSACTION HAS COMPLETED</p>
          <div className="transaction-processing-div">
            <img src={MARKET_ICONS.polygon.src}></img>
            <p className="big weight color shadow">{currentMaticPrice * props.buyCrystal.price} MATIC</p>
            <p className="shadow color big playfair">Transaction processing</p>
          </div>
          <div className="processing-logo">
            <img src={MARKET_IMGS.proccesing_icon.src}></img>
            <img src={MARKET_IMGS.proccesing.src}></img>
          </div>
          <img className="buy-currencies-img" src={MARKET_IMGS.buy_currencies.src}></img>
        </div>
      ) : isContractUSDTLoading ? (
        <div className="loading-modal">
          <p className="gray">This could take a few minutes. Thanks for waiting!</p>
          <p className=" text-red-500 text-center">DO NOT LEAVE THIS SCREEN UNTIL YOUR TRANSACTION HAS COMPLETED</p>
          <div className="transaction-processing-div">
            <img src={MARKET_ICONS.polygon.src}></img>
            <p className="big weight color shadow">{props.buyCrystal.price} USDT</p>
            <p className="shadow color big playfair">Transaction processing</p>
          </div>
          <div className="processing-logo">
            <img src={MARKET_IMGS.proccesing_icon.src}></img>
            <img src={MARKET_IMGS.proccesing.src}></img>
          </div>
          <img className="buy-currencies-img" src={MARKET_IMGS.buy_currencies.src}></img>
        </div>
      ) : isContractUSDCLoading ? (
        <div className="loading-modal">
          <p className="gray">This could take a few minutes. Thanks for waiting!</p>
          <p className=" text-red-500 text-center">DO NOT LEAVE THIS SCREEN UNTIL YOUR TRANSACTION HAS COMPLETED</p>
          <div className="transaction-processing-div">
            <img src={MARKET_ICONS.polygon.src}></img>
            <p className="big weight color shadow">{props.buyCrystal.price} USDC</p>
            <p className="shadow color big playfair">Transaction processing</p>
          </div>
          <div className="processing-logo">
            <img src={MARKET_IMGS.proccesing_icon.src}></img>
            <img src={MARKET_IMGS.proccesing.src}></img>
          </div>
          <img className="buy-currencies-img" src={MARKET_IMGS.buy_currencies.src}></img>
        </div>
      ) : isNativePaymentSuccess || isContractUSDCSuccess || isContractUSDTSuccess ? (
        <>
          <div className="success-modal">
            <div className="new-balance">
              <img src={MARKET_IMGS.aeg_token.src}></img>
              <h2 className="shadow big color playfair">New balance:</h2>
              <h2 className="shadow big color playfair"> {fullUserData.web2Tokens} AC</h2>
            </div>
            <div className="success-div">
              <h2 className="shadow big color playfair">Success!</h2>
              <img src={MARKET_ICONS.success.src}></img>
              <button className="success-button" onClick={() => props.setBuyCrystal(undefined)}>
                Back
              </button>
            </div>
            <img className="buy-currencies-img" src={MARKET_IMGS.buy_currencies.src}></img>
          </div>
        </>
      ) : (
        <>
          <div className="main-modal">
            <div className="conversions">
              {currency.text == CURRENCIES[1].text ? (
                <>
                  <p>
                    <span className="weight">Conversion rate:</span>{" "}
                    <span className="gray">1$ = {currentMaticPrice} MATIC</span>
                  </p>
                  <p>
                    <span className="weight shadow big">${props.buyCrystal.price} =</span>{" "}
                    <span className="big weight color shadow">{props.buyCrystal.price / currentMaticPrice} MATIC</span>
                  </p>
                </>
              ) : currency.text == CURRENCIES[2].text ? (
                <>
                  <p>
                    <span className="weight">Conversion rate:</span> <span className="gray">1$ = 1 USDT</span>
                  </p>
                  <p>
                    <span className="weight shadow big">${props.buyCrystal.price} =</span>{" "}
                    <span className="big weight color shadow">{props.buyCrystal.price} USDT</span>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className="weight">Conversion rate:</span> <span className="gray">1$ = 1 USDC</span>
                  </p>
                  <p>
                    <span className="weight shadow big">${props.buyCrystal.price} =</span>{" "}
                    <span className="big weight color shadow">{props.buyCrystal.price} USDC</span>
                  </p>
                </>
              )}
            </div>
            {!isConnected ? (
              <div className="buttonsContainer">
                <div className="connectButtons">
                  <button onClick={() => open()}>Connect wallet</button>
                  <button onClick={() => props.setBuyCrystal(undefined)}>Cancel</button>
                </div>
              </div>
            ) : nativePaymentsError && currency.text == CURRENCIES[1].text ? (
              <div className="buttons1">
                <button onClick={() => props.setBuyCrystal(undefined)}>Cancel</button>
                <p className="gray error">
                  You don't have enough <span className="weight color shadow">MATIC</span> funds! Fund your wallet and
                  try again or switch cryptocurrency
                </p>
              </div>
            ) : isPrepareUSDTContractError && currency.text == CURRENCIES[2].text ? (
              <div className="buttons1">
                <button onClick={() => props.setBuyCrystal(undefined)}>Cancel</button>
                <p className="gray error">
                  You don't have enough <span className="weight color shadow">USDT</span> funds! Fund your wallet and
                  try again or switch cryptocurrency
                </p>
              </div>
            ) : isPrepareUSDCContractError && currency.text == CURRENCIES[3].text ? (
              <div className="buttons1">
                <button onClick={() => props.setBuyCrystal(undefined)}>Cancel</button>
                <p className="gray error">
                  You don't have enough <span className="weight color shadow">USDC</span> funds! Fund your wallet and
                  try again or switch cryptocurrency
                </p>
              </div>
            ) : (
              <div>
                <div className="buttons">
                  <button onClick={() => props.setBuyCrystal(undefined)}>Cancel</button>
                  <button onClick={() => handleTransaction()}>Pay ${props.buyCrystal.price}</button>
                </div>
                {sendNativePaymentsTxError && currency.text == CURRENCIES[1].text ? (
                  <p>There was an error with the transaction, please try again.</p>
                ) : USDTContractWriteError && currency.text == CURRENCIES[2].text ? (
                  <p>There was an error with the transaction, please try agian.</p>
                ) : USDCContractWriteError && currency.text == CURRENCIES[3].text ? (
                  <p>There was an error with the transaction, please try agian.</p>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Web3PaymentModal
