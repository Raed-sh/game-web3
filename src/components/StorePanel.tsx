import { useState } from "react"
import { useRouter } from "next/router"

export interface IStorePanel {
  title: string
  image: {
    normal: string
    hover: string
    pressed: string
  }
  active: boolean
  href: string
}

const TRANSFER_DELAY = 150

const StorePanel = (props: { item: IStorePanel }) => {
  const [hover, setHover] = useState(false)
  const [click, setClick] = useState(false)
  const router = useRouter()

  const identifier = `store-panel-${props.item.title.replace(" ", "-").toLowerCase()}`

  const handleClick = () => {
    setClick(true)
    setTimeout(() => {
      router.push(props.item.href)
    }, TRANSFER_DELAY)
  }

  return (
    <div
      id={identifier}
      key={identifier}
      className="store-panel"
      onClick={() => handleClick()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={click ? props.item.image.pressed : hover ? props.item.image.hover : props.item.image.normal}
        className="store-panel-image"
      />
      <div className="store-panel-text"><h3>{props.item.title}</h3></div>
    </div>
  )
}

export default StorePanel
