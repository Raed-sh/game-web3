import { Context, createContext, PropsWithChildren, useState } from "react";

export enum AssetTypes {
    plain, tradeable
}

export interface IAssetsContext {
    assetType: AssetTypes
    setAssetType: any
}

export const AssetContext: Context<IAssetsContext> = createContext<IAssetsContext>({
    assetType: AssetTypes.plain,
    setAssetType: () => undefined,
})


export const AssetProvider = (props: {children: any}): PropsWithChildren<any> => {
    const [assetType, setAssetType] = useState<AssetTypes>(AssetTypes.plain);
    
    return <AssetContext.Provider value={{
        assetType,
        setAssetType,
    }}>
        {props.children}
    </AssetContext.Provider>
}
