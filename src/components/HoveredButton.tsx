import React, { ButtonHTMLAttributes, CSSProperties, FC, memo, ReactNode, useState } from "react"

interface HOVEREDBUTTON extends ButtonHTMLAttributes<HTMLButtonElement> {
  bg: string
  hover: string
  clicked?: string
  style?: CSSProperties
  title?: string
  children?: ReactNode
}
const fontStyle: CSSProperties = {
  fontFamily: "Medusa Gothic",
  fontWeight: 400,
  fontSize: "14px",
  textAlign: "center",
  color: "#BAB3BB",
  textShadow: "0px 0px 4px #000000",
  position: "relative",
}

const HoveredButton: FC<HOVEREDBUTTON> = ({ bg, hover, clicked, style, title, children, ...props }) => {
  const [background, setBackground] = useState<string | null>(bg)

  return (
    <button
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        position: "relative",
        ...style,
      }}
      onMouseOver={() => setBackground(hover)}
      onMouseLeave={() => setBackground(bg)}
      onMouseDown={() => setBackground(() => (clicked ? clicked : bg))}
      onMouseUp={() => setBackground(bg)}
      {...props}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${hover})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hover !== background ? 0 : 1,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      {title && <span style={fontStyle}>{title}</span>}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children && children}
      </div>
    </button>
  )
}

export default HoveredButton
