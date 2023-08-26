import React, { useContext, useEffect, useState } from "react"
import { MARKET_IMGS, LEADERBOARD } from "public/images"
import { allUsersMetrics, top100UsersMetrics } from "@/utils/fetchesToAPI"
import Image from "next/image"
import cg from "public/images/icons/crown-golden.svg"
import cs from "public/images/icons/crown-silver.svg"
import cb from "public/images/icons/crown-bronze.svg"

import { useRouter } from "next/router"

const RANKS = {
  // it's here just in case there are some broken ranks
  unknown: {
    image: LEADERBOARD.ranks.rankUnranked,
    class: "rank-silver", // idk if that's the right thing to pick here
  },
  unranked: {
    image: LEADERBOARD.ranks.rankUnranked,
    class: "rank-unranked",
  },
  bronze: {
    image: LEADERBOARD.ranks.rankBronze,
    class: "rank-bronze",
  },
  silver: {
    image: LEADERBOARD.ranks.rankSilver,
    class: "rank-silver",
  },
  gold: {
    image: LEADERBOARD.ranks.rankGold,
    class: "rank-gold",
  },
  platinum: {
    image: LEADERBOARD.ranks.rankPlat,
    class: "rank-plat",
  },
  diamond: {
    image: LEADERBOARD.ranks.rankDiamond,
    class: "rank-diamond",
  },
  immortal: {
    image: LEADERBOARD.ranks.rankImmortal,
    class: "rank-immortal",
  },
}

const RankDisplay = (props: { rankText: string; place: number; MMR: number }) => {
  // console.log("ranktext", props.rankText)
  const { rankText, place, MMR } = props
  let rank
  if (place === 1 && MMR >= 3200) {
    rank = RANKS.immortal
  } else if (rankText.startsWith("Bronze")) {
    rank = RANKS.bronze
  } else if (rankText.startsWith("Silver")) {
    rank = RANKS.silver
  } else if (rankText.startsWith("Gold")) {
    rank = RANKS.gold
  } else if (rankText.startsWith("Diamond")) {
    rank = RANKS.diamond
  } else if (rankText.startsWith("Platinum")) {
    rank = RANKS.platinum
  } else if (rankText.startsWith("Unranked")) {
    rank = RANKS.unranked
  } else {
    rank = RANKS.unknown
  }
  return (
    <div className={`leaderboard-rank ${rank.class}`}>
      {rank.image && <Image src={rank.image} alt={`${rankText} image`} />}
      <p>{rankText}</p>
      {/* <p>{place == 1 ? "Immortal" : rankText}</p> */}
    </div>
  )
}

//returns a roman numeral for the sub rank depending on MMR
// const numericalRanking = (MMR: number) => {
//   for (const [key, value] of Object.entries(LEADERBOARD_BRACKETS)) {
//     if (MMR >= value[0] && MMR <= value[1]) {
//       return key
//     }
//   }
// }

interface LeaderboardEntry {
  userName: string
  rank: string
  MMR: number
  wins: number
  losses: number
  totalGames: number
  winRatio: number
  topPet: string
  topAdventurer: string
  place: number
}

