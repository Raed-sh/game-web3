import React, { useCallback, useEffect } from "react"
import { useAccount, useDisconnect, useSignMessage } from "wagmi"
import { useWeb3Modal } from "@web3modal/react"

// type Props = {}

const WalletConnect = ({ setSignature, signature, setError, userAccount }: any) => {
  const { address, isConnected } = useAccount()
  const { open, isOpen, close } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Sign to connect this wallet to your COE account",
  })

  const handleConnect = () => {
    console.log("handleConnect", isOpen)
    if (!isConnected) return open()
    console.log("already connected to wallet", address)
  }

  const handleDisconnect = () => {
    if (isConnected) {
      setError(null)
      setSignature(null)
      return disconnect()
    }
    console.log("not connected to wallet", address)
  }

  const memorizedSignature = useCallback(() => {
    setSignature(data)
  }, [data, setSignature])

  // useEffect(() => {
  //   if (isConnected && !signature) {
  //     console.log("connected to wallet", address)
  //     signMessage()
  //   }
  // }, [isConnected])

  const agFont = "font-medusa text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-200"
  const agFontGray = "font-medusa text-gray-400"
  const agBorder = "rounded-sm p-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-amber-200"

  useEffect(() => {
    if (data) {
      memorizedSignature()
      // setSignature(data)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [data, memorizedSignature])

  // if (isConnected && !signature)
  //   return (
  //     <button className="w-fit bg-yellow-500 text-black rounded-sm p-2" onClick={() => signMessage()}>
  //       Sign Message
  //     </button>
  //   )
  // if (isConnected)
  //   return (
  //     <button className="w-fit bg-red-500 text-black rounded-sm p-2" onClick={handleDisconnect}>
  //       Wallet Disconnect
  //     </button>
  //   )
  return (
    <div className="w-full flex items-center justify-center">
      {isConnected && userAccount == address ? (
        <div className={`${agBorder} w-fit`}>
          <div className="bg-gray-900 hover:bg-gray-800 transition-all rounded-sm">
            <button className={`${agFontGray} rounded-sm py-2 px-14`} onClick={handleDisconnect}>
              Wallet Disconnect
            </button>
          </div>
        </div>
      ) : isConnected && !signature ? (
        <div className="flex gap-4">
          <div className={`${agBorder} w-fit`}>
            <div className="bg-gray-900 hover:bg-gray-800 transition-all rounded-sm">
              <button className={`${agFont} rounded-sm py-2 px-14`} onClick={() => signMessage()}>
                Sign Message
              </button>
            </div>
          </div>
          <div className={`border border-gray-500 w-fit`}>
            <div className="bg-gray-900 hover:bg-gray-800 transition-all rounded-sm">
              <button className={`${agFont} rounded-sm py-2 px-14`} onClick={handleDisconnect}>
                Wallet Disconnect
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${agBorder} w-fit`}>
          <div className="bg-gray-900 hover:bg-gray-800 transition-all rounded-sm">
            <button className={`${agFont} rounded-sm py-2 px-14`} onClick={handleConnect}>
              Wallet Connect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletConnect
