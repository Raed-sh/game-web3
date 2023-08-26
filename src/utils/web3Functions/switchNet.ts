import { switchNetwork } from '@wagmi/core'
import { Chain } from 'viem'

export const switchNet = async () => {

    let networkId
    if (process.env.NEXT_PUBLIC_NETWORK === "matic") {
        networkId = 137
    } else if (process.env.NEXT_PUBLIC_NETWORK === "mumbai" || "maticmum") {
        networkId = 80001
    } else networkId = 137

    const network = await switchNetwork({
        chainId: networkId,
    })

    return network
}
export const switchNetWithCheck = async (chain: Chain) => {

    let networkId
    if (process.env.NEXT_PUBLIC_NETWORK === "matic") {
        networkId = 137
    } else if (process.env.NEXT_PUBLIC_NETWORK === "mumbai" || "maticmum") {
        networkId = 80001
    } else networkId = 137

    if (chain.id !== networkId) {
        const network = await switchNetwork({
            chainId: networkId,
        })
        return network
    }
    return chain

}