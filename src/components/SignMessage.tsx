import React from "react"
import { useAccount, useSignMessage } from "wagmi"

// type Props = {}

const SignMessage = () => {
  const { address, isConnected } = useAccount()
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Sign to connect this wallet to your COE account",
  })

  return (
    <div>
      <button disabled={isLoading} onClick={() => signMessage()}>
        Sign message
      </button>
      {isLoading && <div>Signing message...</div>}
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  )
}

export default SignMessage
