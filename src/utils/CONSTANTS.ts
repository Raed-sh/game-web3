import { BPs } from "public/images"
import Visa from "public/images/miscs/Visa.png"
import { StaticImageData } from "next/image"
import { usdtAbi } from "./usdtAbi"
import { usdcAbi } from "./usdcAbi"
import { usdcGoerliAbi } from "./usdcGoerliAbi"
import { fpAbi } from "./abis/founderPacksAbi"
import { burnnMintAbi } from "./abis/burnnMintAbi"
import { testAEGAbi } from "./abis/TestAEGAbi"
import { testStableAbi } from "./abis/testStableAbi"

// DELUXE PACKS ASSETS
// this common card is wrong
import commonCard from "public/images/layout/fb/commonCard.png"
import founderCard from "public/images/collection/founderpacks/benefitsPreview/1x-FP-cards.webp"
import founderCardHover from "public/images/collection/founderpacks/benefitsPreview/1x-FP-cards-hover.webp"

import founderCardx2 from "public/images/collection/founderpacks/benefitsPreview/2x-FP-cards.webp"
import founderCardx2Hover from "public/images/collection/founderpacks/benefitsPreview/2x-FP-cards-hover.webp"

import founderCardx3 from "public/images/collection/founderpacks/benefitsPreview/3x-FP-cards.webp"
import founderCardx3Hover from "public/images/collection/founderpacks/benefitsPreview/3x-FP-cards-hover.webp"

import commonCardx5 from "public/images/collection/founderpacks/benefitsPreview/x5-Common-cards.webp"
import commonCardx5Hover from "public/images/collection/founderpacks/benefitsPreview/x5-Common-cards-hover.webp"

// this is the wrong one
import emotesCard from "public/images/layout/fb/emotesCard.png"

import goldenCardBack from "public/images/collection/founderpacks/benefitsPreview/Golden-Card-Back.webp"
import goldenCardBackHover from "public/images/collection/founderpacks/benefitsPreview/Golden-Card-Back-hover.webp"
import silverCardBack from "public/images/collection/founderpacks/benefitsPreview/Silver-card-back.webp"
import silverCardBackHover from "public/images/collection/founderpacks/benefitsPreview/Silver-card-back-hover.webp"

import adventurerCard from "public/images/collection/founderpacks/benefitsPreview/1x-Adventurer.webp"
import adventurerCardHover from "public/images/collection/founderpacks/benefitsPreview/1x-Adventurer-hover.webp"

import elementalCard from "public/images/collection/founderpacks/benefitsPreview/1x-Elemental-creature.webp"
import elementalCardHover from "public/images/collection/founderpacks/benefitsPreview/1x-Elemental-creature-hover.webp"

import emotePack from "public/images/collection/founderpacks/benefitsPreview/Emote-pack.webp"
import emotePackHover from "public/images/collection/founderpacks/benefitsPreview/Emote-pack-hover.webp"

import classic_card_wrapper from "public/images/layout/fb/classic-card-bg.png"
import silver_card_wrapper from "public/images/layout/fb/silver-card-bg.png"

import Classic_buy_bg from "public/images/layout/fb/Classic-buy.webp"
import Classic_buy_bg_hover from "public/images/layout/fb/Classic-buy-hover.webp"
import classicPreviewBg from "public/images/layout/fb/bg-fp-info-copper.webp"

import Premium_buy_bg from "public/images/layout/fb/Premium-buy.webp"
import Premium_buy_bg_hover from "public/images/layout/fb/Premium-buy-hover.webp"
import premiumPreviewBg from "public/images/layout/fb/bg-fp-info-silver.webp"

import Legendary_buy_bg from "public/images/layout/fb/Legendary-buy.webp"
import Legendary_buy_bg_hover from "public/images/layout/fb/Legendary-buy-hover.webp"
import legendaryPreviewBg from "public/images/layout/fb/bg-fp-info-golden.webp"

//founder packs assets

import heirloom from "public/images/collection/founderpacks/benefitsPreview/Heirloom.webp"
import heirloomHover from "public/images/collection/founderpacks/benefitsPreview/Heirloom-hover.webp"

import founderDeck from "public/images/collection/founderpacks/benefitsPreview/Founder-Deck.webp"
import founderDeckHover from "public/images/collection/founderpacks/benefitsPreview/Founder-Deck-hover.webp"

import uncommonCard from "public/images/collection/founderpacks/benefitsPreview/Uncommon-card.webp"
import uncommonCardHover from "public/images/collection/founderpacks/benefitsPreview/Uncommon-card-hover.webp"

import founderNFTCard from "public/images/collection/founderpacks/benefitsPreview/1x-FP-cards.webp"
import founderNFTCardHover from "public/images/collection/founderpacks/benefitsPreview/1x-FP-cards-hover.webp"

import goldenTicket from "public/images/collection/founderpacks/benefitsPreview/Golden-Ticket.webp"
import goldenTicketHover from "public/images/collection/founderpacks/benefitsPreview/Golden-Ticket-hover.webp"

import deckExpansion from "public/images/collection/founderpacks/benefitsPreview/Deck-expansion-ticket.webp"
import deckExpansionHover from "public/images/collection/founderpacks/benefitsPreview/Deck-expansion-ticket-hover.webp"

import exclusiveCardBack from "public/images/collection/founderpacks/benefitsPreview/Exclusive-card-backs.webp"
import exclusiveCardBackHover from "public/images/collection/founderpacks/benefitsPreview/Exclusive-card-backs-hover.webp"

