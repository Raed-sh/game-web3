import { UserContext } from "@/context/UserContext"
import { IFounderCard } from "@/utils/CONSTANTS"
import { useContext, useEffect } from "react"
import FounderCard from "./FounderPacks/FounderCard";

const PreviewPackCard = (
    props: {
        card: IFounderCard,
        buttonTitle: string,
        callback?: () => void,
        showButton?: boolean,
    }
) => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <div className="cards">
            <FounderCard card={props.card}>
                <h3>
                    {props.card.title}
                </h3>

                {props.buttonTitle && props.showButton &&
                    <div className="det-btn-wrap" onClick={() => props.callback && props.callback()}>
                        <button className="det-btn" style={{
                            position: 'relative',
                            backgroundImage: `url(${`/images/backgrounds/${props.card.title}-button.webp`})`,
                        }}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${`/images/backgrounds/${props.card.title}-button-hover.webp`})`,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: '100%',
                                    transition: 'all .25s ease',
                                    opacity: 0,
                                    cursor: isLoggedIn ? "pointer" : "not-allowed"
                                }}
                                onMouseOver={(e) => (e.target as any).style['opacity'] = 1}
                                onMouseOut={(e) => (e.target as any).style['opacity'] = 0}
                                onMouseDown={(e) => (e.target as any).style['background-image'] = `url(${`/images/backgrounds/${props.card.title}-button-pressed.webp`})`}
                                onMouseUp={(e) => (e.target as any).style['background-image'] = `url(${`/images/backgrounds/${props.card.title}-button-hover.webp`})`}
                            />
                            <span
                                style={{
                                    cursor: isLoggedIn ? "pointer" : "not-allowed"
                                }}
                            >{props.buttonTitle}</span>
                        </button>
                    </div>
                }
            </FounderCard>
        </div>
    )
}

export default PreviewPackCard