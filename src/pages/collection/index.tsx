import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import { BOOSTERS, IBoosterCard } from "@/utils/CONSTANTS"
import { UserContext } from "@/context/UserContext"
import CollectionWrapper, { CollectionDisplay } from "@/components/CollectionWrapper"
import Card, { CardDetails } from "@/components/Card"
import { cardsFilters, cardsFilterTitles, ViewType, elementFilters, elementFilterTitles } from "@/utils/FILTERS"
import CollectionFilters from "@/components/CollectionFilters"
import CollectionElementFilters from "@/components/CollectionElementFilters"
import { getUserWeb3Assets } from "@/utils/fetchesToAPI"
import ViewTypeSelector from "@/components/ViewTypeSelector"
import Ethernal, { IEthernal } from "@/components/Ethernal"
import Adventurer, { IAdventurersInformation } from "@/components/Adventurer"
import Packs from "@/components/CollectionPacks/Packs"
import { IFounderPack, INFTFounderPack } from "@/components/CollectionPacks/CollectionFounderPack"
import CardBack, { ICardBack } from "@/components/Collection/CardBack"
import NftEmote, { INftEmote } from "@/components/Collection/NftEmote"
import TransferPopup, { AssetTypes } from "@/components/Collection/TransferPopup"
import { COLLECTED_CATEGORIES, COLLECTED_CATEGORIES_TITLES, orderCards } from "@/utils/collection"
import Web2Emote, { IEmote } from "@/components/Collection/Web2Emote"