import discordRole from "public/images/collection/founderpacks/benefitsPreview/Discord-role.webp"
import discordRoleHover from "public/images/collection/founderpacks/benefitsPreview/Discord-role-hover.webp"

import corvunRaffle from "public/images/collection/founderpacks/benefitsPreview/Corvun-Raffle-Ticket.webp"
import corvunRaffleHover from "public/images/collection/founderpacks/benefitsPreview/Corvun-Raffle-Ticket-hover.webp"

import nameReservation from "public/images/collection/founderpacks/benefitsPreview/Name-reservation.webp"
import nameReservationHover from "public/images/collection/founderpacks/benefitsPreview/Name-reservation-hover.webp"

// BP STORE [link] PREVIEWS
import adventurerPackPreview from "public/images/bp store previews/preview/Adventurer.webp"
// basic pack preview seems to be unused
import basicPackPreview from "public/images/bp store previews/preview/Basic.webp"
import controlPackPreview from "public/images/bp store previews/preview/Control.webp"
import doomSlayerPackPreview from "public/images/bp store previews/preview/Doom-Slayer.webp"
import elementalRagePackPreview from "public/images/bp store previews/preview/Elemental-Rage.webp"
import emotePackPreview from "public/images/bp store previews/preview/Emotes.webp"
import echantedForestPackPreview from "public/images/bp store previews/preview/Enchanted-Forest.webp"
import ethernalPackPreview from "public/images/bp store previews/preview/Ethernal.webp"
import fighterPackPreview from "public/images/bp store previews/preview/Fighter.webp"
import findThePathPackPreview from "public/images/bp store previews/preview/Find-the-Path.webp"
import iceWrathPackPreview from "public/images/bp store previews/preview/Ice-Wrath.webp"
import lullabyPackPreview from "public/images/bp store previews/preview/Lullaby.webp"
import nightfallPackPreview from "public/images/bp store previews/preview/Nightfall.webp"
import powerAndSilencePackPreview from "public/images/bp store previews/preview/Power-and-silence.webp"
import welcomePackPreview from "public/images/bp store previews/preview/Welcome.webp"

export const ADMIN_WALLET = "0x6b7aDcee5F1711e718A4e6d5e6e820BEa9FC610B"

export const CONTRACTS = {
  cards: "0x6Be7fACeA0c8d92Da2e04C8a653F52622F7BC0E8".toLowerCase(),
  packs: "0x7eeCA57ddAB4F3d296bd95C2D7cbA93400553Ad0".toLowerCase(),
  adventurers: "0x57aE8FEb1fa787068e80A67b50A637094d50f8c6".toLowerCase(),
  ethernals: "0x41298867BC115A712Bf37973ECB848d6Db57B74e".toLowerCase(),
  cardbacks: "0xaD9F399111d428C247A0c705B88Fda2492Df0e71".toLowerCase(),
  testFp: "0xcA5693c666f65e34f21026dd8B3B735E8aA49D0b".toLowerCase(),
  aegToken: "0xb9f62f160aaB26D7da8DA796E17d4bd731a04281".toLowerCase(),
  emotes: "0x4FFcd6e9ebf37d60d3BDC7c7738D06DFCef43b29".toLowerCase(),
  oldEmotes: "0x6834B33aeE4Faf2eb8c03B1c6D12600F29bfC073".toLowerCase(),
}

export interface IBoosterCard {
  isNFT?: boolean
  title: string
  link: string
  qty: number
  desc: string
  type?: string
  cardTypes?: string[]
  rarityAllocations?: IRarityAllocations
  price: number
  bg: string
  hover: string
  collection_bg: string
  collection_bg_hover: string
  blur_bg: string
  opening_bg: string
  opening_pack: StaticImageData
  onClick?: () => void
  qtyOwned?: number
  storePreview: StaticImageData
}

export interface IFounderCard {
  isNFT?: boolean
  title: string
  cardWrapper: StaticImageData
  cardBG: StaticImageData
  cardBGHover: StaticImageData
  qty: number
}

interface IRarityAllocations {
  common: number | null
  uncommon: number | null
  rare: number | null
  epic: number | null
  legendary: number | null
}

export const PURCHASE_METHODS = [
  {
    method: "Visa",
    image: Visa,
  },
  // {
  //   method: "GooglePay",
  //   image: GooglePay,
  // },
  // {
  //   method: "ApplePay",
  //   image: ApplePay,
  // },
]

const allCardTypes = [
  "none",
  "demon",
  "beast",
  "elemental",
  "fairy",
  "troll",
  "dragon",
  "fire",
  "water",
  "earth",
  "air",
  "ice",
  "thunder",
  "nature",
  "chaos",
  "light",
]

