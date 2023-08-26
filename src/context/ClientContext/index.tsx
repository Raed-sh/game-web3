import React, { createContext, PropsWithChildren, useContext, useEffect, useReducer, useState } from "react";


export interface ClientContextState {
    clientSecret: string;
    setClientSecret: any;
    intentId: string;
    setIntentId: any;
}

export const ClientContext = createContext<ClientContextState>({
    clientSecret: '',
    setClientSecret: () => undefined,
    intentId: '',
    setIntentId: () => undefined,
})

export const ClientContextProvider = (props: {children: any}): PropsWithChildren<any> => {
    const [clientSecret, setClientSecret] = useState<string>('');
    const [intentId, setIntentId] = useState<string>('');

    return <ClientContext.Provider value={{
        clientSecret,
        setClientSecret,
        intentId,
        setIntentId,
    }}>{props.children}</ClientContext.Provider>
}
