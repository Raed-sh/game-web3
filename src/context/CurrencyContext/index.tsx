import { CURRENCY } from "public/images";
import React, { createContext, PropsWithChildren, useContext, useEffect, useReducer, useState } from "react";


export interface CurrencyContextState {
    currency: ICurrency;
    setCurrency: any;
}

interface ICurrency {
    text: string;
    subtext: string;
    image: {
        menu: string;
        menuNA: string;
        icon: string;
        iconNA: string;
    };
    disabled?: boolean
}

export const USD: ICurrency = {
    text: "usd",
    subtext: "dollar",
    image: {
        menu: CURRENCY.usd.currUSDmenu.src,
        menuNA: CURRENCY.usd.currUSDmenuNA.src,
        icon: CURRENCY.usd.currUSD.src,
        iconNA: CURRENCY.usd.currUSDNA.src,
    },
};
export const MATIC: ICurrency = {
    text: "matic",
    subtext: "polygon",
    image: {
        menu: CURRENCY.polygon.currPolygonMenu.src,
        menuNA: CURRENCY.polygon.currPolygonMenuNA.src,
        icon: CURRENCY.polygon.currPolygon.src,
        iconNA: CURRENCY.polygon.currPolygonNA.src,
    },
};

export const AETHER: ICurrency = {
    text: "aether",
    subtext: "coins",
    image: {
        menu: CURRENCY.ac.currACmenu.src,
        menuNA: CURRENCY.ac.currACmenuNA.src,
        icon: CURRENCY.ac.currAC.src,
        iconNA: CURRENCY.ac.currACNA.src,
    },
};

export const TETHER: ICurrency = {
    text: "tether",
    subtext: "polygon",
    image: {
        menu: CURRENCY.tether.currTetherMenu.src,
        menuNA: CURRENCY.tether.currTetherMenuNA.src,
        icon: CURRENCY.tether.currTether.src,
        iconNA: CURRENCY.tether.currTetherNA.src,
    }
}

export const USDC: ICurrency = {
    text: "usdc",
    subtext: "polygon",
    image: {
        menu: CURRENCY.usd.currUSDmenu.src,
        menuNA: CURRENCY.usd.currUSDmenuNA.src,
        icon: CURRENCY.usd.currUSD.src,
        iconNA: CURRENCY.usd.currUSDNA.src,
    },
};

export const AEG: ICurrency = {
    text: "aeg",
    subtext: "Aether Token",
    image: {
        menu: CURRENCY.ac.currACmenu.src,
        menuNA: CURRENCY.ac.currACmenuNA.src,
        icon: CURRENCY.ac.currAC.src,
        iconNA: CURRENCY.ac.currACNA.src,
    },
    disabled: true
}


export const CURRENCIES: ICurrency[] = [
    USD, MATIC, TETHER, USDC//, AETHER
]
export const FP_CURRENCIES: ICurrency[] = [
    TETHER, USDC, AEG
]


export const CurrencyContext = createContext<CurrencyContextState>({
    currency: USD,
    setCurrency: () => undefined,
})

export const CurrencyContextProvider = (props: { children: any }): PropsWithChildren<any> => {
    const [currency, setCurrency] = useState<ICurrency>(USD);

    return <CurrencyContext.Provider value={{
        currency,
        setCurrency,
    }}>{props.children}</CurrencyContext.Provider>
}
