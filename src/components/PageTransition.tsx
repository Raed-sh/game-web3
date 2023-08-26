import Image, { StaticImageData } from "next/image"
import React, { FC, useEffect, useRef, VideoHTMLAttributes } from "react"



export const PageTransition = () => {
  const tn = useRef<HTMLDivElement | null>(null)
  const handleTransition = () => {
    if (tn.current){
     tn.current!.style.display = "none"
    }
  }

  useEffect(() => {
    if (!tn) return
    const interval = setInterval(handleTransition, 1000)
    return () => clearInterval(interval)
  }, [tn])

  return (
    <div className="transition-wrapper" ref={tn} id="transition-wrapper">
      <div className="video-transition">
        <div>
          {/* <Image src={props.icon} alt="" width={100} height={100} /> */}
          <h1>Loading</h1>
        </div>
      </div>
    </div>
  )
}
