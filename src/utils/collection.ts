import { CardDetails } from "@/components/Card"
import { CARD_ELEMENTS } from "public/images"
import { COLLECTION } from "public/images"

export const getElementIcon = (element: string) => {
    switch (element) {
        case "air":
            return CARD_ELEMENTS.air
        case "chaos":
            return CARD_ELEMENTS.chaos
        case "earth":
            return CARD_ELEMENTS.earth
        case "fire":
            return CARD_ELEMENTS.fire
        case "ice":
            return CARD_ELEMENTS.ice
        case "light":
            return CARD_ELEMENTS.light
        case "nature":
            return CARD_ELEMENTS.nature
        case "thunder":
            return CARD_ELEMENTS.thunder
        case "water":
            return CARD_ELEMENTS.water
        default:
            return null
    }
}

export const getContainsText = (link: string) => {
    switch (link) {
        case "ethernal-pack":
            return "Ethernal"
        case "adventurer-pack":
            return "Adventurer"
        case "emotes-pack":
        case "emote-pack":
            return "Emotes"
        default:
            return "Cards"
    }
}

export const COLLECTED_CATEGORIES_TITLES = {
    cards: "CARDS",
    adventurers: "ADVENTURERS",
    ethernals: "ETHERNALS",
    cardbacks: "CARD BACKS",
    emotes: "EMOTES",
}
  
  // set `enabled` to `true` if this section is clickable
export const COLLECTED_CATEGORIES = [
    {
      title: COLLECTED_CATEGORIES_TITLES.cards,
      images: COLLECTION.menu.cards,
      enabled: true,
    },
    {
      title: COLLECTED_CATEGORIES_TITLES.adventurers,
      images: COLLECTION.menu.adventurers,
      enabled: true,
    },
    {
      title: COLLECTED_CATEGORIES_TITLES.ethernals,
      images: COLLECTION.menu.ethernals,
      enabled: true,
    },
    {
      title: COLLECTED_CATEGORIES_TITLES.cardbacks,
      images: COLLECTION.menu.cardbacks,
      enabled: true,
    },
    {
      title: COLLECTED_CATEGORIES_TITLES.emotes,
      images: COLLECTION.menu.emotes,
      enabled: true,
    },
]
  
export const rarities_ranked = [
    {
      rarity: "basic",
      rank: 0,
    },
    {
      rarity: "common",
      rank: 1,
    },
    {
      rarity: "uncommon",
      rank: 2,
    },
    {
      rarity: "rare",
      rank: 3,
    },
    {
      rarity: "epic",
      rank: 4,
    },
    {
      rarity: "legendary",
      rank: 5,
    },
]
  
export const getRankFromRarity = (card: CardDetails) => {
    let result = 0
    rarities_ranked.map((pair) => {
        if (pair.rarity === card.rarity) {
            result = pair.rank
        }
    })
    return result
}
  
export const orderCards = (a: CardDetails, b: CardDetails) => {
    if (a.rarity === b.rarity) return 0
  
    if (getRankFromRarity(a) > getRankFromRarity(b)) {
        return -1
    } else if (getRankFromRarity(a) < getRankFromRarity(b)) {
        return 1
    }
}

export interface NftEntry {
    contract: {
        address: string
    }
    id: {
        tokenID: string
        tokenMetadata: {
        tokenType: string
        }
    }
    balance: string
    title: string
    description: string
    tokenUri: {
        gateway: string
        raw: string
    }
    media: {
        gateway: string
        raw: string
    }
    metadata: {
        image: string
        external_url: string
        image_url: string
        name: string
        description: string
        attributes: {
        value: string
        trait_type: string
        }[]
        type: string
        rarity: string
    }
    timeLastUpdated: string
    contractMetadata: {
        name: string
        symbol: string
        totalSupply: string
        tokenType: string
        contractDeployer: string
        deployedBlockNumber: string
        openSea: {
        lastIngestedAt: string
        }
    }
}

// card races
const ELEMENTAL = [
    "Obliterator", "Star Shatterer", "Fury of Fire", "Decaying souls", "Abomination", "Anger of Nature",
    "The Roaming Mountain", "Sand Slither", "Thunder Maiden", "Cloud Stallion", "Aurora", "Demigod",
    "Hollow Witch", "Everfrost", "Warmhearted Dryad", "Axodon", "Umbre",
]

