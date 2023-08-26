import { prepareWriteContract, writeContract, waitForTransaction } from '@wagmi/core'
import { BURN_N_MINT_CONTRACT_ABI, BURN_N_MINT_CONTRACT_ADDRESS } from '../CONSTANTS'
import { checkFulfilled } from './approval'

interface IResult {
    success: boolean
    tx: string
    message: string
}

export const openFP = async (userAddress: string, callback: (result: number) => void): Promise<IResult> => {
    //returns true on success and false on failure
    //const finishOpenFPTxData = await finishOpenFP()
    try {
        const fulfilledStatus = await checkFulfilled(userAddress)
        if (fulfilledStatus) {
            callback(4)
            const finishOpenFPTxData = await finishOpenFP()

            if (finishOpenFPTxData.status == "success") {
                console.log("Fp opened, check your tx: https://mumbai.polygonscan.com/tx/" + finishOpenFPTxData.transactionHash)
                callback(0)
                return {
                    success: true,
                    tx: finishOpenFPTxData.transactionHash,
                    message: ""
                }
            } else {
                callback(5)
                console.log('fulfilled status failed')
                return {
                    success: false,
                    tx: "",
                    message: "Transaction failed"
                }
            }
        } else {
            const { request } = await prepareWriteContract({
                address: BURN_N_MINT_CONTRACT_ADDRESS,
                abi: BURN_N_MINT_CONTRACT_ABI,
                functionName: 'startOpenFP',
            })

            const { hash: startOpenFPHash } = await writeContract(request)

            const data = await waitForTransaction({
                hash: startOpenFPHash
            })

            if (data.status == "success") {
                callback(3)
                let fulfilledStatus = false
                do {
                    fulfilledStatus = await checkFulfilled(userAddress)
                    console.log(fulfilledStatus + userAddress)
                } while (!fulfilledStatus);

                if (fulfilledStatus) callback(4)

                const finishOpenFPTxData = await finishOpenFP()

                if (finishOpenFPTxData.status == "success") {
                    callback(0)
                    console.log("Fp opened, check your tx: https://mumbai.polygonscan.com/tx/" + finishOpenFPTxData.transactionHash)
                    return {
                        success: true,
                        tx: finishOpenFPTxData.transactionHash,
                        message: ""
                    }
                } else {
                    callback(5)
                    console.log('transaction 2 failed')
                    return {
                        success: false,
                        tx: "",
                        message: "Transaction failed"
                    }
                }
            } else {
                callback(5)
                console.log('startopenfp tx failed')
                return {
                    success: false,
                    tx: "",
                    message: "Transaction failed"
                }
            }

        }
    } catch (error) {
        callback(5)
        console.log('error while running openfp', error)
        let message = `Transaction failed`
        if ((error as string).toString().match("No pack")) {
            message = "No founder packs to open on this address"
        }
        if ((error as string).toString().match("User rejected the request.")) {
            message = "User rejected the request."
        }
        if ((error as string).toString().match("Already has unfulfilled or unused request.")) {
            // message = "Already has unfulfilled or unused request."
            const finishOpenFPTxData = await finishOpenFP()

            if (finishOpenFPTxData.status == "success") {
                console.log("Fp opened, check your tx: https://mumbai.polygonscan.com/tx/" + finishOpenFPTxData.transactionHash)
                return {
                    success: true,
                    tx: finishOpenFPTxData.transactionHash,
                    message: ""
                }
            } else {
                console.log('transaction 2 failed')
                return {
                    success: false,
                    tx: "",
                    message: "Transaction failed"
                }
            }
        }
        return {
            success: false,
            tx: "",
            message: message
        }
    }

}

const finishOpenFP = async () => {
    const { request } = await prepareWriteContract({
        address: BURN_N_MINT_CONTRACT_ADDRESS,
        abi: BURN_N_MINT_CONTRACT_ABI,
        functionName: 'finishOpenFP',
    })

    const { hash: finishOpenFPHash } = await writeContract(request)

    const data = await waitForTransaction({
        hash: finishOpenFPHash
    })

    return data
}