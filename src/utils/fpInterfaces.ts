import { IAdventurersInformation } from "@/components/Adventurer";
import { CardDetails } from "@/components/Card";

export interface ICard {
    attack: number;
    circulation: number;
    description: string;
    element: "nature";
    hp: number;
    id: string;
    mana: number;
    name: string;
    race: string;
    rarity: string;
    season: number;
    type: string;
}

export interface IAdventurer {
    effect: string;
    element: string;
    id: string;
    name: string;
}

export interface IEthernal {
    _id?: string;
    description: string;
    id: string;
    name: string;
    rarity: string
}

export interface IPack {
    id: string;
    type: string;
    count: number;
}

export interface ICardBack {
    id: string;
    type: string;
    count: number;
}

export interface IOpeningResult {
    basic?: CardDetails[]
    common: ICard[] | CardDetails[]
    uncommon?: CardDetails[]
    founder: ICard[] | CardDetails[]
    adventurer: IAdventurer[] | IAdventurersInformation
    ethernal: IEthernal[]
    emote?: IPack[]
    cardBack?: ICardBack[]
}