export const BOOSTERS: IBoosterCard[] = [
  {
    title: "Welcome \nPack",
    link: "welcome-pack",
    qty: 3,
    desc: "3 Common",
    type: "any",
    cardTypes: allCardTypes,
    rarityAllocations: {
      common: 3,
      uncommon: null,
      rare: null,
      epic: null,
      legendary: null,
    },
    price: 300,
    bg: BPs.welcome_pack_pw.src,
    hover: BPs.welcome_pack_pw_hover.src,
    collection_bg: BPs.welcome_pack_coll.src,
    collection_bg_hover: BPs.welcome_pack_coll_hover.src,
    blur_bg: BPs.Elemental_Rage_blur.src,
    opening_bg: BPs.WelcomePackOpening.src,
    opening_pack: BPs.WelcomePackPreview,
    storePreview: welcomePackPreview,
  },
  {
    title: "Emotes \nPack",
    // used to be `emotes-pack`
    link: "emote-pack",
    qty: 3,
    desc: "Emotes",
    type: "pack",
    cardTypes: ["Emotes"],
    rarityAllocations: {
      common: null,
      uncommon: null,
      rare: null,
      epic: null,
      legendary: null,
    },
    price: 1500,
    bg: BPs.emotes_pack_pw.src,
    hover: BPs.emotes_pack_pw_hover.src,
    collection_bg: BPs.emotes_pack_coll.src,
    collection_bg_hover: BPs.emotes_pack_coll_hover.src,
    blur_bg: BPs.Elemental_Rage_blur.src,
    opening_bg: BPs.EmotesPackOpening.src,
    opening_pack: BPs.ElementalRagePackPreview,
    storePreview: emotePackPreview,
  },
  {
    title: "Ethernal \nPack",
    link: "ethernal-pack",
    qty: 1,
    desc: "Ethernal",
    type: "pack",
    cardTypes: ["Ethernal"],
    rarityAllocations: {
      common: null,
      uncommon: null,
      rare: null,
      epic: null,
      legendary: null,
    },
    price: 10000,
    bg: BPs.ethernal_pack_pw.src,
    hover: BPs.ethernal_pack_pw_hover.src,
    collection_bg: BPs.ethernal_pack_coll.src,
    collection_bg_hover: BPs.ethernal_pack_coll_hover.src,
    blur_bg: BPs.Elemental_Rage_blur.src,
    opening_bg: BPs.EthernalPackOpening.src,
    opening_pack: BPs.EthernalPackPreview,
    storePreview: ethernalPackPreview,
  },
  {
    title: "Adventurer \nPack",
    link: "adventurer-pack",
    qty: 1,
    desc: "Adventurer",
    type: "pack",
    cardTypes: ["Adventurer"],
    rarityAllocations: {
      common: null,
      uncommon: null,
      rare: null,
      epic: null,
      legendary: null,
    },
    price: 14000,
    bg: BPs.adventurer_pack_pw.src,
    hover: BPs.adventurer_pack_pw_hover.src,
    collection_bg: BPs.Adventurer_pack_coll.src,
    collection_bg_hover: BPs.Adventurer_pack_coll_hover.src,
    blur_bg: BPs.Lullaby_blur.src,
    opening_bg: BPs.AdventurerPackOpening.src,
    opening_pack: BPs.AdventurerPackPreview,
    storePreview: adventurerPackPreview,
  },
  {
    title: "Nightfall",
    link: "night-fall",
    qty: 11,
    desc: "3 Common, 5 Uncommon, 2 Rare, 1 Epic (5% Legendary)",
    type: "any",
    cardTypes: allCardTypes,
    rarityAllocations: {
      common: 3,
      uncommon: 5,
      rare: 2,
      epic: 1,
      legendary: 0.05,
    },
    price: 8500,
    bg: BPs.Nightfall_pack_pw.src,
    hover: BPs.Nightfall_pack_pw_hover.src,
    collection_bg: BPs.Nightfall_pack_coll.src,
    collection_bg_hover: BPs.Nightfall_pack_coll_hover.src,
    blur_bg: BPs.Nightfall_blur.src,
    opening_bg: BPs.NightfallPackOpening.src,
    opening_pack: BPs.NightfallPackPreview,
    storePreview: nightfallPackPreview,
  },
  {
    title: "Enchanted \nforest",
    link: "enchanted-forest",
    qty: 6,
    desc: "4 Common, 1 Uncommon, 1 Rare (%10 Epic - 1% Legendary)",
    type: "creatures",
    cardTypes: ["Nature", "Earth", "Light"],
    rarityAllocations: {
      common: 4,
      uncommon: 1,
      rare: 1,
      epic: 0.1,
      legendary: 0.01,
    },
    price: 2500,
    bg: BPs.Enchanted_Forest_pack_pw.src,
    hover: BPs.Enchanted_Forest_pack_pw_hover.src,
    collection_bg: BPs.Enchanted_Forest_pack_coll.src,
    collection_bg_hover: BPs.Enchanted_Forest_pack_coll_hover.src,
    blur_bg: BPs.Enchanted_forest_blur.src,
    opening_bg: BPs.EnchantedForestPackOpening.src,
    opening_pack: BPs.EnchantedForestPackPreview,
    storePreview: echantedForestPackPreview,
  },
  {
    title: "Control \npack",
    link: "control-pack",
    qty: 3,
    desc: "1 Common, 1 Uncommon, 1 Rare (5% Epic - 0.1% Legendary)",
    type: "any",
    cardTypes: allCardTypes,
    rarityAllocations: {
      common: 1,
      uncommon: 1,
      rare: 1,
      epic: 0.05,
      legendary: 0.001,
    },
    price: 1800,
    bg: BPs.Control_pack_pw.src,
    hover: BPs.Control_pack_pw_hover.src,
    collection_bg: BPs.Control_pack_coll.src,
    collection_bg_hover: BPs.Control_pack_coll_hover.src,
    blur_bg: BPs.Control_pack_blur.src,
    opening_bg: BPs.ControlPackOpening.src,
    opening_pack: BPs.ControlPackPreview,
    storePreview: controlPackPreview,
  },
  {
    title: "Doom \nslayer",
    link: "doom-slayer",
    qty: 8,
    desc: "5 Common, 1 Uncommon, 1 Rare, 1 Epic (1% Legendary)",
    type: "creatures",
    cardTypes: ["Chaos", "Fire", "Thunder"],
    rarityAllocations: {
      common: 5,
      uncommon: 1,
      rare: 1,
      epic: 1,
      legendary: 0.01,
    },
    price: 5700,
    bg: BPs.Doom_Slayer_pack_pw.src,
    hover: BPs.Doom_Slayer_pack_pw_hover.src,
    collection_bg: BPs.Doom_Slayer_pack_coll.src,
    collection_bg_hover: BPs.Doom_Slayer_pack_coll_hover.src,
    blur_bg: BPs.Doom_slayer_blur.src,
    opening_bg: BPs.DoomSlayerPackOpening.src,
    opening_pack: BPs.DoomSlayerPackPreview,
    storePreview: doomSlayerPackPreview,
  },
  {
    title: "Find the \npath",
    link: "find-the-path",
    qty: 5,
    desc: "3 Common, 1 Uncommon, 1 Rare (10% epic - 0.1% Legendary)",
    type: "creatures",
    cardTypes: ["Beast", "Troll"],
    rarityAllocations: {
      common: 3,
      uncommon: 1,
      rare: 1,
      epic: 0.1,
      legendary: 0.001,
    },
    price: 2200,
    bg: BPs.Find_the_Path_pack_pw.src,
    hover: BPs.Find_the_Path_pack_pw_hover.src,
    collection_bg: BPs.Find_the_Path_pack_coll.src,
    collection_bg_hover: BPs.Find_the_Path_pack_coll_hover.src,
    blur_bg: BPs.Find_the_path_blur.src,
    opening_bg: BPs.FindThePathPackOpening.src,
    opening_pack: BPs.FighterPackPreview,
    storePreview: findThePathPackPreview,
  },
  {
    title: "Elemental \nrage",
    link: "elemental-rage",
    qty: 5,
    desc: "3 Common, 1 Uncommon, 1 Rare (10% epic - 0.1% Legendary)",
    type: "creatures",
    cardTypes: ["Elemental", "Dragon"],
    rarityAllocations: {
      common: 3,
      uncommon: 1,
      rare: 1,
      epic: 0.1,
      legendary: 0.001,
    },
    price: 2200,
    bg: BPs.Elemental_Rage_pack_pw.src,
    hover: BPs.Elemental_Rage_pack_pw_hover.src,
    collection_bg: BPs.Elemental_Rage_pack_coll.src,
    collection_bg_hover: BPs.Elemental_Rage_pack_coll_hover.src,
    blur_bg: BPs.Elemental_Rage_blur.src,
    opening_bg: BPs.ElementalRagePackOpening.src,
    opening_pack: BPs.ElementalRagePackPreview,
    storePreview: elementalRagePackPreview,
  },
  // NEW BOOSTERS
  {
    title: "Fighter \nBooster",
    link: "fighter-booster",
    qty: 5,
    desc: "4 Common, 1 Uncommon",
    type: "any",
    cardTypes: allCardTypes,
    rarityAllocations: {
      common: 4,
      uncommon: 1,
      rare: null,
      epic: null,
      legendary: null,
    },
    price: 800,
    bg: BPs.fighter_pack_pw.src,
    hover: BPs.fighter_pack_pw_hover.src,
    collection_bg: BPs.fighter_pack_coll.src,
    collection_bg_hover: BPs.fighter_pack_coll_hover.src,
    blur_bg: BPs.Elemental_Rage_blur.src,
    opening_bg: BPs.FighterPackOpening.src,
    opening_pack: BPs.FighterPackPreview,
    storePreview: fighterPackPreview,
  },

  // ------------
  {
    title: "Ice \nwrath",
    link: "ice-wrath",
    qty: 10,
    desc: "7 Common, 2 Uncommon, 1 Rare (10% Epic - 0.2% Legendary)",
    type: "any",
    cardTypes: ["ice", "water", "air"],
    rarityAllocations: {
      common: 7,
      uncommon: 2,
      rare: 1,
      epic: 0.1,
      legendary: 0.002,
    },
    price: 3100,
    bg: BPs.Ice_Wrath_pack_pw.src,
    hover: BPs.Ice_Wrath_pack_pw_hover.src,
    collection_bg: BPs.Ice_Wrath_pack_coll.src,
    collection_bg_hover: BPs.Ice_Wrath_pack_coll_hover.src,
    blur_bg: BPs.Ice_wrath_blur.src,
    opening_bg: BPs.IceWrathPackOpening.src,
    opening_pack: BPs.IceWrathPackPreview,
    storePreview: iceWrathPackPreview,
  },
  {
    title: "Lullaby",
    link: "lullaby",
    qty: 6,
    desc: "4 Common, 1 Uncommon, 1 Rare (10% Epic - 0.2% Legendary)",
    type: "creatures",
    cardTypes: ["fairy", "demon"],
    rarityAllocations: {
      common: 4,
      uncommon: 1,
      rare: 1,
      epic: 0.1,
      legendary: 0.002,
    },
    price: 2400,
    bg: BPs.Lullaby_pack_pw.src,
    hover: BPs.Lullaby_pack_pw_hover.src,
    collection_bg: BPs.Lullaby_pack_coll.src,
    collection_bg_hover: BPs.Lullaby_pack_coll_hover.src,
    blur_bg: BPs.Lullaby_blur.src,
    opening_bg: BPs.LullabyPackOpening.src,
    opening_pack: BPs.LullabyPackPreview,
    storePreview: lullabyPackPreview,
  },
  {
    title: "Power and \nSilence",
    link: "power-and-silence",
    qty: 11,
    desc: "8 Common, 2 Uncommon, 1 Rare (10% Epic - 0.2% Legendary)",
    type: "spells_relics",
    cardTypes: allCardTypes,
    rarityAllocations: {
      common: 8,
      uncommon: 2,
      rare: 1,
      epic: 0.1,
      legendary: 0.002,
    },
    price: 3200,
    bg: BPs.Power_and_silence_pack_pw.src,
    hover: BPs.Power_and_silence_pack_pw_hover.src,
    collection_bg: BPs.Power_and_silence_pack_coll.src,
    collection_bg_hover: BPs.Power_and_silence_pack_coll_hover.src,
    blur_bg: BPs.Power_and_silence_blur.src,
    opening_bg: BPs.PowerAndSilencePackOpening.src,
    opening_pack: BPs.PowerAndSilencePackPreview,
    storePreview: powerAndSilencePackPreview,
  },
]

