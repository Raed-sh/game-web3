import card_wrap from "public/images/layout/fb/card-wrap.png";
import Image from "next/image";
import arrow from "public/images/icons/arrow.svg";
import { CSSProperties, FC, useState } from "react";
import SoulBound from "./FounderPacks/SoulBound";

 interface IBENEFIT {
    id: number;
    bg: string;
    desc: string;
    style?: CSSProperties;
    className?: string;
  }

const BenefitCard: FC<IBENEFIT> = ({ id, bg, desc, style, className }) => {
    const isSoulbound = desc.includes('Deluxe Tier ')
    return (
      <div
        className={`fb-card-wrapper ${className}`}
        style={{
          backgroundImage: `url(${card_wrap.src})`,
          backgroundSize: "100% 100%",
          ...style,
        }}
      >
        <div className="purchase-num-card">
            <h1>{id}</h1>
        </div>
        <div
          className="body-card"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          <h4>{desc}</h4>
          <div className="benefit-card-soulbound">
            {isSoulbound && <SoulBound />}
          </div>
        </div>
      </div>
    );
  };

const CardCarousel: FC<any> = (props: { benefits: IBENEFIT[] }) => {
  const [cards, setCards] = useState(props.benefits);

  const ScrollCards = (dir: string) => {
    var _temp = [...cards] as any;
    if (dir === "right") {
      _temp.push(_temp.shift());
    } else {
      _temp.unshift(_temp.pop());
    }
    setCards(_temp);
  };

  return (
    <div className="card-carousel">
      <div className="controls-carousel">
        <Image src={arrow} alt="arrow" onClick={() => ScrollCards("left")} />
          {props.benefits.length > 3 && (
            <>
              {props.benefits.length === 5 && <h3>Displaying 4 Benefits from {props.benefits.length}</h3>}
              {props.benefits.length === 7 && <h3>Displaying 5 Benefits from {props.benefits.length}</h3>}
            </>
          )}
        <Image src={arrow} alt="arrow" onClick={() => ScrollCards("right")} />
      </div>
      <div className="carousel-cont">
        {cards.map((benefit: IBENEFIT, idx: number) => {
          return (
            <BenefitCard
              key={benefit.id}
              {...benefit}
              className={
                idx === 4 ? "last-card r" : idx === 5 ? "last-card l" : ""
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardCarousel;