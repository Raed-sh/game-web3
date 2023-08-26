// import { TransactionBlock } from "@mysten/sui.js"
import { JsonRpcProvider, testnetConnection, mainnetConnection, TransactionBlock } from "@mysten/sui.js"
const connection = process.env.NEXT_PUBLIC_SUI_NETWORK === "testnet" ? testnetConnection : mainnetConnection

console.log("connection", connection)

const GAS_BUDGET = 3000000

interface ShinamiResponse {
  jsonrpc: string
  result: string
  id: number
}

export async function createShinamiSession(secret: string) {
  const url = "https://api.shinami.com/key/v1"
  const headers = {
    "X-API-Key": process.env.SHINAMI_API_KEY as string,
    "Content-Type": "application/json",
  }
  const body = JSON.stringify({
    jsonrpc: "2.0",
    method: "shinami_key_createSession",
    params: [secret],
    id: 1,
  })

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    })
    const data: ShinamiResponse = await response.json()
    // console.log("shinami session token: ", data.result)
    return data.result
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

export async function getOwnedObjects(address: string) {
  console.log("address", address)

  try {
    const provider = new JsonRpcProvider(connection)
    const objects = await provider.getOwnedObjects({
      owner: address,
      options: { showType: true, showDisplay: true },
    })

    // console.log("objects", objects.data)
    return objects.data
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

export async function getObjectById(id: string) {
  try {
    const provider = new JsonRpcProvider(connection)
    const object = await provider.getObject({
      id: id,
      options: { showType: true, showDisplay: true },
    })
    // console.log("object", object)
    return object
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

export async function createTransferTransactionBlock(to: string, objectId: string) {
  try {
    const tx = new TransactionBlock()
    tx.transferObjects([tx.object(objectId)], tx.pure(to))
    // tx.setGasBudget(GAS_BUDGET)
    return tx
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}

export async function buildAndConvertB64(tx: TransactionBlock) {
  try {
    const provider = new JsonRpcProvider(connection)

    const builtTx = await tx.build({
      provider: provider,
      onlyTransactionKind: true,
    })

    const payloadBytesFullBase64 = btoa(builtTx.reduce((data, byte) => data + String.fromCharCode(byte), ""))
    console.log("payloadBytesFullBase64:", payloadBytesFullBase64)

    return payloadBytesFullBase64
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