// testStable deployed at:  0xa14BB57DBB34F903e41166044BfF94D903e9C2a8
// reusing "COEHelper" at 0xf9765c8D319130d19dAcc02cB513C2b104034b02
// helper deployed 0xf9765c8D319130d19dAcc02cB513C2b104034b02
// deploying "COEPacks" (tx: 0x0a0d5ed9adf04afd55f8ae0cdce1f52a89d5335931abc230d215afc58af75073)...: deployed at 0xCC283b4DE6ddA571891E6204C200C3b1A4A68Bc4 with 5686117 gas
// FP deployed 0xCC283b4DE6ddA571891E6204C200C3b1A4A68Bc4
// cards deployed 0x930574f4d25f7C67aB021384727D81ab0d8baC17
// deploying "COEAdventurers" (tx: 0xfcc738c5ebec141e531850e7f068ef2c1234d325c1afa7bf4aac3587b44a6f23)...: deployed at 0x58f0E4F5838AD7Ecc9a4d2ae791bB1220F21dA49 with 5025434 gas
// adventurers deployed 0x58f0E4F5838AD7Ecc9a4d2ae791bB1220F21dA49
// deploying "COEEthernals" (tx: 0x3a453a91068282b0fd0a3294d4736ed0746af9ac6895752f7f728f223bfccd3f)...: deployed at 0x0bE149685145D11B90a7Cb325E5526Ed2767c0bf with 5014005 gas
// ethernals deployed 0x0bE149685145D11B90a7Cb325E5526Ed2767c0bf
// deploying "COECardBacks" (tx: 0x1ed4dab78ec1abcc30a87ebcf22e26cc3ba7478f077d6ecbd34e628c173a4bbb)...: deployed at 0x33E7AA53b6cbE0B4D3D14cC885D867DC58E087A7 with 4613025 gas
// cardbacks deployed 0x33E7AA53b6cbE0B4D3D14cC885D867DC58E087A7
// deploying "COEBurnAndMint" (tx: 0xa2c9031a5215b914df4380eb1c97461bee10adc8c85c03c7c123de9801ca33cc)...: deployed at 0xd175F6ceC3ff90f5D466b0d3CC9e27C7A40a3cb5 with 3255156 gas
// burnandmint deployed 0xd175F6ceC3ff90f5D466b0d3CC9e27C7A40a3cb5

