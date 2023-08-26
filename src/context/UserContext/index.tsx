import { useRouter } from "next/router"
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"
import { getUserCurrentData, hasMintedSuiEmote, verifyToken } from "@/utils/fetchesToAPI"

export interface UserContextState {
  isLoggedIn: boolean
  fullUserData: any
  userAddress: any
  hasCrafted: boolean
  checkIfHasCrafted: any
  setFullUserData: any
  clearUser: any
  fetchUserDetails: any
  setUserAddress: any
}

export const UserContext = createContext<UserContextState>({
  isLoggedIn: false,
  fullUserData: null,
  userAddress: null,
  hasCrafted: false,
  setFullUserData: () => undefined,
  checkIfHasCrafted: () => undefined,
  clearUser: () => undefined,
  fetchUserDetails: () => undefined,
  setUserAddress: () => undefined,
})

export const UserContextProvider = (props: { children: any }): PropsWithChildren<any> => {
  const router = useRouter()
  const { token, access_token } = router.query

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [fullUserData, setFullUserData] = useState<any>(null) // TODO: proper user type
  const [userAddress, setUserAddress] = useState<any>(null)
  const [hasCrafted, setHasCrafted] = useState(false)

  useEffect(() => {
    if (token) {
      let tokenData: { id: string; iat: number }
      verifyToken(token as string).then((data) => {
        console.log("token in wrapper", data)
        tokenData = data
        getUserCurrentData(data.id as string)
          .then((data) => {
            console.log(
              "getUserCurrentData in wrapper",
              data.message === "user not found" ? { id: tokenData.id } : data
            )

            if (data.status) {
              setIsLoggedIn(false)
              setFullUserData({ id: tokenData.id })
            } else {
              setFullUserData(data)
              setIsLoggedIn(true)
            }
          })
          .catch((e) => {
            setIsLoggedIn(false)
            setFullUserData(null)
          })
      })
    } else {
      // FIXME: need to figure out a logout function
      // console.log('logout here')
      // setIsLoggedIn(false)
      // setFullUserData(null)
    }
  }, [token])

  useEffect(() => {
    let storedUser = localStorage.getItem("userDetails")
    if (!storedUser) {
      console.log("no user data in local storage upon discord redirect")
      return
    }
    let currentUser = JSON.parse(storedUser)
    getUserCurrentData(currentUser.id as string)
      .then((data) => {
        if (data.status) {
          setIsLoggedIn(false)
          setFullUserData({ id: currentUser.id })
        } else {
          setFullUserData(data)
          setIsLoggedIn(true)
        }
      })
      .catch((e) => {
        setIsLoggedIn(false)
        setFullUserData(null)
      })
  }, [access_token])

  const fetchUserDetails = useCallback(() => {
    if (!fullUserData) return
    getUserCurrentData(fullUserData?.id as string).then((data) => {
      if (data.status) {
        setIsLoggedIn(false)
        setFullUserData(null)
      } else {
        setFullUserData(data)
        setIsLoggedIn(true)
      }
    })
  }, [fullUserData])

  const checkIfHasCrafted = () => {
    hasMintedSuiEmote(fullUserData.id).then((data) => {
      setHasCrafted(data.message)
    })
  }

  useEffect(() => {
    if (fullUserData && fullUserData.id) {
      checkIfHasCrafted()
    }
  }, [fullUserData])
  // access_token
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("userDetails")
  //   if (storedUser && !fullUserData) {
  //     console.log("setting fulluserdata from", storedUser)
  //     setFullUserData(JSON.parse(storedUser))
  //     fetchUserDetails()
  //   }
  // }, [fetchUserDetails, fullUserData])

  useEffect(() => {
    if (fullUserData !== null) {
      setIsLoggedIn(true)
    }
  }, [fullUserData])

  useEffect(() => {
    // console.log("fud in listener", fullUserData)
    if (fullUserData !== null) {
      // console.log("clearing and setting full user data")
      localStorage.removeItem("userDetails")
      localStorage.setItem("userDetails", JSON.stringify(fullUserData))
    }
  }, [fullUserData])

  const clearUser = () => {
    localStorage.removeItem("userDetails")
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        clearUser,
        fullUserData,
        hasCrafted,
        checkIfHasCrafted,
        setFullUserData,
        fetchUserDetails,
        userAddress,
        setUserAddress,
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
