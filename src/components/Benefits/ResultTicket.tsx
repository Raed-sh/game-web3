import CorvunRaffle from "public/images/collection/founderpacks/CorvunRaffle.webp"
import GoldenTicket from "public/images/collection/founderpacks/Golden-ticket.webp"
import DeckTicket from "public/images/collection/founderpacks/Deck-expansion-ticket.webp"

const ResultTicket = (props: {benefit: string}) => {
    console.log('TICKET BENEFIT', props.benefit)

    const getTicket = () => {
        switch (props.benefit) {
            case "corvun-raffle-ticket":
                return CorvunRaffle.src
            case "deck-ticket":
                return DeckTicket.src
            default:
                return DeckTicket.src
        }
    }

    const getTicketText = () => {
        if (props.benefit === "corvun-raffle-ticket") {
            return <>
                <h2>1 Legendary Corvun Raffle Ticket</h2>
                <p>
                1 Entrance To A Raffle For 10 Genesis NFTs Of Corvun.
                </p>
                <p>That Also Grant You A Legendary Card For CoE. COE card could be used as a tradable item.</p>
                <img src={GoldenTicket.src} style={{height: "250px", width: "250px"}} />
            </>
        } else {
            return <>
                <h2>Deck expansion ticket</h2>
                <h3>Ability to add +1 deck slot</h3>
                <p>Could be used as a tradable item.</p>
            </>
        }
    }

    return <div id='result-adventurer-preview'>
        <div id='ethernal-description'>
            {getTicketText()}
        </div>
        <div id='cardback-display'>
            <img src={getTicket()} />
        </div>
    </div>
}

export default ResultTicket;