export const USDT_CONTRACT_ABI = usdtAbi
export const USDT_CONTRACT_ADDRESS = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"

export const USDC_CONTRACT_ABI = usdcAbi
export const USDC_CONTRACT_ADDRESS = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"

export const USDC_GOERLI_CONTRACT_ABI = usdcGoerliAbi
export const USDC_GOERLI_CONTRACT_ADDRESS = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"

//MUMBAI
export const TEST_AEG_CONTRACT_ABI = testAEGAbi
export const TEST_AEG_CONTRACT_ADDRESS = "0x06eF9E15e1838c1e6A2DB9cf385d3f89b3FBEcB5"

export const TEST_STABLES_CONTRACT_ABI = testStableAbi
export const TEST_STABLES_CONTRACT_ADDRESS = "0xa14BB57DBB34F903e41166044BfF94D903e9C2a8"

const isTestnet = process.env.NEXT_PUBLIC_NETWORK == "mumbai"
// isTestnet ? TESTNET : MAINNET
export const COEHELPER_CONTRACT_ADDRESS = isTestnet ? "0x7c92172A53Ab9e1Ed3b7dEFe38b60C2505D69Df0" : "0xb5be0C6b8E85A6851aA73a904b0aa153Cbf020c4"

export const FOUNDER_PACKS_CONTRACT_ADDRESS = isTestnet ? "0xd6CCbB016E94DdFDc4e33c73Ba0566C38Ec83Fa3" : "0x68Ce5C94C8Af54EE5ABdefc3A17cDDc45d025eEb"
export const FOUNDER_PACKS_CONTRACT_ABI = fpAbi

export const BURN_N_MINT_CONTRACT_ADDRESS = isTestnet ?  "0x255BAbA3E8801eD12786c02AA41252A8d333f11D" : "0xDAa2a486A59f3519E33c9b47c074d1ED0b654265"
export const BURN_N_MINT_CONTRACT_ABI = burnnMintAbi

export interface IAdventurersInformation {
  element: string
  name: string
  personality: string
  archetype: string
  lore: string
  price: number
  id: string
}

