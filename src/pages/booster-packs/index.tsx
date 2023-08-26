import BoosterPacksWrapper from "@/components/BoosterPacksWrapper"
import Link from "next/link";
import { BOOSTERS } from "@/utils/CONSTANTS";
import PreviewBoosterCard from "@/components/PreviewBoosterCard";

const BoosterPacks = () => {
    return <BoosterPacksWrapper>
        <div className="bp-container h-[75vh]">
              {BOOSTERS.map((b) => (
                <Link
                  href={`/booster-packs/${b.link}`}
                  key={b.title}
                  style={{
                    cursor: b.title ? "pointer" : "default",
                  }}
                >
                  <PreviewBoosterCard card={b}
                  />
                </Link>
              ))}
            </div>
    </BoosterPacksWrapper>
}

export default BoosterPacks;