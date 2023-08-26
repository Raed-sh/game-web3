import React, { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import { UserContext } from "@/context/UserContext"

const DiscordConnectButton = ({ url }: { url: any }) => {
  const { fullUserData, setFullUserData, setUserAddress, fetchUserDetails } = useContext(UserContext)

  const router = useRouter()
  const [discordUsername, setDiscordUsername] = useState(fullUserData?.discordUsername)

  useEffect(() => {
    // console.log("URL: ", url)
    if (fullUserData?.discordId) setDiscordUsername(fullUserData.discordUsername)
    if (!router.isReady || !fullUserData) return
    const fragment = router.asPath.split("#")[1]
    const params = new URLSearchParams(fragment)
    const [accessToken, tokenType] = [params.get("access_token"), params.get("token_type")]
    const userId = fullUserData.id
    if (accessToken && tokenType && userId && !discordUsername && !fullUserData.discordId) {
      fetch(`https://discord.com/api/users/@me`, {
        headers: {
          Authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("DISCORD USER DATA: ", data)
          // console.log("USERID: ", data.username + "#" + data.discriminator)
          // console.log("FUD ID: ", userId)
          // const did = data.discrimator > 0 ? data.username + "#" + data.discriminator : data.username
          fetch("/api/discord/updateId", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              discordId: data.id,
              discordUsername: data.username,
              id: userId,
              url: url,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              // console.log("DISCORD UPDATE DB RESULT: ", data)
              console.log("data.username: ", data.username)
              setDiscordUsername(data.username)
              fetchUserDetails()
            })
        })
    }
  }, [router.isReady, fullUserData])

  return (
    <div>
      <a
        href={discordUsername ? "#" : url}
        data-te-ripple-init
        data-te-ripple-color="light"
        className={` ${
          discordUsername ? "bg-[#7289da] bg-opacity-25" : "bg-[#7289da]"
        } flex rounded px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg gap-2`}
        // style="background-color: #7289da"
      >
        <svg
          className="h-4 w-4"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 24 24"
        >
          <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
        </svg>
        {discordUsername ? discordUsername : "Connect"}
      </a>
    </div>
  )
}

export default DiscordConnectButton

//redirect URL example
// https://nicememe.website/?code=NhhvTDYsFcdgNLnnLijcl7Ku7bEEeee&state=15773059ghq9183habn