export const ADVENTURERS_INFORMATION: IAdventurersInformation[] = [
  {
    element: "air",
    name: "Aisha",
    personality: "Confident, matter of fact, co-operative",
    archetype: "Strong silent type",
    lore: "Aisha was the daughter of a prominent sovereign's guard, the Head of the Hashashins. For her bewitching beauty, she was captured and taken as a slave after the raids by the Vikings on the Iberian Peninsula.In her late teens and after years of service, they let her return to her homeland, the small remote, isolated island full of magic.The girl got into a fierce battle between a dragon and fairies on a home island. One of the fairies saved her life.Everything was destroyed, so they fled to safe areas.The fairies taught Aisha magic.One of the fairies sacrificed herself after her death to make enchanted armor for the girl. Now Aisha is the assassin, garbed in dark attire and equipped with enhanced blades.And somehow, she will return home.",
    price: 25000,
    id: "Adventurer-human-Air-Adventurer_of_Air-full",
  },
  {
    element: "water",
    name: "Dona Camille",
    personality: "Caregiver, compassionate, merciful, kind, generious.",
    archetype: "Nurse, caregiver, protector, innocent.",
    lore: "Dona hears the voice of an ancient elemental in the water at the age of six. When trolls and dragons raid her village, Dona's abilities to control water save her father's life. She becomes a healer, renowned throughout the land. When trolls attack again, Dona joins the city guard and helps people escape, almost dying in the process. She spends a year recovering, and upon regaining her youth and power, continues to help anyone in need, gaining loyal companions in the process.",
    price: 15000,
    id: "Adventurer-human-Water-Adventurer_of_Water-full",
  },
  {
    element: "nature",
    name: "Adair",
    personality: "Cantankerous, stubborn, ill tempered.",
    archetype: "Gandalf the white, Merlin.",
    lore: "Adair was the last surviving member of the druid circle known as the 'Fallen Oak' When supernatural creatures invaded his homeland, he found his magic was insufficient. He spent years perfecting his craft, but to no avail. One day, a demon offered him power and understanding in exchange for the lives of those he couldn't protect. Adair agreed and underwent intensive training, unlocking his true potential as the Druid. He could feel life, death, and energy, and had the power to control nature itself. With this newfound power, he sought vengeance against those who had ravaged his land.",
    price: 20000,
    id: "Adventurer-human-Nature-Adventurer_of_Nature-full",
  },
  {
    element: "light",
    name: "Princess Aurelia",
    personality: "Confident, inspiring, careful with her words",
    archetype: "Leader who ispires others by getting doing and not only ordering. Also very defensive of her position",
    lore: "Princess Aurelia is the third-born daughter who was never meant to become a ruler. However, after her mother and siblings died, she was forced into the role of power. She faced many challenges, including an invasion of otherworldly beasts and a fierce battle with a dragon. Despite the hardships, she demonstrated great leadership, bravery, and compassion, earning her the title of the Light of Hope. She learned to wield powerful magic and commune with the dead, becoming a formidable force to be reckoned with. Aurelia is a skilled warrior, wise ruler, and beloved queen who is willing to fight to protect her kingdom and people.",
    price: 30000,
    id: "Adventurer-human-Light-Adventurer_of_Light-full",
  },
  {
    element: "thunder",
    name: "André Bonaventure",
    personality: "Narcissist, greedy, selfish.",
    archetype: "Bon-viviant, Dorian Grey.",
    lore: "Andre was born into a traveling merchant family and learned the art of charm and oratory from his parents. He had a troubled youth, frequently blamed for crimes where his family stayed, and was imprisoned as a teenager for theft. In jail, he met influential mentors who taught him to survive in a hostile world. He survived duels and infiltrated noble houses to collect information, which helped him develop a plan to sever humans' ties with troll enslavers. Eventually, he became a spy in the war effort, traveling through war-torn lands and infiltrating villages where trolls had settled to gather intelligence and saw a path to victory.",
    price: 15000,
    id: "Adventurer-human-Thunder-Adventurer_of_Thunder-full",
  },
  {
    element: "fire",
    name: "Enrico De Guerra",
    personality:
      "Passionate, Strategist, his personality changes when in battle. As he becomes more and more invested in the moment.",
    archetype: "Intellectual, the artist, calculating.",
    lore: "Enrico, son of a general, had a talent for strategy but was also known for his mischief. He dreamed of becoming a great general but was disappointed to find his father's victories were due to luck rather than strategy. Enrico formed his own band and achieved fame for his daring strategies. His obsession with destroying monsters led him to seek power in forgotten lore and eventually make a deal with a demon. With his newfound power, Enrico led a band of warriors to slaughter the trolls and lusted after a worthy opponent.",
    price: 20000,
    id: "Adventurer-human-Fire-Adventurer_of_Fire-full",
  },
  {
    element: "earth",
    name: "Revenger",
    personality: "Confident, Caring, Brave.",
    archetype: "Capable Hunter with regard and care for others.",
    lore: "Revenger's childhood was spent on the move with his father, a skilled trapper who taught him archery and how to survive in the wilderness. After a successful season, his father revealed that they were refugees fleeing from monstrous creatures that had invaded their homeland, killing his mother and forcing them to constantly flee. Revenger's journey led him to join a resistance group against the trolls, where he became a skilled fighter and strategist. However, he soon discovered the group was selling information to the trolls, causing him to leave and seek power from a demon, leading to a complex journey that would turn him into a renowned ranger known for his martial abilities, as well as his unwavering sense of justice.",
    price: 20000,
    id: "COE-0000079-Adventurer-human-Earth-Adventurer_of_Earth-full",
  },
  {
    element: "ice",
    name: "Isgerd Virðiligur",
    personality: "Narcissistic, Egomaniac",
    archetype: "Cruel and Cunning",
    lore: "Isgerd was a princess who grew up with a kind heart in the northern kingdom. However, her peaceful life was shattered when a dragon destroyed her home and killed her father. Her mother managed to save Isgerd and send her to a nearby temple for safety. There, she learned to fight and became a skilled shield maiden and leader. However, during a hunt, Isgerd was attacked by a troll and survived by becoming a demonic apprentice. This transformed her into a cruel ruler who took back her throne by turning her family into ice and ruling with an iron fist. Her goal was to defend the realm and punish invaders.",
    price: 30000,
    id: "Adventurer-human-Ice-Adventurer_of_Ice-full",
  },
  {
    element: "chaos",
    name: "Hörð from Heimir",
    personality: "Violent, bully, might make right.",
    archetype: "Rash, Irrational, almost primitive.",
    lore: "Hörð was considered insane, with the gift of combat and the ability to see the Yagrisdall. He became a berserker and proved himself by killing a troll on his spirit walk. Hörð would embark on solo missions to hunt beasts and befriend them. When his village was attacked by a dragon, Hörð fought it, tearing out its heart and eating it before passing out. He woke weeks later and discovered he had died and awoken multiple times due to his anger. Hörð became a famous slayer of trolls and dragons, leading a small group of raiders and utilizing beasts in battle. The fame of the Berserkers grew.",
    price: 10000,
    id: "Adventurer-human-Chaos-Adventurer_of_Chaos-full",
  },
  // {
  //   element: "starter",
  //   name: "Frode Ragnulf",
  //   personality: "Heroic, Willful, brave.",
  //   archetype: "Odysseus",
  //   lore: "Frode, a young Viking raider, embarked on a journey to Britannia with seasoned warriors. During the voyage, a magical portal opened, and a dragon emerged, destroying their ships. Frode survived and washed up on a nearby island overrun by dangerous creatures. He crafted weapons and tamed smaller beasts to help him capture bigger ones. With his plan in motion, Frode built a raft and set out to find human help to return home.",
  //   price: 30000,
  //   id: "Adventurer-human-Starter_Adventurer-full"
  // }
]

