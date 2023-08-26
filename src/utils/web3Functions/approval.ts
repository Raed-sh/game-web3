import { prepareWriteContract, writeContract, waitForTransaction, readContract } from '@wagmi/core'
import {
    TEST_AEG_CONTRACT_ABI, TEST_AEG_CONTRACT_ADDRESS, COEHELPER_CONTRACT_ADDRESS, BURN_N_MINT_CONTRACT_ABI,
    BURN_N_MINT_CONTRACT_ADDRESS, FOUNDER_PACKS_CONTRACT_ADDRESS, FOUNDER_PACKS_CONTRACT_ABI, TEST_STABLES_CONTRACT_ABI,
    TEST_STABLES_CONTRACT_ADDRESS, USDC_CONTRACT_ABI, USDC_CONTRACT_ADDRESS, USDT_CONTRACT_ABI, USDT_CONTRACT_ADDRESS
} from '../CONSTANTS'


export const approve = async (price: number, currency: string) => {
    //triggers the aeg approval for spending on the helper contracts
    //returns true on success and false on failure
    let currencyToApprove = getCurrencyContracts(currency)
    let decimals = getDecimals(currency)
    if (currencyToApprove && decimals) {
        try {
            console.log("Using contract: " + currencyToApprove?.contractAddress)
            const { request } = await prepareWriteContract({
                address: currencyToApprove?.contractAddress as `0x${string}`,
                abi: currencyToApprove?.abi,
                functionName: 'approve',
                args: [COEHELPER_CONTRACT_ADDRESS, price * decimals],
            })

            const { hash: approveTestAegHash } = await writeContract(request)
            const data = await waitForTransaction({
                hash: approveTestAegHash
            })

            if (data.status === "success") {
                console.log(currency + " approved")
                return true
            } else return false

        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export const getCurrencyContracts = (currency: string) => {
    if (process.env.NEXT_PUBLIC_NETWORK === "matic") {
        switch (currency) {
            case "aeg":
                return
            case "tether":
                return productionContracts.tether
            case "usdc":
                return productionContracts.usdc
        }
    } else if (process.env.NEXT_PUBLIC_NETWORK === "mumbai" || "maticmum") {
        switch (currency) {
            case "aeg":
                return contracts.aeg
            case "tether":
                return contracts.tether
            case "usdc":
                return contracts.usdc
        }
    }
}

const getDecimals = (currency: string) => {
    switch (currency) {
        case "aeg":
            return 1000000000000000000
        case "tether":
            return 1000000
        case "usdc":
            return 1000000
    }
}

const contracts = {
    aeg: {
        contractAddress: TEST_AEG_CONTRACT_ADDRESS,
        abi: TEST_AEG_CONTRACT_ABI
    },
    tether: {
        contractAddress: TEST_STABLES_CONTRACT_ADDRESS,
        abi: TEST_STABLES_CONTRACT_ABI
    },
    usdc: {
        contractAddress: TEST_STABLES_CONTRACT_ADDRESS,
        abi: TEST_STABLES_CONTRACT_ABI
    }
}

const productionContracts = {
    tether: {
        contractAddress: USDT_CONTRACT_ADDRESS,
        abi: USDT_CONTRACT_ABI
    },
    usdc: {
        contractAddress: USDC_CONTRACT_ADDRESS,
        abi: USDC_CONTRACT_ABI
    }
}



export const approveFpSpending = async (userAddress: string) => {
    //checks if FP are approved to be spent in the burnnmint sc, if they're not
    //it triggers the fp approval for spending on the burnnmint contract
    //returns true if FP are approved and false if they're not

    try {
        const areFPApproved = await checkApprovedFP(userAddress)
        console.log("Is FP approved? " + areFPApproved)
        if (!areFPApproved) {
            const { request } = await prepareWriteContract({
                address: FOUNDER_PACKS_CONTRACT_ADDRESS,
                abi: FOUNDER_PACKS_CONTRACT_ABI,
                functionName: 'setApprovalForAll',
                args: [BURN_N_MINT_CONTRACT_ADDRESS, true],
            })

            const { hash: approveFp } = await writeContract(request)
            const data = await waitForTransaction({
                hash: approveFp
            })

            if (data.status === "success") {
                console.log("FPs approved")
                return true
            } else return false
        } else return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const checkFulfilled = async (userAddress: string) => {

    try {
        const data = await readContract({
            address: BURN_N_MINT_CONTRACT_ADDRESS,
            abi: BURN_N_MINT_CONTRACT_ABI,
            functionName: "getFulfilledByAddress",
            args: [userAddress]
        }) as string;
        console.log("Data lenght:" + data.length)
        if (data.length > 0) {
            return true
        } else return false

    } catch (error) {
        console.log(error)
        return false
    }
}


export const checkApprovedAEG = async (userAddress: string, price: number, currency: string) => {
    //takes a string, an user address and price (in AEG) as parameters and checks if the contract has enough allowance to make the purchase.
    //returns true if the approved amount is enough, false if it is not.
    console.log(price)
    let currencyToCheckApproval = getCurrencyContracts(currency)
    let decimals = getDecimals(currency)
    if (currencyToCheckApproval && decimals) {
        try {
            const data = await readContract({
                address: currencyToCheckApproval?.contractAddress as `0x${string}`,
                abi: currencyToCheckApproval?.abi,
                functionName: "allowance",
                args: [userAddress, COEHELPER_CONTRACT_ADDRESS]
            }) as bigint;

            console.log(data)
            if (data >= BigInt(price * decimals)) {
                console.log("Approved is: ", data)
                return true
            } else {
                console.log("Approved is just: ", data)
                return false
            }

        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export const checkApprovedFP = async (userAddress: string) => {
    //receives an user address and returns true if FP spending is approved for the BurnNMint contract, false if it is not.
    try {
        const data = await readContract({
            address: FOUNDER_PACKS_CONTRACT_ADDRESS,
            abi: FOUNDER_PACKS_CONTRACT_ABI,
            functionName: "isApprovedForAll",
            args: [userAddress, BURN_N_MINT_CONTRACT_ADDRESS]
        }) as boolean;

        if (data) {
            return true
        } else return false

    } catch (error) {
        console.log(error)
        return false
    }
}