import { useEffect, useState } from "react"
import PackSelector, { PackOptions } from "./PackSelector"
import CollectionFounderPack, { IFounderPack, INFTFounderPack } from "./CollectionFounderPack"
import CollectionBoosterPack from "./CollectionBoosterPack"
import { IBoosterCard } from "@/utils/CONSTANTS"

import filterAll from "public/images/collection/packFilters/All-assets.webp"
import filterAllActive from "public/images/collection/packFilters/All-assets-active.webp"
import filterNft from "public/images/collection/packFilters/NFT-assets.webp"
import filterNftActive from "public/images/collection/packFilters/NFT-assets-active.webp"
import filterPlain from "public/images/collection/packFilters/Plain-assets.webp"
import filterPlainActive from "public/images/collection/packFilters/Plain-assets-active.webp"

export interface ICollectionCard {
  bg: string
  hover: string
  title: string
  link: string
  qty: number
  qtyOwned: number
}

interface IFilterCount {
  all: number
  plain: number
  tradable: number
}

const SELECTOR_PACKS = [
  {
    text: "Booster Packs",
    pack: PackOptions.booster,
  },
  {
    text: "Premium Packs",
    pack: PackOptions.founder,
  },
]

const FILTERS = {
  all: {
    text: "all",
    disabled: false,
    images: {
      normal: filterAll,
      active: filterAllActive,
    },
  },
  // FIXME: missing assets for tradable and plain images
  plain: {
    text: "plain",
    disabled: false,
    images: {
      normal: filterPlain,
      active: filterPlainActive,
    },
  },
  tradable: {
    text: "tradable",
    disabled: false,
    images: {
      normal: filterNft,
      active: filterNftActive,
    },
  },
}

