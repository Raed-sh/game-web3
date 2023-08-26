import { StaticImageData } from "next/image";
import { useState } from "react";
import Amount from "./Amount";
import { MARKET_ICONS } from "public/images"

interface IBundleItem {
    id: number;
    amount: number;
    title: string;
    price: string;
    img: {
        normal: StaticImageData;
        hover: StaticImageData;
        pressed: StaticImageData;
        preview: StaticImageData;
    };
}

const Bundle = (props: { item: IBundleItem, callback: () => void, maticPrice: number }) => {
    const [activeImage, setActiveImage] = useState(props.item.img.normal);
    const [isHover, setIsHover] = useState(false);

    const processClick = () => {
        setActiveImage(props.item.img.pressed);

        setTimeout(() => {
            setActiveImage(props.item.img.normal)
            props.callback();
        }, 250);
    }

    return <div
        key={`store-bundle-${props.item.id}`}
        className={isHover ? "store-bundle store-bundle-hover" : "store-bundle"}
        onMouseEnter={() => {
            setActiveImage(props.item.img.hover)
            setIsHover(true);
        }}
        onMouseLeave={() => {
            setActiveImage(props.item.img.normal)
            setIsHover(false);
        }}
        onClick={() => processClick()}
    >
        <img className="store-bundle-image" alt='bundle image' src={activeImage.src} />
        <div className="store-bundle-details">
            <Amount text={props.item.title} />

            {props.maticPrice == 0 ? (
                <h2 className="store-bundle-price">${props.item.price}</h2>
            ) : (
                <div className="bundle-price-container">
                    <h2 className="store-bundle-price">{(Number(props.item.price) / props.maticPrice).toFixed(2)}</h2>
                    <img className="polygon-icon" src={MARKET_ICONS.polygon.src}></img>
                </div>
            )}

        </div>
    </div>
}

export default Bundle;