import MarketplaceWrapper from "@/components/MarketplaceWrapper";
import { PageTransition } from "@/components/PageTransition";
import StorePanel, { IStorePanel } from "@/components/StorePanel";
import { STORE } from "public/images";


const CURRENCY_PANEL: IStorePanel = {
    title: "Currency Store",
    image: {
        normal: STORE.currency.normal.src,
        hover: STORE.currency.hover.src,
        pressed: STORE.currency.pressed.src,
    },
    active: true,
    href: '/shop/currency-store'
};

const BOOSTERS_PANEL: IStorePanel = {
    title: "Booster Packs",
    image: {
        normal: STORE.boosters.normal.src,
        hover: STORE.boosters.hover.src,
        pressed: STORE.boosters.pressed.src,
    },
    active: true,
    href: '/booster-packs'
};

const FOUNDER_PANEL: IStorePanel = {
    title: "Premium Packs",
    image: {
        normal: STORE.founderpacks.normal.src,
        hover: STORE.founderpacks.hover.src,
        pressed: STORE.founderpacks.pressed.src,
    },
    active: true,
    href: '/premium-packs'
};

const ADVENTURERS_PANEL: IStorePanel = {
    title: "Adventurers",
    image: {
        normal: STORE.adventurers.normal.src,
        hover: STORE.adventurers.hover.src,
        pressed: STORE.adventurers.pressed.src,
    },
    active: true,
    href: '/adventurers'
};

const COLLECTION_PANEL: IStorePanel = {
    title: "My Collection",
    image: {
        normal: STORE.collection.normal.src,
        hover: STORE.collection.hover.src,
        pressed: STORE.collection.pressed.src,
    },
    active: true,
    href: '/collection'
};

const STORE_PANELS = [
    CURRENCY_PANEL, BOOSTERS_PANEL, FOUNDER_PANEL, ADVENTURERS_PANEL, COLLECTION_PANEL,
]

const Marketplace = () => {
    return (
        <MarketplaceWrapper showPartnersIcon={true}>
            <div className="start-screen">
                <div id='store-panels-layout'>
                    {STORE_PANELS.map((panel: IStorePanel) => {
                        return <StorePanel item={panel} key={panel.title} />
                    })}
                </div>
            </div>


        </MarketplaceWrapper >
    )
};

export default Marketplace;