const Packs = (props: { boosterpacks: IBoosterCard[]; founderpacks: IFounderPack[]; web3FPs: INFTFounderPack[] }) => {
  const { boosterpacks, founderpacks, web3FPs } = props
  const [chosenPacks, setChosenPacks] = useState(PackOptions.booster)

  const [available, setAvailable] = useState(0)

  const [filterValue, setFilterValue] = useState(FILTERS.all)
  const [filterCount, setFilterCount] = useState<IFilterCount>({ all: 0, plain: 0, tradable: 0 })
  const [filteredFounderpacks, setFilteredFounderpacks] = useState<Array<IFounderPack | INFTFounderPack>>([
    ...web3FPs,
    ...founderpacks,
  ])
  const [filteredBoosterpacks, setFilteredBoosterpacks] = useState(boosterpacks)

  // console.log('boosterpacks:', boosterpacks)

  useEffect(() => {
    setFilteredBoosterpacks(props.boosterpacks)
  }, [props.boosterpacks])

  useEffect(() => {
    setFilteredFounderpacks([...props.web3FPs, ...props.founderpacks])
  }, [props.founderpacks, props.web3FPs])

  useEffect(() => {
    // TODO: add filtering once the web3 assets are added
    switch (filterValue) {
      case FILTERS.plain:
        if (chosenPacks === PackOptions.founder) setFilteredFounderpacks(founderpacks)
        else if (chosenPacks === PackOptions.booster) setFilteredBoosterpacks(boosterpacks)
        break
      case FILTERS.tradable:
        if (chosenPacks === PackOptions.founder) setFilteredFounderpacks(web3FPs)
        else if (chosenPacks === PackOptions.booster) setFilteredBoosterpacks([])
        break
      default:
        if (chosenPacks === PackOptions.founder) setFilteredFounderpacks([...web3FPs, ...founderpacks])
        else if (chosenPacks === PackOptions.booster) setFilteredBoosterpacks(boosterpacks)
        break
    }
  }, [filterValue])

  useEffect(() => {
    if (boosterpacks && founderpacks && boosterpacks.length && founderpacks.length) {
      let bpCount = boosterpacks.map((bp) => bp.qtyOwned || 0).reduce((prev, next) => prev + next)
      let fpCount =
        founderpacks.map((fp) => fp.count).reduce((prev, next) => prev + next) +
        (web3FPs.length > 0 ? web3FPs.map((fp) => fp.balance).reduce((prev, next) => prev + next) : 0)

      setAvailable(bpCount + fpCount)
    } else if (boosterpacks && boosterpacks.length) {
      let bpCount = boosterpacks.map((bp) => bp.qtyOwned || 0).reduce((prev, next) => prev + next)
      setAvailable(bpCount)
    }
    // this could theoretically be an issue
    else if (founderpacks && founderpacks.length) {
      let fpCount = founderpacks.map((fp) => fp.count).reduce((prev, next) => prev + next)
      setAvailable(fpCount)
    }
  }, [boosterpacks, founderpacks, web3FPs])

  useEffect(() => {
    // console.log('updating filter counts')
    let totalWeb2 = 0,
      totalWeb3 = 0
    if (chosenPacks === PackOptions.booster) {
      totalWeb2 = boosterpacks ? boosterpacks.length : 0
      totalWeb3 = 0
    } else if (chosenPacks === PackOptions.founder) {
      totalWeb2 = founderpacks ? founderpacks.length : 0
      totalWeb3 = web3FPs ? web3FPs.length : 0
    }
    setFilterCount({
      all: totalWeb2 + totalWeb3,
      plain: totalWeb2,
      tradable: totalWeb3,
    })
  }, [filterValue, web3FPs, founderpacks, chosenPacks])

  const getFilterCount = (text: string) => {
    switch (text) {
      case "plain":
        return filterCount["plain"]
      case "tradable":
        return filterCount["tradable"]
      default:
        return filterCount["all"]
    }
  }

  return (
    <>
      <div className="left-banner">
        <h5>Available:</h5>
        <h5>{available}</h5>

        {SELECTOR_PACKS.map((pack) => {
          return (
            <PackSelector
              key={`pack-selector-${pack.text}`}
              pack={pack.pack}
              text={pack.text}
              active={chosenPacks === pack.pack}
              callback={() => setChosenPacks(pack.pack)}
            />
          )
        })}
      </div>

      <div id="collection-packs">
        {chosenPacks === PackOptions.booster && filteredBoosterpacks && (
          <div id="collection-bp-list">
            {filteredBoosterpacks.map((bp: IBoosterCard) => {
              return <CollectionBoosterPack pack={bp} key={bp.isNFT ? `nft-bp-${bp.link}` : `web2-bp-${bp.link}`} />
            })}
          </div>
        )}
        {chosenPacks === PackOptions.founder && founderpacks && (
          <div id="collection-fp-list">
            {filteredFounderpacks.map((fp) => {
              return <CollectionFounderPack pack={fp} key={fp.isNFT ? `nft-bp-${fp.id}` : `web2-bp-${fp.id}`} />
            })}
          </div>
        )}

        <div id="collection-pack-filters">
          {Object.values(FILTERS).map((filter) => {
            return (
              <div
                key={`pack-filters-${filter.text}`}
                className={filter.disabled ? "pack-filter pack-filter-disabled" : "pack-filter"}
                style={{
                  backgroundImage: `url(${
                    filterValue.text === filter.text ? filter.images.active.src : filter.images.normal.src
                  })`,
                }}
                onClick={() => {
                  if (filter !== filterValue && !filter.disabled) setFilterValue(filter)
                }}
              >
                <h2 className={filterValue.text === filter.text ? "pack-filter-text-active" : "pack-filter-text"}>
                  {filter.text}
                </h2>
                <h2
                  className={
                    filterValue.text === filter.text ? "pack-filter-text-amount-active" : "pack-filter-text-amount"
                  }
                >
                  {/* filterCount[filter.text] throws an error (but it works) */}
                  {getFilterCount(filter.text)}
                </h2>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Packs
