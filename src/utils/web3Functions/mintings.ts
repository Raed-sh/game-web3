import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import {
    FOUNDER_PACKS_CONTRACT_ADDRESS, FOUNDER_PACKS_CONTRACT_ABI, TEST_AEG_CONTRACT_ADDRESS,
    /*ADVENTURERS_CONTRACT_ABI, ADVENTURERS_CONTRACT_ADDRESS,*/ BURN_N_MINT_CONTRACT_ABI, BURN_N_MINT_CONTRACT_ADDRESS,
    /*ETHERNALS_CONTRACT_ADDRESS, ETHERNALS_CONTRACT_ABI*/
} from '../CONSTANTS'
import { getCurrencyContracts } from './approval'

export const mintFp = async (id: number, amount: number, currency: string) => {
    //this function mints a single fp
    //returns true on success and false on failure
    let currencyToPay = getCurrencyContracts(currency)
    try {
        const { request } = await prepareWriteContract({
            address: FOUNDER_PACKS_CONTRACT_ADDRESS,
            abi: FOUNDER_PACKS_CONTRACT_ABI,
            functionName: 'mintBatch',
            args: [[id], [amount], currencyToPay?.contractAddress]
        })

        const { hash: mintFP } = await writeContract(request)

        const data = await waitForTransaction({
            hash: mintFP
        })

        if (data.status == "success") {
            console.log("FP minted correctly, check your tx: https://mumbai.polygonscan.com/tx/" + data.transactionHash)
            return true
        } else return false

    } catch (error) {
        console.log(error)
        return false
    }

}


/*export const mintSingleAsset = async (typeOfAsset: string, type: number) => {
    //this function mints a single asset (fp , adventurer or ethernal)
    //typeOfAsset argument should be a string == "adventurer" || "ethernal"
    //returns true on success and false on failure

    const asset = getTypeOfAsset(typeOfAsset)

    if (asset) {
        try {
            const { request } = await prepareWriteContract({
                address: asset.contractAddress as `0x${string}`,
                abi: asset.abi,
                functionName: 'mint',
                args: [[type], TEST_AEG_CONTRACT_ADDRESS]
            })

            const { hash: mintSingleHash } = await writeContract(request)

            const data = await waitForTransaction({
                hash: mintSingleHash
            })

            if (data.status == "success") {
                console.log(typeOfAsset + " minted correctly, check your tx: https://mumbai.polygonscan.com/tx/" + data.transactionHash)
                return true
            } else return false

        } catch (error) {
            console.log(error)
            return false
        }
    }

}

export const mintRandomAsset = async (assetType: number, userAddress: string) => {
    //this function mints a random asset of a specific type (adventurer or ethernal)
    //pass 1 for adventurer and 2 for ethernal
    //returns true on success and false on failure

    try {
        const { request } = await prepareWriteContract({
            address: BURN_N_MINT_CONTRACT_ADDRESS,
            abi: BURN_N_MINT_CONTRACT_ABI,
            functionName: 'startMintRandom',
            args: [assetType]
        })

        const { hash: startMintRandomAdvHash } = await writeContract(request)

        const data = await waitForTransaction({
            hash: startMintRandomAdvHash
        })

        if (data.status == "success") {
            let fulfilledStatus = false
            do {
                fulfilledStatus = await checkFulfilled(assetType, userAddress)
                console.log(fulfilledStatus + userAddress)
            } while (!fulfilledStatus);
            const { request: request2 } = await prepareWriteContract({
                address: BURN_N_MINT_CONTRACT_ADDRESS,
                abi: BURN_N_MINT_CONTRACT_ABI,
                functionName: 'finishMintRandom',
                args: [assetType, TEST_AEG_CONTRACT_ADDRESS]
            })

            const { hash: finishMintRandomAdvHash } = await writeContract(request2)

            const data2 = await waitForTransaction({
                hash: finishMintRandomAdvHash
            })

            if (data2.status == "success") {
                console.log("Random asset minted correctly, check your tx: https://mumbai.polygonscan.com/tx/" + data2.transactionHash)
                return true
            } else return false
        } else return false

    } catch (error) {
        console.log(error)
        return false
    }

}


const getTypeOfAsset = (typeOfAsset: string) => {
    switch (typeOfAsset) {
        case "adventurer":
            return contracts.adventurers
        case "ethernal":
            return contracts.ethernals
    }
}

const contracts = {
    adventurers: {
        contractAddress: ADVENTURERS_CONTRACT_ADDRESS,
        abi: ADVENTURERS_CONTRACT_ABI
    },
    ethernals: {
        contractAddress: ETHERNALS_CONTRACT_ADDRESS,
        abi: ETHERNALS_CONTRACT_ABI
    }
}
*/