const BEAST = [
    "Executioner", "Hungry Devourer", "Punisher", "The Merciless", "Ravenous", "Nemesis", "Sea Nymph",
    "Sand Wyvern", "Tidebreaker", "Dreamweaver", "Dauntless", "Blink", "Deathgate Hound", "Pack Leader",
    "Wrath of Ice", "Wildfire", "Dread Stalker", "Archon", "Atlas", "Axon", "Dash", "Rake",
]

const FAIRY = [
    "Winged Lightning", "Dawnguard", "Empyrean", "Immaculate", "Minstrel's Fire", "Doom Whisperer",
    "Primordial Fairy", "Death Maiden", "Fairy of Oblivion", "Mothqueen", "Wilderness Overseer",
    "Heartseeker", "Light Envoy", "Dark Screamer", "Carnage", "Living Weapon", "Alphie", "Synalph",
    "Dualeph",
]

const DRAGON = [
    "Thunder Monarch", "Windshaper", "Destroyer of Realms", "Flame Keeper", "Dawnbringer",
    "Nightmare", "Verdant Wyrm", "Emerald Dragon", "Frostwing", "Deadlights",
    "Silent Death", "Obsidian Shine", "Awoken Horror", "Leviathan", "The Almighty", "Dragonkin",
]

const TROLL = [
    "Muzzler", "Warlord", "Warmonger", "Berserker", "Tormented Soul", "Frost Reaper",
    "Lord of Slaughter", "Emissary of Lightning", "Marauder's Call", "Desecrator",
    "Pestilence Master", "The Wanderer", "Soothsayer",
]

const DEMON = [
    "Imp", "Freezing Terror", "Dragonslayer", "Flame Deceiver", "Harbinger of Doom",
    "Soulless Visage", "Fallen", "Blazing Prodigy", "Demonic Intent", "Archfiend of Greed",
    "Night Terror", "Lady Agony", "Infernal Sovereign", "Submarine Warrior", "Frost Raptor",
    "Anarch", "Moonlight",
]

// card types
const RELIC = [
    "Bloodlust Star", "Flame Kissed", "Storm Bane", "Aegis of Preservation", "Glacial Shield",
    "Vortex Helmet", "Bow of Punishment", "Waterborne Armor", "Death's Dealing", "Tormentor's Flame",
    "Lightning Flamberge", "Lash of the Sea", "Shield of Lazarus", "Nature's Masterpiece", "Shield of Trinity",
    "Crown of Agony", "Sunder", "Holy Bulwark", "Lullaby", "Valkyrie Shield", "Honor’s Call",
    "Thundersoother", "Helm of Ethernal Might", "Call of Lost Worlds", "Apocalypse", "Crown of Fallen Hope",
]

const SPELL = [
    "Penance", "Siren's Tear", "Incinerate", "Ice Bolt", "Frostbite", "Divine Glare", "Disarming Winds",
    "Foresight", "Shroud of Chaos", "Igni", "Touch of Lightning", "Healing Rain", "Radiance of Heaven",
    "Inferno", "Risen Tide", "Frost Breath", "Blizzard Shards", "Cyclone", "Chaos Mirror", "Embodiment of Fury",
    "Final Favor", "Headless Vanguard", "Fading Hope", "Avalanche", "Crux of Fate", "No Remorse",
    "Blood Tribute", "Permafrost trap", "Pressure Point", "Divine Intervention", "Eye of the Storm",
    "Font of Life", "Thunderstorm", "Obelisk",
]

export const fixNFTcards = (card: CardDetails) => {
    if (card.race !== "none" && card.type !== "Card") return card

    if (ELEMENTAL.includes(card.name)) card.race = "elemental"
    else if (BEAST.includes(card.name)) card.race = "beast"
    else if (FAIRY.includes(card.name)) card.race = "fairy"
    else if (DRAGON.includes(card.name)) card.race = "dragon"
    else if (TROLL.includes(card.name)) card.race = "troll"
    else if (DEMON.includes(card.name)) card.race = "demon"
    else card.race = "none"

    if (RELIC.includes(card.name)) card.type = "relic"
    else if (SPELL.includes(card.name)) card.type = "spell"
    else card.type = "creature"

    return card
}