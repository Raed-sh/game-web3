import {useState} from 'react';

import copy from "public/images/partners/copy.webp";
import copyHover from "public/images/partners/copy-hover.webp";
import copyPressed from "public/images/partners/copy-pressed.webp";

const CopyButton = (props: {value: string}) => {
    const [img, setImg] = useState(copy)

    const click = () => {
        setImg(copyPressed);
        navigator.clipboard.writeText(props.value)
        setTimeout(() => setImg(copy), 250)
    }

    return <div
        className="copy-wallet"
        style={{
            backgroundImage: `url(${img.src})`,
        }}
        onMouseEnter={() => setImg(copyHover)}
        onMouseLeave={() => setImg(copy)}
        onClick={() => click()}
    />
}

export default CopyButton;