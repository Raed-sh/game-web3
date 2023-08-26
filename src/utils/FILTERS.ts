import { ALL } from "dns";
import { StaticImageData } from "next/image";
import { COLLECTION } from "public/images"

export interface FilterEntry {
    title: string;
    images: {
        active: StaticImageData,
        inactive: StaticImageData,
    }
}

export const cardsFilterTitles = {
    all: "all",
    legendary: "legendary",
    epic: "epic",
    rare: "rare",
    uncommon: "uncommon",
    common: "common",
    basic: "basic",
}

export const elementFilterTitles = {
    all: "all",
    air: "air",
    chaos: "chaos",
    earth: "earth",
    fire: "fire",
    ice: "ice",
    light: "light",
    nature: "nature",
    thunder: "thunder",
    water: "water"
}

export const elementFilters = [
    {
        title: elementFilterTitles.all,
        images: COLLECTION.categories.all,
    },
    {
        title: elementFilterTitles.air,
        images: COLLECTION.element.air,
    },
    {
        title: elementFilterTitles.chaos,
        images: COLLECTION.element.chaos,
    },
    {
        title: elementFilterTitles.earth,
        images: COLLECTION.element.earth,
    },
    {
        title: elementFilterTitles.fire,
        images: COLLECTION.element.fire,
    },
    {
        title: elementFilterTitles.ice,
        images: COLLECTION.element.ice,
    },
    {
        title: elementFilterTitles.light,
        images: COLLECTION.element.light,
    },
    {
        title: elementFilterTitles.nature,
        images: COLLECTION.element.nature,
    },
    {
        title: elementFilterTitles.thunder,
        images: COLLECTION.element.thunder,
    },
    {
        title: elementFilterTitles.water,
        images: COLLECTION.element.water,
    },
];

export const cardsFilters = [
    {
        title: cardsFilterTitles.all,
        images: COLLECTION.categories.all,
    },
    {
        title: cardsFilterTitles.legendary,
        images: COLLECTION.categories.legendary,
    },
    {
        title: cardsFilterTitles.epic,
        images: COLLECTION.categories.epic,
    },
    {
        title: cardsFilterTitles.rare,
        images: COLLECTION.categories.rare,
    },
    {
        title: cardsFilterTitles.uncommon,
        images: COLLECTION.categories.uncommon,
    },
    {
        title: cardsFilterTitles.common,
        images: COLLECTION.categories.common,
    },
    {
        title: cardsFilterTitles.basic,
        images: COLLECTION.categories.basic,
    },
];

export const ViewType = {
    ALL: "all",
    NFT: "nft",
    WEB2: "web2",
};