import { MARKET_IMGS } from "public/images";
import { useEffect, useState } from "react";
import Image from "next/image";

const BoosterCardPreview = (props: {index: number}) => {
    const [showImage, setShowImage] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);

    useEffect(() => {
        // if you wish to play videos one by one, uncomment the timeout
        // setTimeout(() => setAutoPlay(true), 3000 * props.index)
        setAutoPlay(true)
    }, [props.index])

    return <div key={`booster-card-preview-${props.index}`} className="booster-opening-card-center">
        {showImage && 
            <Image
                src={MARKET_IMGS.card_act}
                alt=""
                className='booster-opening-card'
            />
        }
        {!showImage && 
            <video
            id={`shine-${props.index}`}
            className='booster-opening-video'
            src={require("public/videos/card-shine.webm")}
            muted
            controls={false}
            // in current configuration all videos are playing at once - this subjectively looks better than
            // them playing one by one
            autoPlay={autoPlay}
            onEnded={() => setShowImage(true)}
            />
        }
  </div>
}

export default BoosterCardPreview;