export const Leaderboard = () => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<string | undefined>(router.query.username as string | undefined)
  const [userData, setUserData] = useState<LeaderboardEntry | null>(null)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[] | null>([])

  useEffect(() => {
    leaderboardData &&
      leaderboardData.length < 1 &&
      allUsersMetrics().then((data) => {
        //sort by place
        data.sort((a: any, b: any) => {
          return a.place - b.place
        })
        if (router.query.username) {
          const username = router.query.username as string
          const user = data.find((entry: any) => entry.userName.toLowerCase() === username.toLowerCase())
          if (user) {
            console.log("user FOUND", user)
            setUserData(user)
            setCurrentUser(user.userName)
            const leaderboardDataCopy = [...data]
            if (user.place === 1) {
              leaderboardDataCopy.splice(0, 1)
              setLeaderboardData([user, ...leaderboardDataCopy])
            } else {
              leaderboardDataCopy.splice(leaderboardDataCopy.indexOf(user), 1)
              const leader = leaderboardDataCopy.shift()
              leaderboardDataCopy.unshift(user)
              leader && leaderboardDataCopy.unshift(leader)
              setLeaderboardData(leaderboardDataCopy)
            }
          } else {
            console.log("user NOT FOUND")
            setLeaderboardData(data)
          }
        } else {
          setLeaderboardData(data)
        }
      })
  }, [])

  return (
    <div className="leaderboard-wrapper">
      <div className="leaderboard-container">
        <div className="leader-head-mob">
          <Image
            src={"/images/icons/d_arr.svg"}
            alt=""
            width={25}
            height={25}
            style={{
              transform: "rotateZ(90deg)",
            }}
          />
          <Image src={"/images/miscs/Coe-logo.png"} alt="" width={108} height={21} />
        </div>
        <h1>Leaderboard</h1>

        <Image src={MARKET_IMGS.golden_line} alt="" className="golden-line" />
        {userData && (
          <div className="flex justify-around bg-black bg-opacity-40 p-4 m-2 rounded-sm text-[#dcdee1] font-bold border border-[#676767] text-glow-amber text-lg">
            <p>
              <span className="rank-gold">{userData.userName}</span>
            </p>
            <p>
              <span className="rank-gold">{userData.wins}</span> :{" "}
              <span className="text-[#d65a5a] text-glow-red">{userData.losses}</span>
            </p>
            <p>
              {/* Win Ratio:{" "} */}
              <span className={`${userData.winRatio >= 50 ? "rank-gold" : "text-[#d65a5a] text-glow-red"}`}>
                {userData.winRatio.toFixed(2)}% Win Rate
              </span>
            </p>
            <p>Total Played: {userData.totalGames}</p>
          </div>
        )}
        {/* <Image src={"/images/miscs/leader-tab.png"} alt="" width={208} height={50} /> */}
      </div>

      <div className="leaderboard-table-container">
        <table id="leaderboard-table">
          <thead id="leaderboard-table-head">
            <tr>
              <th className="leaderboard-index">№</th>
              <th>Name</th>
              <th>Rank</th>
              <th>MMR</th>
              <th>Top Adventurer & Pet</th>
              <th></th>
              <th>Win Ratio</th>
            </tr>
          </thead>
          <tbody id="leaderboard-table-body">
            {leaderboardData &&
              leaderboardData.map((entry, index) => {
                const isCurrentUser = currentUser?.toLowerCase() == entry.userName.toLowerCase()
                //skip adding the entry to top3 if it is the current user

                const isTop3 = entry.place == 1 || entry.place == 2 || entry.place == 3
                return (
                  <>
                    <tr
                      key={entry.userName}
                      className={`leaderboard-row bg-black bg-opacity-40 border border-[#676767]  ${isCurrentUser && " bg-opacity-90 border-t-4 border-b-4"
                        }`}
                    >
                      <td
                        className={`${isCurrentUser ? "text-white" : "text-[#b1b1b1]"} flex items-center pl-3`}
                        style={{
                          color: entry.place === 1 ? "#fee190" : entry.place === 3 ? "#a88576" : "#b1b1b1",
                          textShadow:
                            entry.place === 1
                              ? "0px 1px 10px #ff7f09"
                              : entry.place === 3
                                ? "0px 0px 10px #af6251"
                                : "0px 0px 10px #979797",
                        }}
                      >
                        {entry.place}
                        {isTop3 && (
                          <Image
                            src={`images/icons/crowns/${entry.place}.png`}
                            alt="trophy"
                            className="leaderboard-trophy"
                            width={30}
                            height={30}
                          />
                        )}
                      </td>
                      <td>{entry.userName}</td>
                      <td className="">
                        {/* {isCurrentUser && <p className=" text-sm">You</p>} */}
                        <RankDisplay rankText={entry.rank} place={entry.place} MMR={entry.MMR} />
                      </td>
                      <td className="leaderboard-mmr">{entry.MMR} MMR</td>
                      <td className="leaderboard-adventurer-pet">
                        <div>
                          <div className="adventurer-mastery">{entry.topAdventurer}</div>
                          {/* <p> | </p> */}
                          <div className="adventurer-ethernal">{entry.topPet}</div>
                        </div>
                      </td>
                      <td></td>
                      <td className="leaderboard-wr-container">
                        <div className="leaderboard-wr-bg">
                          {/* TODO: .0 numbers look kinda ugly */}
                          <div className="leaderboard-wr" style={{ width: `${entry.winRatio}%` }}></div>
                        </div>
                        <p>{entry.winRatio.toFixed(1)}%</p>
                      </td>
                    </tr>
                    <tr className="leaderboard-spacer">
                      <td></td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </table>
      </div>
      <div id="aftertable"></div>

      {/* MOBILE */}
      <ul className="board-list-mob">
        {leaderboardData &&
          leaderboardData.map((entry) => {
            return (
              <li key={entry.userName} className="" onClick={() => console.log(entry.rank.split(" ")[0].toLowerCase())}>
                <span
                  className="board-idx"
                  style={{
                    color: entry.place === 1 ? "#fee190" : entry.place === 3 ? "#a88576" : "",
                    textShadow:
                      entry.place === 1 ? "0px 1px 10px #ff7f09" : entry.place === 3 ? "0px 0px 10px #af6251" : "",
                  }}
                >
                  {entry.place}
                  {entry.place === 1 && <Image src={cg} alt="" />}
                  {entry.place === 2 && <Image src={cs} alt="" />}
                  {entry.place === 3 && <Image src={cb} alt="" />}
                  {/* {entry.rank.split(' ')[0].toLowerCase()} */}
                </span>
                <div className={`member ${entry.rank.split(" ")[0].toLowerCase()}`}>
                  <section>
                    <h3>{entry.userName}</h3>
                    <span>
                      <Image src={""} alt="" />
                      {entry.rank}
                    </span>
                  </section>
                  <div className="wr-mob">
                    <div className="leaderboard-wr-bg">
                      <div className="leaderboard-wr" style={{ width: `${entry.winRatio}%` }}></div>
                    </div>
                    <h2>
                      Win ratio: <span>{entry.winRatio.toFixed(1)}%</span>
                    </h2>
                  </div>

                  <section>
                    <section>
                      <p className="adventurer-mastery">Mastery</p> <p className="adventurer-ethernal"> | Ethernal</p>
                    </section>
                    <h4>{entry.MMR} MMR</h4>
                  </section>
                </div>
              </li>
            )
          })}
        <li></li>
      </ul>
    </div>
  )
}

export default Leaderboard
