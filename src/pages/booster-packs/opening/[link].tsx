import HoveredButton from "@/components/HoveredButton";
import MarketplaceWrapper from "@/components/MarketplaceWrapper";
import Image from "next/image";
import { MARKET_BACKGROUNDS } from "public/images";
import ethernalCard from "public/images/miscs/ethernal-card.png";
import ethernalBg from "public/images/miscs/Ethernal-pack-bg-opening.png";

import earth from "public/images/icons/earth-element.svg";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IBoosterCard } from "@/utils/CONSTANTS";

const Opening: FC = () => {
  const router = useRouter();

  const { link } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [pack, setPack] = useState<IBoosterCard | null>(null);

  const scrollToBottom = () => {
    const body = document.getElementsByClassName("store-bg")[0];
    body.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
    const timeout = setTimeout(() => {
      const vid = document.getElementById("open-vid") as HTMLVideoElement;
      vid.play();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleVideDisc = () => {
    const desc = document.getElementById("vid-desc") as HTMLDivElement;
    desc.style.opacity = "1";
  };

  const handleOpeningVid = () => {
    const open_vid = document.getElementById("open-vid") as HTMLVideoElement;
    const eth_vid = document.getElementById("eth-vid") as HTMLVideoElement;
    open_vid.style.transform = "scale(0)";
    eth_vid.play();
  };

  useEffect(() => {
    if (!link) return;
    (async () => {
      const packResult = await fetch("/api/getBoosterPackByLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: link,
        }),
      }).then((res) => res.json());
      if (packResult.length) {
        setPack(packResult[0]);
      } else {
        router.push("404");
      }
      setLoading(false);
    })();
  }, [link, router]);

  return (
    <MarketplaceWrapper>
      <div className="ethernal-wrapper">
        <div className="ethernals-h">
          <section
            style={{
              background: `url(${pack?.opening_bg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div className="eth-h-cont">
              <h2>{pack?.title}</h2>
              <h3>
                {pack?.qty} {pack?.type}
              </h3>
              <HoveredButton
                bg={MARKET_BACKGROUNDS.explore_bg.src}
                hover={MARKET_BACKGROUNDS.explore_bg_hover.src}
                title="Opening"
                style={{
                  width: "230px",
                  height: "52px",
                }}
              />
            </div>
            <Image src={pack?.opening_pack!} alt="" />
          </section>
        </div>
        <div className="eth-vid">
          {/* why is this permanently set to stonewing? */}
          <video
            src={require("public/videos/ethernals/Konunth.webm")}
            muted
            onEnded={handleVideDisc}
            id="eth-vid"
          />
          {/* this video is exclusive to ethernals opening */}
          <video
            src={require("public/videos/ethernals-box-reveal.webm")}
            muted
            onEnded={handleOpeningVid}
            id="open-vid"
          />
          <div id="vid-desc">
            {/* why the fuck are these hardcoded in ??? */}
            <Image src={earth} alt="" />
            <h4>Konynth</h4>
            <h5>Dragon</h5>
            <p>Elemental creature of Earth</p>
            <span>Basic</span>
          </div>
        </div>
      </div>
    </MarketplaceWrapper>
  );
};

export default Opening;
