import React, {  memo } from "react";
import { IBoosterCard } from "@/utils/CONSTANTS";
import HoveredSection from "./HoveredSection";
import HoveredButton from "./HoveredButton";
import { MARKET_BACKGROUNDS, MARKET_IMGS } from "public/images";
import Image from "next/image";
import { getContainsText } from "@/utils/collection";


const PreviewBoosterCard = (props: {card: IBoosterCard}) => {
    const { title, link, qty, desc, price, bg, hover, collection_bg, collection_bg_hover, blur_bg, onClick} = props.card;

    return (
        <HoveredSection
        bg={bg}
        hovered={hover}
        className="booster_card_p"
      >
        <section >
          <div>
            <h3>{price} <span>AC</span></h3>
            <h4>{qty} {getContainsText(link)}</h4>
          </div>
        <HoveredButton
            bg={MARKET_BACKGROUNDS.explore_bg.src}
            hover={MARKET_BACKGROUNDS.explore_bg_hover.src}
            style={{
              width: "120px",
              height: "60px",
            }}
          >
            <span className="button-title">View</span>
          </HoveredButton>

            </section>
        {/* <section>
          <div>
          <h3>{price} <span>AC</span></h3>
          <h4>{qty} {getContainsText(link)}</h4>
          </div>
        {price &&
          <HoveredButton
            bg={MARKET_BACKGROUNDS.explore_bg.src}
            hover={MARKET_BACKGROUNDS.explore_bg_hover.src}
            style={{
              width: "250px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              gap: "25px",
              paddingLeft: "1rem"
            }}
          >
            <Image src={MARKET_IMGS.coin} alt="" 
              style={{
                marginRight:"1rem"
              }}
            />
            <h5>{price} AC</h5>
          </HoveredButton>
        }
        </section> */}
      </HoveredSection>
    );
};

export default memo(PreviewBoosterCard) ;
