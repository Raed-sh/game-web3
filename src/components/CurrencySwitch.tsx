import { CURRENCIES, CurrencyContext, FP_CURRENCIES } from "@/context/CurrencyContext"
import { CURRENCY } from "public/images";
import { useContext, useEffect, useState } from "react";

const CurrencySwitch = (props: {
    type: string,
}) => {
    const { currency, setCurrency } = useContext(CurrencyContext);
    const [view, setView] = useState(false);
    const [hover, setHover] = useState('');

    useEffect(() => {
        if (view) {
            setHover('');
        }
    }, [view])

    useEffect(() => {
        if (props.type == "founder") {
            setCurrency(FP_CURRENCIES[0])
        } else {
            setCurrency(CURRENCIES[0])
        }
    }, [])
    return <>
        <div
            id='currency-switch'
            className={view ? "currency-switch-expanded" : "currency-switch"}
            onClick={() => setView(!view)}
        >
            <img src={currency.image.icon} id="selected-currency-icon" />
            <div className="currency-text">
                <h4>{currency.text}</h4>
                <h5>{currency.subtext}</h5>
            </div>
            <img src={CURRENCY.currDropDown.src} />
        </div>
        {view && <div id="currency-switcher">
            {/* <img src={CURRENCY.currBG.src} id='currency-switcher-bg' /> */}
            {props.type == "founder" ? (FP_CURRENCIES.map((c) => {
                return <div
                    className={`currency-picker ${c.disabled ? "currency-picker-disabled": ""}`}
                    key={c.text}
                    onMouseEnter={() => setHover(c.text)}
                    onMouseLeave={() => setHover('')}
                    onClick={() => {
                        if (!c.disabled) {
                            if (c !== currency) {
                                setCurrency(c);
                                setView(!view)
                            }
                        }
                    }}
                >
                    <img src={c.text === hover ? c.image.menu : c.image.menuNA} className='currency-picker-image' />
                    <div className="currency-picker-text currency-text">
                        <h4>{c.text}</h4>
                        <h5>{c.subtext}</h5>
                    </div>
                </div>
            })) : (CURRENCIES.map((c) => {
                return <div
                    className="currency-picker"
                    key={c.text}
                    onMouseEnter={() => setHover(c.text)}
                    onMouseLeave={() => setHover('')}
                    onClick={() => {
                        if (c !== currency) {
                            setCurrency(c);
                            setView(!view)
                        }
                    }}
                >
                    <img src={c.text === hover ? c.image.menu : c.image.menuNA} className='currency-picker-image' />
                    <div className="currency-picker-text currency-text">
                        <h4>{c.text}</h4>
                        <h5>{c.subtext}</h5>
                    </div>
                </div>
            }))}
        </div>}
    </>
}

export default CurrencySwitch;