const Collection = () => {
  const { isLoggedIn, fullUserData, userAddress } = useContext(UserContext)
  const router = useRouter()
  const [collection, setCollection] = useState<IBoosterCard[]>([])
  // TODO: check if router has a get param ("display"? or something alike) and if it does, switch display
  const [display, setDisplay] = useState(CollectionDisplay.packs)
  const [viewType, setViewType] = useState(ViewType.ALL)
  const [loading, setLoading] = useState(true)
  const [showTransfer, setShowTransfer] = useState(false)
  const [chosenAsset, setChosenAsset] = useState<INftEmote | null>(null)
  const [chosenAssetType, setChosenAssetType] = useState(AssetTypes.emote)

  useEffect(() => {
    if (router.query.target) {
      switch (router.query.target) {
        case "items":
          setDisplay(CollectionDisplay.collected)
          break
        case "packs":
          setDisplay(CollectionDisplay.packs)
          break
        default:
          break
      }
    }
  }, [])

  // collection stuff
  const [collectionActiveItem, setCollectionActiveItem] = useState<string>(COLLECTED_CATEGORIES_TITLES.cards)
  const [total, setTotal] = useState(0)

  // all emote data
  // const [allEmotes, setAllEmotes] = useState<IEmote[]>([])

  // web2 assets
  const [web2Cards, setWeb2Cards] = useState<CardDetails[]>([])
  const [web2Ethernals, setWeb2Ethernals] = useState<IEthernal[]>([])
  const [web2Cardbacks, setWeb2Cardbacks] = useState<ICardBack[]>([])
  const [web2Adventurers, setWeb2Adventurers] = useState<IAdventurersInformation[]>([])
  const [web2Emotes, setWeb2Emotes] = useState<IEmote[]>([])
  const [web2Founderpacks, setWeb2Founderpacks] = useState<IFounderPack[]>([])

  // web3 assets
  const [web3Emotes, setWeb3Emotes] = useState<INftEmote[]>([])
  const [web3Cards, setWeb3Cards] = useState<CardDetails[]>([])
  const [web3Adventurers, setWeb3Adventurers] = useState<IAdventurersInformation[]>([])
  const [web3Cardbacks, setWeb3Cardbacks] = useState<ICardBack[]>([])
  const [web3Ethernals, setWeb3Ethernals] = useState<IEthernal[]>([])
  const [web3founderpacks, setWeb3Founderpacks] = useState<INFTFounderPack[]>([])

  // filtered assets
  const [filteredEmotes, setFilteredEmotes] = useState<Array<INftEmote | IEmote>>([])
  const [filteredCards, setFilteredCards] = useState<CardDetails[]>([])
  const [filteredAdventurers, setFilteredAdventurers] = useState<IAdventurersInformation[]>([])
  const [filteredEthernals, setFilteredEthernals] = useState<IEthernal[]>([])
  const [filteredCardBacks, setFilteredCardBacks] = useState<ICardBack[]>([])

  // FILTERS
  // "all" is active by default
  const [cardsFilter, setCardsFilter] = useState(cardsFilterTitles.all)
  const [ethernalsFilter, setEthernalsFilter] = useState(cardsFilterTitles.all)
  const [emotesFilter, setEmotesFilter] = useState(cardsFilterTitles.all)
  const [elementFilter, setElementFilter] = useState(elementFilterTitles.all)

  const getTotalCollectedCount = () => {
    if (!fullUserData) return 0
    const web2count = [...web2Cards, ...web2Emotes, ...web2Ethernals, ...web2Cardbacks].reduce(
      (partialSum: number, el: any) => partialSum + (el && el.count ? el.count : 0),
      0
    )
    const web3count =
      web3Cards.length ||
      0 + web3Emotes.length ||
      0 + web3Adventurers.length ||
      0 + web3Cardbacks.length ||
      0 + web3Ethernals.length ||
      0
    return web2count + web3count
  }

  useEffect(() => {
    setTotal(getTotalCollectedCount())
  }, [
    web2Cards,
    web2Ethernals,
    web2Cardbacks,
    web2Adventurers,
    web2Emotes,
    web3Cards,
    web3Emotes,
    web3Cardbacks,
    web3Adventurers,
    web3Ethernals,
  ])

  const getEmoteById = (allEmotes: IEmote[], emoteId: string) => {
    const res = allEmotes.filter((e) => e.id === emoteId)
    if (!res.length) console.log("FAILED TO FIND EMOTE BY ID:", allEmotes, emoteId)
    if (res.length) return res[0]
  }

  const getAssetsByViewType = (assetType: string) => {
    let web2Assets: any, web3Assets: any

    switch (assetType) {
      case COLLECTED_CATEGORIES_TITLES.adventurers:
        web2Assets = web2Adventurers
        web3Assets = web3Adventurers
        break
      case COLLECTED_CATEGORIES_TITLES.cardbacks:
        web2Assets = web2Cardbacks
        web3Assets = web3Cardbacks
        break
      case COLLECTED_CATEGORIES_TITLES.emotes:
        web2Assets = web2Emotes
        web3Assets = web3Emotes
        break
      case COLLECTED_CATEGORIES_TITLES.cards:
        web2Assets = web2Cards
        web3Assets = web3Cards
        break
      case COLLECTED_CATEGORIES_TITLES.ethernals:
        web2Assets = web2Ethernals
        web3Assets = web3Ethernals
        break
    }

    let result: any

    switch (viewType) {
      case ViewType.NFT:
        result = web3Assets
        break
      case ViewType.WEB2:
        result = web2Assets
        break
      default:
        result = [...web3Assets, ...web2Assets]
        break
    }
    return result
  }

  useEffect(() => {
    // @ts-ignore
    setFilteredCards(getAssetsByViewType(COLLECTED_CATEGORIES_TITLES.cards).sort(orderCards))
  }, [web2Cards, web3Cards, viewType, collectionActiveItem])

  useEffect(() => {
    if (collectionActiveItem === COLLECTED_CATEGORIES_TITLES.cardbacks) {
      setFilteredCardBacks(getAssetsByViewType(collectionActiveItem))
    }
  }, [viewType, collectionActiveItem])

  useEffect(() => {
    if (collectionActiveItem === COLLECTED_CATEGORIES_TITLES.emotes) {
      const allEmotes = getAssetsByViewType(collectionActiveItem)
      if (emotesFilter === cardsFilterTitles.all) {
        setFilteredEmotes(allEmotes)
      } else {
        setFilteredEmotes(
          allEmotes.filter((c: INftEmote | IEmote) => {
            // @ts-ignore
            return c.isNFT ? c.attributes.rarity.toLowerCase() == emotesFilter : c.rarity == emotesFilter
          })
        )
      }
    }
  }, [viewType, collectionActiveItem, emotesFilter, web2Emotes, web3Emotes])

  const loadWeb2Assets = () => {
    // console.log("FULL USER DATA", fullUserData)
    try {
      let allEmotes: IEmote[] = []
      fetch("/api/getAllEmotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => (allEmotes = r))

      // console.log("ALL EMOTES:", allEmotes)

      fetch("/api/getUserWeb2Assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: fullUserData?.id }),
      })
        .then((r) => r.json())
        .then((r: any) => {
          console.log("WEB 2 ASSETS:", r)
          if (Object.keys(r).length === 0) return
          // CARDS
          if (r.card) {
            let orderedCards = r.card
              ? r.card
                  .map((c: any) => {
                    return { isNFT: false, ...c }
                  })
                  .sort(orderCards)
              : []
            setWeb2Cards(orderedCards)
          }

          // ETHERNALS
          if (r.ethernal)
            setWeb2Ethernals(
              r.ethernal.map((c: any) => {
                return { isNFT: false, ...c }
              })
            )

          // EMOTES
          if (r.emote) setWeb2Emotes(r.emote.map((e: any) => getEmoteById(allEmotes, e.id)))
          // setWeb2Emotes(r.emotes)
          // setFilteredEmotes(r.emotes)

          // ADVENTURERS
          if (r.adventurer)
            setWeb2Adventurers(
              r.adventurer.map((c: any) => {
                return { isNFT: false, ...c }
              })
            )

          // CARDBACKS
          if (r.cardBack)
            setWeb2Cardbacks(
              r.cardBack.map((c: any) => {
                return { isNFT: false, ...c }
              })
            )

          // founderpacks
          setWeb2Founderpacks(
            r.founderpacks.map((c: any) => {
              return { isNFT: false, ...c }
            })
          )

          let packs: IBoosterCard[] = []
          r.pack?.map((c: any) => {
            // if (c.type === "pack") {
            const packData = BOOSTERS.find((b) => b.link === c.id)
            if (packData) {
              packs.push({ ...packData, qtyOwned: c.count, isNFT: false })
            }
            // }
          })
          setCollection(packs)
        })
    } catch (e: any) {
      console.log("error when getting user web2 assets:", e)
    }
  }

  const loadWeb3Assets = () => {
    setWeb3Emotes([])
    try {
      if (fullUserData.id) {
        getUserWeb3Assets(fullUserData.id).then((r) => {
          console.log("loadWeb3Assets response", r)
          if (!r.status || r.status !== 404) {
            // all of the NFTs will have a count of 1 as they are unique items
            setWeb3Emotes(
              r.emotes.map((e: any) => {
                return {
                  isNFT: true,
                  ...e,
                }
              })
            )
            setWeb3Cards(
              r.cards.map((c: any) => {
                if (!c.attributes) return
                return {
                  isNFT: true,
                  // these IDs are not the same as the entry id in the database, might need to check it on BE
                  id: c.id,
                  count: 1,
                  attack: c.attributes.Attack,
                  // FIXME: this is not supplied in web3 cards for some reason
                  circulation: 0,
                  description: c.description,
                  element: c.attributes.Element.toLowerCase(),
                  hp: c.attributes.HP,
                  mana: c.attributes.Mana,
                  name: c.name,
                  race: c.attributes.Race ? c.attributes.Race : "none",
                  rarity: c.attributes.Rarity,
                  season: c.attributes.Season,
                  // currently type is wrong - all of them come back as "Card" which defaults to Creature
                  type: c.attributes.Type,
                }
              })
            )
            setWeb3Adventurers(
              r.adventurers.map((a: any) => {
                return {
                  isNFT: true,
                  id: a.id,
                  name: a.name,
                  image: a.image,
                  attack: a.attributes.Attack,
                  description: a.description,
                  element: a.attributes.Element.toLowerCase(),
                  hp: a.attributes.HP,
                  mana: a.attributes.Mana,
                  rarity: a.attributes.Rarity,
                  type: a.attributes.Type,
                  count: 1,
                }
              })
            )
            setWeb3Cardbacks(
              r.cardBacks.map((cb: any) => {
                return {
                  isNFT: true,
                  id: `nft-${cb.name.toLowerCase().replace(/\s/g, "-")}`,
                  count: 1,
                }
              })
            )
            setWeb3Ethernals(
              r.ethernals.map((e: any) => {
                return {
                  isNFT: true,
                  id: `nft-ethernal-${e.id}`,
                  description: e.description,
                  name: e.name,
                  rarity: e.attributes.Rarity,
                  type: e.attributes.Type,
                  element: e.attributes.Element,
                  count: 1,
                }
              })
            )
            // TODO: cardPacks, ethernals, founderPacks
            // BP and FP will come later as they require opening etc.
            setWeb3Founderpacks(
              r.founderPacks.map((c: any) => {
                return {
                  isNFT: true,
                  id: `nft-pack-${c.tokenId}`,
                  count: c.balance,
                  ...c,
                }
              })
            )
          }
        })
      }
    } catch (e: any) {
      console.log("error when getting web3 assets:", e)
    }
  }

  useEffect(() => {
    // TODO: implement switching between types for each asset kind
    switch (collectionActiveItem) {
      case COLLECTED_CATEGORIES_TITLES.cards:
        break
      case COLLECTED_CATEGORIES_TITLES.emotes:
        break
      case COLLECTED_CATEGORIES_TITLES.adventurers:
        break
      case COLLECTED_CATEGORIES_TITLES.emotes:
        break
      case COLLECTED_CATEGORIES_TITLES.ethernals:
        break

      default:
        break
    }
  }, [viewType])

  useEffect(() => {
    // reset all filters when changing collection category
    // TODO: add for each new filter
    setCardsFilter(cardsFilterTitles.all)
    setViewType(ViewType.ALL)
  }, [collectionActiveItem])

  useEffect(() => {
    if (collectionActiveItem === COLLECTED_CATEGORIES_TITLES.cards) {
      const allCards: CardDetails[] = getAssetsByViewType(collectionActiveItem)
      if (cardsFilter === cardsFilterTitles.all) {
        // @ts-ignore
        setFilteredCards(allCards.sort(orderCards))
      } else {
        setFilteredCards([...allCards.filter((c) => c.rarity.toLowerCase() == cardsFilter)])
      }
    }
  }, [cardsFilter, viewType, collectionActiveItem])

  useEffect(() => {
    if (collectionActiveItem === COLLECTED_CATEGORIES_TITLES.ethernals) {
      const allEthernals: IEthernal[] = getAssetsByViewType(collectionActiveItem)
      if (ethernalsFilter === cardsFilterTitles.all) {
        setFilteredEthernals(allEthernals)
      } else {
        setFilteredEthernals([...allEthernals.filter((e) => e.rarity.toLowerCase() == ethernalsFilter)])
      }
    }
  }, [ethernalsFilter, viewType, collectionActiveItem])

  useEffect(() => {
    if (isLoggedIn && fullUserData) {
      loadWeb2Assets()
      loadWeb3Assets()
      setLoading(false)
    }
  }, [fullUserData, isLoggedIn])

  useEffect(() => {
    if (collectionActiveItem === COLLECTED_CATEGORIES_TITLES.adventurers) {
      const allAdventurers: IAdventurersInformation[] = getAssetsByViewType(collectionActiveItem)
      if (elementFilter === elementFilterTitles.all) {
        setFilteredAdventurers(allAdventurers)
      } else {
        setFilteredAdventurers([...allAdventurers.filter((c) => c.element == elementFilter)])
      }
    }
  }, [elementFilter, viewType, collectionActiveItem])

  const switchViewCallback = () => {
    if (display === CollectionDisplay.collected) {
      setDisplay(CollectionDisplay.packs)
    } else if (display === CollectionDisplay.packs) {
      setDisplay(CollectionDisplay.collected)
    }
  }

  const initiateEmoteTransfer = (emote: INftEmote) => {
    console.log("initiate transfer for emote", emote)
    setChosenAsset(emote)
    setChosenAssetType(AssetTypes.emote)
    setShowTransfer(true)
  }

  return (
    // FIXME: make a separate collection wrapper because for BP styles are different
    <CollectionWrapper displaySwitcher={switchViewCallback} displayValue={display}>
      {showTransfer && chosenAsset && (
        <TransferPopup
          asset={chosenAsset}
          callback={() => setShowTransfer(false)}
          assetType={chosenAssetType}
          resultCallback={loadWeb3Assets}
        />
      )}
      <div className="collection-cont">
        {display === CollectionDisplay.packs && (
          <Packs boosterpacks={collection} founderpacks={web2Founderpacks} web3FPs={web3founderpacks} />
        )}
        {display === CollectionDisplay.collected && (
          <div id="collected-wrapper">
            <div id="collected-list">
              <div className="left-banner left-banner-collected">
                {/* <img src={COLLECTION.menu.menuLeft.src}/> */}
                <div id="collected-menu-list">
                  <h3>Collected</h3>
                  <h3>{total}</h3>
                  <div id="collected-list-items">
                    {COLLECTED_CATEGORIES.map((category) => {
                      return (
                        <div
                          className={
                            category.enabled
                              ? "collected-list-item"
                              : "collected-list-item collected-list-item-disabled"
                          }
                          onClick={() => {
                            if (category.enabled) setCollectionActiveItem(category.title)
                          }}
                          key={`collected-category-item-${category.title}`}
                        >
                          <img
                            src={
                              category.title === collectionActiveItem
                                ? category.images.active.src
                                : category.images.inactive.src
                            }
                          />
                          <h2>{category.title}</h2>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div id="collected-display">
              <ViewTypeSelector active={viewType} callback={setViewType} />
              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.cards && (
                <>
                  {!loading ? (
                    <div className="cards-collection">
                      {web2Cards.length > 0 || web3Cards.length > 0 ? (
                        filteredCards.map((card: CardDetails, cardIndex) => (
                          <Card card={card} display="collection" key={card.isNFT ? `nft-card-${card.id}-${cardIndex}` : `web2-card-${card.id}`} />
                        ))
                      ) : (
                        <h3 id="collection-no-cards">You do not currently own any cards</h3>
                      )}
                    </div>
                  ) : (
                    <h3 id="collection-no-cards">Loading...</h3>
                  )}
                </>
              )}

              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.adventurers && (
                <>
                  {!loading ? (
                    <div className="cards-collection">
                      {web2Adventurers.length > 0 || web3Adventurers.length > 0 ? (
                        filteredAdventurers.length > 0 ? (
                          filteredAdventurers.map((adv: IAdventurersInformation, i) => {
                            return <Adventurer adventurer={adv} renderAside={true} key={adv.isNFT ? `nft-adventurer-${adv.id}-${i}` : `web2-adventurer-${adv.id}`} />
                          })
                        ) : (
                          <h3 className="no-adventurer">You do not currently own any {elementFilter} adventurers.</h3>
                        )
                      ) : (
                        <h3 className="no-adventurer">You do not currently own any adventurers.</h3>
                      )}
                    </div>
                  ) : (
                    <h3 id="collection-loading">Loading...</h3>
                  )}
                </>
              )}

              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.ethernals && (
                <>
                  {!loading ? (
                    <div className="cards-collection">
                      {/* TODO: add web3 ethernals to the array */}
                      {web2Ethernals.length > 0 || web3Ethernals.length > 0 ? (
                        filteredEthernals.map((item: IEthernal, i) => {
                          return <Ethernal ethernal={item} key={item.isNFT ? `${item.id}-${i}` : `web2-ethernal-${item.id}`} />
                        })
                      ) : (
                        // TODO: add a link to the Ethernals PACK PURCHASE PAGE!! Same for the others
                        <h3 id="collection-no-cards">You do not currently own any Ethernals</h3>
                      )}
                    </div>
                  ) : (
                    <h3 id="collection-no-cards">Loading...</h3>
                  )}
                </>
              )}
              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.cardbacks && (
                <>
                  {!loading ? (
                    <div className="cardback-collection">
                      {/* TODO: add web3 cardbacks to the array */}
                      {filteredCardBacks.length > 0 ? (
                        filteredCardBacks.map((item: ICardBack, i) => {
                          return (
                            <div className="cardback-container" key={item.isNFT ? `nft-cardback-${item.id}-${i}` : `web2-cardback-${item.id}`}>
                              <CardBack id={item.id} count={item.count} isNFT={item.isNFT} />
                            </div>
                          )
                        })
                      ) : (
                        <h3 id="collection-no-cards">You do not currently own any Card Backs</h3>
                      )}
                    </div>
                  ) : (
                    <h3 id="collection-no-cards">Loading...</h3>
                  )}
                </>
              )}

              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.emotes && (
                <div className="cards-collection">
                  {filteredEmotes.map((emote: INftEmote | IEmote, i) => {
                    if (!emote) return null
                    if (emote.isNFT) return <NftEmote emote={emote as INftEmote} callback={initiateEmoteTransfer} key={`nft-emote-${emote.name}-${i}`} />
                    else return <Web2Emote emote={emote as IEmote} key={`web2-emote-${emote.name}`}/>
                  })}
                </div>
              )}
            </div>
            <div id="collected-filters">
              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.cards && (
                <CollectionFilters filters={cardsFilters} filterCallback={setCardsFilter} active={cardsFilter} />
              )}
              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.ethernals && (
                <CollectionFilters
                  filters={cardsFilters}
                  filterCallback={setEthernalsFilter}
                  active={ethernalsFilter}
                />
              )}
              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.emotes && (
                <CollectionFilters filters={cardsFilters} filterCallback={setEmotesFilter} active={emotesFilter} />
              )}
              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.adventurers && (
                <CollectionElementFilters
                  filters={elementFilters}
                  filterCallback={setElementFilter}
                  active={elementFilter}
                />
              )}
              {collectionActiveItem === COLLECTED_CATEGORIES_TITLES.cardbacks && (
                <div style={{ width: "272px", marginLeft: "135px" }}></div>
              )}
              {/* CARDBACKS CURRENTLY DON'T HAVE ANY RARITY INFO SUPPLIED THUS CAN'T BE FILTERED */}
            </div>
          </div>
        )}
      </div>
    </CollectionWrapper>
  )
}

export default Collection
