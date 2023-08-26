import closeIcon from 'public/images/partners/cancel.webp';
import closeIconHover from 'public/images/partners/cancel-hover.webp';
import closeIconPressed from 'public/images/partners/cancel-pressed.webp';
import { useState } from 'react';

const CloseButton = (props: {callback: () => void}) => {
    const [img, setImg] = useState(closeIcon);

    const click = () => {
        setImg(closeIconPressed);
        setTimeout(() => props.callback(), 250)
    }

    return <div
        className='cursor-pointer'
        onClick={() => click()}
        onMouseEnter={() => setImg(closeIconHover)}
        onMouseLeave={() => setImg(closeIcon)}
        style={{
            backgroundImage: `url(${img.src})`,
            height: "15px",
            width: "15px",

        }}
    ></div>
}

export default CloseButton;