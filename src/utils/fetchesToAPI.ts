import { TransactionBlock } from "@mysten/sui.js"

export const getNFTs = async (account: string) => {
  const result = await fetch("/api/getAssets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ account }),
  }).then((res) => res.json())
  // console.log("NFTs", result)
  return result
}

type Payload = {
  id: any
  account: string
  signature: string
  // NFTs: any
}

export const registerWallet = async (payload: Payload) => {
  console.log("data to be sent back to backend server to be sent through socket", payload)
  //send to backend for processing
  const result = await fetch("/api/registerWallet", {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json())

  console.log("sendtobackend result", result)
  return result
  // if (result.status === 500) {
  //   setError(result.message);
  // }
}

export const verifyToken = async (token: string) => {
  const result = await fetch("/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }).then((res) => res.json())
  return result
}

export const getUserCurrentData = async (id: string) => {
  const result = await fetch("/api/getUserCurrentData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json())
  return result
}

//gets top 100 users metrics for in-game leaderboard
export const top100UsersMetrics = async () => {
  const result = await fetch("/api/top100UsersMetrics", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
  return result
}

export const allUsersMetrics = async () => {
  const result = await fetch("/api/allUsersMetrics", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
  return result
}

//gets a single users metrics by their IGN (which we don't have in users collection, only their id)
export const userMetrics = async (username: string) => {
  const result = await fetch("/api/userMetrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  }).then((res) => res.json())
  return result
}

//opens a web2 pack
export const openWeb2Pack = async (id: string, packData: any) => {
  const result = await fetch("/api/openWeb2Pack", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, packData }),
  }).then((res) => res.json())
  return result
}

export const updateWeb2AssetsAfterFPOpening = async (id: string, txHash: string) => {
  const result = await fetch("/api/awaitFpOpeningThenUpdateWeb2Assets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, txHash }),
  }).then((res) => res.json())
  return result
}

//listens for on chain transfer completion that gives user tokens
export const awaitTxThenUpdateTokens = (id: string, txHash: string, tokens: number) => {
  fetch("/api/awaitTxThenUpdateTokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, txHash, tokens }),
  })
}

//gets assets by type like "adventurers" or "ethernals"
export const getAssetsByType = async (type: string) => {
  const result = await fetch("/api/getAssetsByType", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  }).then((res) => res.json())
  return result
}

export const getUserWeb3Assets = async (id: string) => {
  const result = await fetch("/api/getUserWeb3Assets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json())
  return result
}

// ----------------- SHINAMI -----------------

//fetch to shinami api node service //test digest: FKpVjX7N3RXYtQNWS2jyRRx5bDincScKbyZGuzNiReyq
export const getTransactionBlock = async (digest: string) => {
  try {
    const data = await fetch("https://node.shinami.com/api/v1/sui_testnet_07b5f888133d885ec0a729174bfbb211", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "sui_getTransactionBlock",
        params: [
          digest,
          {
            showInput: true,
            showRawInput: true,
            showEffects: true,
            showEvents: false,
            showObjectChanges: true,
            showBalanceChanges: false,
          },
        ],
        id: 1,
      }),
    }).then((response) => response.json())

    return data
  } catch (error) {
    console.log(error)
  }
}

//gets data of a sui object with shinami api node service
export const getObject = async (objectId: string) => {
  const url = `https://node.shinami.com/api/v1/${process.env.NEXT_PUBLIC_SHINAMI_API_KEY}}`

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "sui_getObject",
      params: [
        objectId,
        {
          showType: true,
          showOwner: true,
          showPreviousTransaction: true,
          showDisplay: false,
          showContent: true,
          showBcs: false,
          showStorageRebate: true,
        },
      ],
      id: 1,
    }),
  }

  try {
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}

export const createShinamiWallet = async (walletId: string) => {
  try {
    const result = await fetch("/api/shinami/createWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletId }),
    }).then((response) => response.json())
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getShinamiWallet = async (walletId: string) => {
  try {
    let result = await fetch("/api/shinami/getWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletId }),
    }).then((response) => response.json())

    if (result.code) {
      result = await createShinamiWallet(walletId)
    }

    console.log("result", result)
    return result
  } catch (error) {
    console.log(error)
    return error
  }
}

//NOT AVAILABLE YET
export const executeGaslessTransaction = async (
  walletId: string,
  txBytes: string
  // gasBudget: number
  // requestType: string
) => {
  try {
    const result = await fetch("/api/shinami/executeGaslessTx", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletId, txBytes }),
    }).then((res) => res.json())
    return result
  } catch (error) {
    console.log(error)
  }
}

// ----------------- HALLIDAY -----------------

export const getOrCreateHallidayWallet = async (userId: string) => {
  try {
    const result = await fetch("/api/halliday/getOrCreateHallidayWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    }).then((res) => res.json())
    return result
  } catch (error) {
    console.log(error)
  }
}

export const createHallidayWallet = async (userId: string) => {
  try {
    const result = await fetch("/api/halliday/createWallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    }).then((res) => res.json())
    return result
  } catch (error) {
    console.log(error)
  }
}

// ----------------- SUI -----------------

export const mintEmote = async (id: string, address: string) => {
  try {
    const result = await fetch("/api/sui/mintEmote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, address }),
    }).then((res) => res.json())
    return result
  } catch (error) {
    console.log(error)
  }
}

export const hasMintedSuiEmote = async (id: string) => {
  try {
    const result = await fetch("/api/sui/hasMintedSuiEmote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }).then((res) => res.json())
    return result
  } catch (error) {
    console.log(error)
  }
}