// use this for ResultAdventurer if the Frode Ragnulf needs to be openable from FPs
export const ALL_ADVENTURERS: IAdventurersInformation[] = [
  ...ADVENTURERS_INFORMATION,
  {
    element: "starter",
    name: "Frode Ragnulf",
    personality: "Heroic, Willful, brave.",
    archetype: "Odysseus",
    lore: "Frode, a young Viking raider, embarked on a journey to Britannia with seasoned warriors. During the voyage, a magical portal opened, and a dragon emerged, destroying their ships. Frode survived and washed up on a nearby island overrun by dangerous creatures. He crafted weapons and tamed smaller beasts to help him capture bigger ones. With his plan in motion, Frode built a raft and set out to find human help to return home.",
    price: 30000,
    id: "Adventurer-human-Starter_Adventurer-full",
  },
]

// DELUXE PACKS
export const WEB3_FOUNDERPACKS: {
  [key: string]: any
} = {
  founder: {
    id: "web3-founderpack",
    title: "founder",
    cardWrapper: silver_card_wrapper,
    cardBG: Legendary_buy_bg,
    cardBGHover: Legendary_buy_bg_hover,
    previewBg: legendaryPreviewBg,
    price: 175,
    benefits: [
      {
        id: 1,
        bg: heirloom.src,
        img: {
          normal: heirloom.src,
          hover: heirloomHover.src,
        },
        desc: "1x Heirloom NFT (1 of 9)",
        benefit: "heirloom",
      },
      {
        id: 2,
        bg: adventurerCard.src,
        img: {
          normal: adventurerCard.src,
          hover: adventurerCardHover.src,
        },
        desc: "1x Adventurer NFT (1 of 9)",
        benefit: "adventurer",
      },
      {
        id: 3,
        bg: elementalCard.src,
        img: {
          normal: elementalCard.src,
          hover: elementalCardHover.src,
        },
        desc: "1x Ethernal Mini Pet NFT (1 of 5)",
        benefit: "ethernal",
      },
      {
        id: 4,
        bg: founderDeck.src,
        img: {
          normal: founderDeck.src,
          hover: founderDeckHover.src,
        },
        desc: "Founder Pack Starter Deck",
        benefit: "fp-deck",
      },
      {
        id: 5,
        bg: commonCard.src,
        img: {
          normal: commonCardx5.src,
          hover: commonCardx5Hover.src,
        },
        desc: "x5 Common NFT cards",
        benefit: "common-card",
      },
      {
        id: 6,
        bg: uncommonCard.src,
        img: {
          normal: uncommonCard.src,
          hover: uncommonCardHover.src,
        },
        desc: "x1 Uncommon NFT card",
        benefit: "uncommon-card",
      },
      {
        id: 7,
        bg: founderNFTCard.src,
        img: {
          normal: founderNFTCard.src,
          hover: founderNFTCardHover.src,
        },
        desc: "1 Rare + Epic + Legendary NFT cards",
        benefit: "founder-nft-card",
      },
      {
        id: 8,
        bg: goldenTicket.src,
        img: {
          normal: goldenTicket.src,
          hover: goldenTicketHover.src,
        },
        desc: "1 Golden Ticket (access to P2E battlegrounds)",
        benefit: "golden-ticket",
      },
      {
        id: 9,
        bg: deckExpansion.src,
        img: {
          normal: deckExpansion.src,
          hover: deckExpansionHover.src,
        },
        desc: "1 Deck Expansion Ticket",
        benefit: "deck-ticket",
      },
      {
        id: 10,
        bg: exclusiveCardBack.src,
        img: {
          normal: exclusiveCardBack.src,
          hover: exclusiveCardBackHover.src,
        },
        desc: "Exclusive Card Back NFT",
        benefit: "exclusive-card-back",
      },
      {
        id: 11,
        bg: discordRole.src,
        img: {
          normal: discordRole.src,
          hover: discordRoleHover.src,
        },
        desc: "Divine Collector Discord Role",
        benefit: "discord-role",
      },
      {
        id: 12,
        bg: corvunRaffle.src,
        img: {
          normal: corvunRaffle.src,
          hover: corvunRaffleHover.src,
        },
        desc: "Legendary Corvun Raffle Ticket",
        benefit: "corvun-raffle-ticket",
      },
      {
        id: 13,
        bg: nameReservation.src,
        img: {
          normal: nameReservation.src,
          hover: nameReservationHover.src,
        },
        desc: "Name Reservation",
        benefit: "name",
      },
    ],
  },
}

