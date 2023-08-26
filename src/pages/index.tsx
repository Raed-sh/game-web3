import { useRouter } from "next/router"
import React, { useCallback, useContext, useEffect, useState } from "react"
import WalletConnect from "@/components/WalletConnect"
import { useAccount } from "wagmi"
import { getNFTs, registerWallet, verifyToken } from "@/utils/fetchesToAPI"
import { UserContext } from "@/context/UserContext"
import Image from "next/image"
import Link from "next/link"
import DiscordConnectButton from "@/components/DiscordConnectButton"

type queryData = {
  id: string
  username: string
}

export default function Home() {
  const router = useRouter()
  const { fullUserData, setFullUserData, setUserAddress, fetchUserDetails } = useContext(UserContext)
  const { address, isConnected } = useAccount()

  const [queryData, setQueryData] = useState<queryData | null>(null)
  const [signature, setSignature] = useState<string | null>(null)
  const [NFTs, setNFTs] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [hasMounted, setHasMounted] = useState<boolean>(false)
  const [backHovered, setBackHovered] = useState<string>()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (address) setUserAddress(address)
  }, [address])

  useEffect(() => {
    if (!router.isReady) return

    if (router.query.token) {
      console.log("token found", router.query.token)
      //send token to backend to verify
      verifyToken(router.query.token as string).then((data) => {
        console.log("verification data", data)
        setQueryData(data)
        setFullUserData(data)
      })
    } else if (!router.query.token) {
      console.log("No token found, checking if user has context")
      if (fullUserData) {
        console.log("fullUserData", fullUserData)
        setQueryData(fullUserData)
        // setCurrentUserData(fullUserData)
        setFullUserData(fullUserData)
        return
      }
      console.log("No token or state found")
      return setError("No token found")
    }
  }, [router.isReady, router.query])

  const handleConfirm = useCallback(async () => {
    if (!queryData) return
    if (!isConnected) return
    console.log("handleConfirm")
    try {
      if (!address || !queryData.id || !signature) throw new Error("No address, id, or signature found")

      const payload = {
        id: queryData.id,
        username: queryData.username || queryData.id,
        account: address!,
        signature: signature!,
        // NFTs: NFTs,
      }

      //send to backend for processing
      const result = await registerWallet(payload)
      console.log("register wallet result", result)
      if (result.status === 500) {
        setError(result.message)
      }
      setFullUserData(result.data)
    } catch (error) {
      console.log(error)
    }
  }, [address, isConnected, queryData, setFullUserData, signature])

  useEffect(() => {
    if (signature) {
      handleConfirm()
      console.log("signature", signature)
    }
  }, [signature, handleConfirm])

  const agFont = "font-medusa text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-200"
  const boxBg = "bg-gradient-to-b from-[rgba(0,0,0,1)] via-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.3)]"

  if (!hasMounted) return null
  // if (error == "No token found") {
  //   return <div>failed to load. No token given</div>
  // } else
  return (
    <div className="relative w-screen">
      <div className="fixed w-full h-screen z-[-1]">
        <Image src="/images/background.webp" alt="bg image" className=" object-cover" fill />
      </div>
      <div className="flex flex-col items-center">
        {/* <DiscordConnectButton url={process.env.NEXT_PUBLIC_DISCORD_WALLET_URL} /> */}
        <div className="w-full flex justify-end">
          <Link href={`/shop`} className=" w-fit px-6">
            <div
              onMouseEnter={() => setBackHovered("hovered")}
              onMouseLeave={() => setBackHovered("notHovered")}
              onMouseUp={() => setBackHovered("hovered")}
              onMouseDown={() => setBackHovered("clicked")}
              className={`relative w-64 h-32 flex flex-col justify-center`}
            >
              {backHovered == "hovered" ? (
                <Image src="/images/icons/Aether-store-hover.png" alt="bg image" className=" object-contain" fill />
              ) : backHovered == "clicked" ? (
                <Image src="/images/icons/Aether-store-pressed.png" alt="bg image" className=" object-contain" fill />
              ) : (
                <Image src="/images/icons/Aether-store.png" alt="bg image" className=" object-contain" fill />
              )}
              <div className={`z-10 ml-14 text-center ${agFont} font-bold text-sm`}>
                <p className="">Aether</p>
                <p className="">Store</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex gap-20 justify-center items-center flex-wrap mt-32">
          <div className={` h-[500px] w-[600px]`}>
            <div className=" h-1/4 relative">
              {/* block header */}
              <div className="absolute w-full h-full z-[-1]">
                <Image src="/images/walletConnectBanner.webp" alt="bg image" className=" object-cover" fill />
              </div>
              <div className="p-6">
                {!fullUserData?.account ? (
                  <p className="text-gray-500">NOT CONNECTED</p>
                ) : (
                  <div className="text-amber-200 font-bold">
                    <p>SUCCESSFULLY CONNECTED</p>
                  </div>
                )}
                <p className="text-gray-300">
                  {fullUserData?.username || queryData?.username || fullUserData?.id || queryData?.id || "New User"}
                </p>
              </div>
            </div>
            <div className={`${boxBg} px-10 h-3/4 flex flex-col gap-6 items-center justify-center`}>
              {/* block body */}
              {error ? (
                <div>
                  <p className="text-red-500">{error}</p>
                </div>
              ) : !fullUserData?.account ? (
                <div>
                  <h1 className="text-center text-lg p-10 font-bold">
                    Please connect your wallet to your account and sign to use your items
                  </h1>
                  <p className="text-center text-gray-400">No wallet connected yet</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  <div>
                    <p className="text-gray-300">Current user account wallet:</p>
                    <p className={` text-amber-200 text-glow-amber`}>{fullUserData?.account}</p>
                  </div>
                  {/* <div>
                    <p className="text-gray-300">Digital assets in wallet:</p>
                    <p className={` text-amber-200 text-glow-amber`}>{NFTs.length || 0}</p>
                  </div> */}
                </div>
              )}
              <div className="text-center">
                {((fullUserData?.account && isConnected) || fullUserData?.account !== address) && (
                  <div className=" italic text-sm pb-2 text-gray-300">
                    <p>You can connect a different wallet if you would like.</p>
                    <p>Your current mobile wallet connection status is: {address || "Not Connected"}</p>
                  </div>
                )}
                <WalletConnect
                  setSignature={setSignature}
                  signature={signature}
                  setError={setError}
                  userAccount={fullUserData?.account || null}
                />
              </div>
            </div>
          </div>

          {/* FRACTAL SECTION */}
          {/* 
          <div className="w-[600px] h-[500px]">
            <div className=" h-1/4 relative">
              <div className="absolute w-full h-full z-[-1]">
                <Image src="/images/fractalBanner.webp" alt="bg image" className=" object-cover" fill />
              </div>
              <div className="p-6">
                {fullUserData?.fractalData ? (
                  <p className=" text-[#DE359C] font-bold">SUCCESSFULLY CONNECTED</p>
                ) : (
                  <p className="text-gray-500">NOT CONNECTED</p>
                )}
                <div className="pt-6">
                  <Image
                    src="/images/fractalLogo.svg"
                    alt="fractal logo"
                    width={90}
                    height={50}
                    // fill
                    style={{
                      width: "90px",
                      height: "50px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`${boxBg} p-10 h-3/4 flex flex-col gap-6 items-center justify-center`}>
              {fullUserData?.fractalData ? (
                <div className="flex flex-col gap-3">
                  <p className="pb-4 font-bold text-gray-400">You can participate in tournaments! </p>
                  <div>
                    <p className="">
                      <span className="text-gray-400">Fractal Username:</span> {fullUserData?.fractalData?.username}
                    </p>
                    <p className="">
                      <span className="text-gray-400">Fractal Email:</span> {fullUserData?.fractalData?.email}
                    </p>
                  </div>
                  <p className="text-gray-400">Fractal ID: {fullUserData?.fractalData?.userId}</p>
                </div>
              ) : fractalError ? (
                <div>
                  <h1 className="text-[#DE359C] text-center text-lg p-10 font-bold">
                    This account is already connected to another fractal account. Please log out of this Fractal account
                    and try another.
                  </h1>
                  <p className="text-center text-gray-400">No Fractal account added yet. </p>
                </div>
              ) : (
                <div>
                  <h1 className="text-gray-300 text-center text-lg p-10 font-bold">
                    You need a Fractal Wallet to participate and win prizes in Fractal tournaments
                  </h1>
                  <p className="text-center text-gray-400">No Fractal account added yet. </p>
                </div>
              )}
              <div className="flex justify-center">
                <Fractal
                  setFractalUser={setFractalUser}
                  queryData={queryData}
                  setCurrentUserData={setFullUserData}
                  currentUserData={fullUserData}
                  setFractalError={setFractalError}
                />
              </div>
            </div>
          </div> */}
        </div>
        <div className="py-10 flex flex-col items-center gap-2 text-center text-sm text-gray-400">
          <div className="h-28 w-32 relative">
            <Image src="/images/agLogo.svg" alt="bg image" className=" object-contain" fill />
          </div>
          <a href="#" className="underline">
            Privacy Policy
          </a>
          <p>© Aether Games Inc 2022. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
