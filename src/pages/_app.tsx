import StripeElementsWrapper from "@/components/StripeElementsWrapper"
import { UserContextProvider } from "@/context/UserContext"
import type { AppProps } from "next/app"

// import { WalletKitProvider } from "@mysten/wallet-kit"
// import { FractalProvider } from "@fractalwagmi/react-sdk"
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"

import { Web3Modal, useWeb3ModalTheme } from "@web3modal/react"

import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

import { polygonMumbai, polygon } from "wagmi/chains"
import { ClientContextProvider } from "@/context/ClientContext"
// import { arbitrum, mainnet, polygon, goerli } from "wagmi/chains";

// import "@fractalwagmi/react-sdk/styles.css"
import "@/styles/globals.css"
import "@/styles/marketplace.css"
import "@/styles/boosterpacks.css"
import "@/styles/paymentmodal.css"
import "@/styles/collection.css"
import "@/styles/hoveredsection.css"
import "@/styles/hoveredButton.css"
import "@/styles/storeHead.css"
import "@/styles/pageTransition.css"
import "@/styles/fonts.css"
import "@/styles/leaderboard.css"
import "@/styles/cardsCollection.css"
import "@/styles/card.css"
import "@/styles/viewtypeselector.css"
import "@/styles/ethernal.css"
import "@/styles/adventurer.css"
import "@/styles/opening.css"
import "../styles/Web3PaymentModal.css"
import "@/styles/founderPacks.css"
import "@/styles/updated.css"
import "@/styles/leftmenu.css"
import "@/styles/currencySwitch.css"
import "@/styles/storePanels.css"
import "@/styles/currencyStoreUpdated.css"
import "@/styles/founderpackOpening.css"
import "@/styles/assetSwitch.css"
import "@/styles/partners.css"
import "@/styles/transfer.css"

import { CurrencyContextProvider } from "@/context/CurrencyContext"
import LayoutWrapper from "@/components/layoutWrapper"
import { useRouter } from "next/router"
import { type } from "os"
import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"

let chains
if (process.env.NEXT_PUBLIC_NETWORK === "matic") {
  chains = [polygon]
} else if (process.env.NEXT_PUBLIC_NETWORK === "mumbai") {
  chains = [polygonMumbai]
} else {
  chains = [polygon, polygonMumbai]
}
// const chains = [goerli]
// const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string
// Wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId: projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  // connectors: [
  //   new WalletConnectConnector({
  //     chains,
  //     options: {
  //       projectId,
  //       showQrModal: false,
  //     },
  //   }),
  // ],
  connectors: w3mConnectors({
    projectId,
    chains,
    version: 1,
  }),
  publicClient,
})

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiConfig, chains)

// const { theme, setTheme } = useWeb3ModalTheme()

// setTheme({
//   themeMode: "dark",
//   themeVariables: {
//     "--w3m-font-family": "Roboto, sans-serif",
//     "--w3m-accent-color": "#F5841F",
//     // ...
//   },
// })

// const modalConfig = {
//   theme: "dark",
//   accentColor: "default",
//   ethereum: {

//   }
// type ComponentWithShopLayout = AppProps &{
//   Component:AppProps['Component'] & {
//     ShopLayout?: React.ComponentType
//   }
// }

// type NextPageWithLayout = NextPage & {
//   shopLayout?: (page: ReactElement) => ReactNode
// }

// type AppPropsWithLayout = AppProps & {
//   Component: NextPageWithLayout
// }

export default function App({ Component, pageProps }: AppProps) {
  // export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const shopLayout = Component.shopLayout ?? ((page) => page)

  const router = useRouter()
  // console.log("router", router.pathname)
  const noLayoutPages = ["/shop", "/", "/leaderboard", "/sui"] //add pages here that you don't want to have the layout around

  return (
    <ClientContextProvider>
      <CurrencyContextProvider>
        <StripeElementsWrapper>
          <UserContextProvider>
            <div>
              <LayoutWrapper withLayout={noLayoutPages.includes(router.pathname) ? false : true}>
                <WagmiConfig config={wagmiConfig}>
                  {/* <FractalProvider clientId={process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID as string}> */}
                  <Component {...pageProps} />
                  {/* {shopLayout(<Component {...pageProps} />)} */}
                  {/* </FractalProvider> */}
                </WagmiConfig>
              </LayoutWrapper>
              <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
            </div>
          </UserContextProvider>
        </StripeElementsWrapper>
      </CurrencyContextProvider>
    </ClientContextProvider>
  )
}