export const FOUNDERPACKS: {
  [key: string]: any
} = {
  classic: {
    id: "classic-founderpack",
    title: "classic",
    cardWrapper: classic_card_wrapper,
    cardBG: Classic_buy_bg,
    cardBGHover: Classic_buy_bg_hover,
    previewBg: classicPreviewBg,
    price: 16800,
    benefits: [
      {
        id: 1,
        bg: founderCard.src,
        img: {
          normal: founderCard.src,
          hover: founderCardHover.src,
        },
        // FIXME: this has to be 1x Founder pack card
        desc: "1 Deluxe Card: \nRare — 1",
        benefit: "founder-card",
      },
      {
        id: 2,
        bg: commonCard.src,
        img: {
          normal: commonCardx5.src,
          hover: commonCardx5Hover.src,
        },
        desc: "x5 Common cards",
        benefit: "common-card",
      },
      {
        id: 3,
        bg: adventurerCard.src,
        img: {
          normal: adventurerCard.src,
          hover: adventurerCardHover.src,
        },
        desc: "1x Adventurer",
        benefit: "adventurer",
      },
    ],
    linkto: "/deluxe-packs/packages/classic",
  },
  premium: {
    id: "premium-founderpack",
    title: "premium",
    cardWrapper: silver_card_wrapper,
    cardBG: Premium_buy_bg,
    cardBGHover: Premium_buy_bg_hover,
    previewBg: premiumPreviewBg,
    price: 32800,
    benefits: [
      {
        id: 1,
        bg: founderCard.src,
        img: {
          normal: founderCardx2.src,
          hover: founderCardx2Hover.src,
        },
        desc: "2 Deluxe Cards:\nRare — 1\nEpic — 1",
        benefit: "founder-card",
      },
      {
        id: 2,
        bg: commonCard.src,
        img: {
          normal: commonCardx5.src,
          hover: commonCardx5Hover.src,
        },
        desc: "x5 Common cards",
        benefit: "common-card",
      },
      {
        id: 3,
        bg: adventurerCard.src,
        img: {
          normal: adventurerCard.src,
          hover: adventurerCardHover.src,
        },
        desc: "1x Adventurer ",
        benefit: "adventurer",
      },
      {
        id: 4,
        bg: emotesCard.src,
        img: {
          normal: emotePack.src,
          hover: emotePackHover.src,
        },
        desc: "Emote pack",
        benefit: "emote-pack",
      },
      {
        id: 5,
        bg: silverCardBack.src,
        img: {
          normal: silverCardBack.src,
          hover: silverCardBackHover.src,
        },
        desc: "Silver card back",
        benefit: "card-back-silver",
      },
    ],
    linkto: "/deluxe-packs/packages/premium",
  },
  legendary: {
    id: "legendary-founderpack",
    title: "legendary",
    cardWrapper: silver_card_wrapper,
    cardBG: Legendary_buy_bg,
    cardBGHover: Legendary_buy_bg_hover,
    previewBg: legendaryPreviewBg,
    price: 38600,
    benefits: [
      {
        id: 1,
        bg: founderCard.src,
        img: {
          normal: founderCardx3.src,
          hover: founderCardx3Hover.src,
        },
        desc: "3 Deluxe Cards:\nRare — 1\nEpic — 1\nLegendary — 1",
        benefit: "founder-card",
      },
      {
        id: 2,
        bg: commonCard.src,
        img: {
          normal: commonCardx5.src,
          hover: commonCardx5Hover.src,
        },
        desc: "x5 Common cards",
        benefit: "common-card",
      },
      {
        id: 3,
        bg: adventurerCard.src,
        img: {
          normal: adventurerCard.src,
          hover: adventurerCardHover.src,
        },
        desc: "1x Adventurer ",
        benefit: "adventurer",
      },
      {
        id: 4,
        bg: elementalCard.src,
        img: {
          normal: elementalCard.src,
          hover: elementalCardHover.src,
        },
        desc: "1x Ethernal",
        benefit: "ethernal",
      },
      {
        id: 5,
        bg: emotesCard.src,
        img: {
          normal: emotePack.src,
          hover: emotePackHover.src,
        },
        desc: "Emote pack",
        benefit: "emote-pack",
      },
      // FIXME: add image of SILVER CARDBACK
      {
        id: 6,
        bg: silverCardBack.src,
        img: {
          normal: silverCardBack.src,
          hover: silverCardBackHover.src,
        },
        desc: "Silver card back",
        benefit: "card-back-silver",
      },
      {
        id: 7,
        bg: goldenCardBack.src,
        img: {
          normal: goldenCardBack.src,
          hover: goldenCardBackHover.src,
        },
        desc: "Golden Card Back",
        benefit: "card-back-golden",
      },
    ],
  },
}

export const POSSIBLE_BENEFITS = FOUNDERPACKS["legendary"].benefits
