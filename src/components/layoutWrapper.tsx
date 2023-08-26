import React, { ReactElement, ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import StoreHead from "./StoreHead"
import { StaticImageData } from "next/image"
import { PageTransition } from "./PageTransition"
import { useRouter } from "next/router"
import { NAVMENU } from "public/images"
import CurrencySwitch from "./CurrencySwitch"
import Router from "next/router"
import Link from "next/link"
import { AssetContext, AssetProvider } from "@/context/AssetsContext"
import AssetTypeSwitch from "./AssetTypeSwitch"

interface ITab {
  title: string
  image: {
    active: string
    inactive: string
  }
  pattern: string
  icon?: string | StaticImageData
}

const TAB_COLLECTION = {
  title: "my collection",
  image: {
    active: NAVMENU.buttons.collection.active.src,
    inactive: NAVMENU.buttons.collection.inactive.src,
  },
  pattern: "/collection",
  icon: "",
}

const TAB_STORE = {
  title: "currency store",
  image: {
    active: NAVMENU.buttons.store.active.src,
    inactive: NAVMENU.buttons.store.inactive.src,
  },
  pattern: "/shop/currency-store",
  icon: "images/icons/Aether.webp",
}

const TAB_BOOSTER = {
  title: "booster packs",
  image: {
    active: NAVMENU.buttons.boosterpacks.active.src,
    inactive: NAVMENU.buttons.boosterpacks.inactive.src,
  },
  pattern: "/booster-packs",
  icon: "images/icons/Boosters.webp",
}

const TAB_FP = {
  title: "premium packs",
  image: {
    active: NAVMENU.buttons.founderpacks.active.src,
    inactive: NAVMENU.buttons.founderpacks.inactive.src,
  },
  pattern: "/premium-packs",
  icon: "images/layout/fb/fb-icon.png",
}

const TAB_ADVENTURERS = {
  title: "adventurers",
  image: {
    active: NAVMENU.buttons.adventurers.active.src,
    inactive: NAVMENU.buttons.adventurers.inactive.src,
  },
  pattern: "/adventurers",
  icon: "/images/icons/Aether.webp",
}

const TABS: ITab[] = [TAB_COLLECTION, TAB_STORE, TAB_BOOSTER, TAB_FP, TAB_ADVENTURERS]

const LayoutWrapper = (props: { children: ReactNode; withLayout: boolean }) => {
  const router = useRouter()

  const [displayCurrency, setDisplayCurrency] = useState(false)
  const [useAssetSwitch, setUseAssetSwitch] = useState(false);
  const [loading, setLoading] = useState(false);

  const [assetType, setAssetType] = useState("plain")

  useEffect(() => {
    setDisplayCurrency(["/shop/currency-store"].includes(router.pathname))

    setUseAssetSwitch(
      ["/booster-packs", "/premium-packs", "/adventurers"].includes(router.pathname)
    )
  }, [router.pathname])

  useEffect(() => {
    // Used for page transition
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  // console.log(router.pathname.startsWith(TABS[0].pattern))

  if (!props.withLayout)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        className="h-full flex justify-center items-center"
      >
        {props.children}
      </motion.div>
    )
  return (
    <div>
      <AssetProvider>
        <StoreHead />

        {displayCurrency && <CurrencySwitch type="" />}

        {useAssetSwitch && <AssetTypeSwitch />}

        <div
          style={{
            display: "flex",
          }}
        >
          <div className="left-menu" id="left-menu">
            <ul>
              {TABS.map((tab) => {
                const isActive = router.pathname.startsWith(tab.pattern)
                return (
                  <Link
                    className={
                      isActive
                        ? router.pathname === tab.pattern
                          ? "left-menu-tab left-menu-tab-active pointer-events-none"
                          : "left-menu-tab left-menu-tab-active left-menu-tab-redirectable"
                        : "left-menu-tab"
                    }
                    key={`tab-to-${tab.pattern}`}
                    id={`left-tab-${tab.pattern.replace("/", "")}`}
                    href={tab.pattern}
                    // onClick={() => {
                    //   if (router.pathname !== tab.pattern) router.push(tab.pattern)
                    // }}
                    style={{
                      backgroundImage: `url(${isActive ? tab.image.active : tab.image.inactive})`,
                    }}
                  >
                    <p>{tab.title}</p>
                  </Link>
                )
              })}
            </ul>
          </div>
          <div
            style={{
              width: "90%",
              position: "relative",
            }}
          >
            {loading && <PageTransition />}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="h-full flex justify-center items-center"
            >
              {props.children}
            </motion.div>
          </div>
        </div>
      </AssetProvider>
    </div>
  )
}

export default LayoutWrapper
