import Link from "next/link";
import { FOUNDERPACKS, WEB3_FOUNDERPACKS } from "@/utils/CONSTANTS";
import PreviewPackCard from "@/components/PreviewPackCard";
import DeluxePacksWrapper from "@/components/DeluxePacksWrapper";
import { AssetContext, AssetTypes } from '@/context/AssetsContext';
import React, { useContext } from 'react';
import CurrencySwitch from "@/components/CurrencySwitch";

const FounderPacks = () => {
  const { assetType, setAssetType } = useContext(AssetContext);

  return <DeluxePacksWrapper>
    {assetType == AssetTypes.plain ? (
      <ul className="flex justify-evenly items-center h-[75vh] w-full">
        {Object.keys(FOUNDERPACKS).map((f) => {
          return (
            <Link key={f} href={`/premium-packs/${f}`}>
              <PreviewPackCard card={FOUNDERPACKS[f]} buttonTitle="Details" showButton={true} />
            </Link>
          );
        })}
      </ul>
    ) : (
      <>
        <ul className="flex justify-evenly items-center h-[75vh] w-full">
          <Link key={WEB3_FOUNDERPACKS.founder} href={`/premium-packs/web3/founderPack`}>
            <PreviewPackCard card={WEB3_FOUNDERPACKS.founder} buttonTitle="Details" showButton={true} />
          </Link>
        </ul>
      </>
    )}
  </DeluxePacksWrapper>
}

export default FounderPacks;