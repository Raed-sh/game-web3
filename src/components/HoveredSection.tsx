import React, { CSSProperties, FC, ReactNode, useState } from "react";

interface HOVEREDSECTION {
    bg:string
    hovered: string
    clicked?: string
    className?: string
    style?: CSSProperties
    children?: ReactNode | ReactNode[]
    isDisabled?: boolean
    onClick?: () => void
}

const HoveredSection: FC<HOVEREDSECTION> = ({bg, hovered, clicked=bg, style, className, children, onClick, isDisabled}) => {

    const [bgImg, setBgImg] = useState<string>(bg);


    return (
        <div className={isDisabled ? `hovered-sec-r ${className} disabled-link` : `hovered-sec-r ${className}`} style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            ...style
        }}
            onMouseEnter={() => setBgImg(hovered)}
            onMouseLeave={() => setBgImg(bg)}
            onMouseDown={() => setBgImg(clicked)}
            onMouseUp={() => setBgImg(bg)}
            onClick={onClick}
        >
            <div
                className={`hovered ${(hovered === bgImg) ? 'active' : ''}`}
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: "cover",
                    width: '100%',
                    height: '100%',
                }}
            >
            </div>
            <div style={{
                position:"relative"
            }}>
                {children && children}
            </div>
        
        </div>
    )
}
export default HoveredSection;