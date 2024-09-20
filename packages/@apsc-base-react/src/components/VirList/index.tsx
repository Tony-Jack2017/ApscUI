import {CSSProperties, forwardRef, Fragment, ReactElement, useEffect, useState} from "react";

interface ApscVirListItf {
  height: number,
  list: any[]
  fixedItem?: boolean
  children: ({item, style}:{item: any, style: CSSProperties}) => ReactElement
}

const VirList = forwardRef<HTMLDivElement, ApscVirListItf>((props, ref) => {

  const {
    height, list, children
  } = props

  const [contentStyle, setContentStyle] = useState<CSSProperties>({
    height: 0, width: 0
  })
  const [offset, setOffset] = useState({
    start: 0,
    end: Math.ceil(height / 35)
  })
  const [virList, setVirList] = useState(list.slice(offset.start, offset.end))


  useEffect(() => {
    setContentStyle({
      width: "100%",
      height: list.length * 35
    })
  }, [list])

  const handleScroll = () => {
  }

  const innerStyle = {
    width: "100%",
    height: height
  }

  return (
    <div ref={ref} className="apsc-vir-list" style={innerStyle}>
      <div className="vir-list-container" onScroll={handleScroll}>
        <div className="vir-list-content" style={contentStyle}>
          {
            virList.map((item, index) => {
              const itemStyle = { backgroundColor: index % 2 === 0 ? "white" : "red", position: "absolute", top: index * 35, left: 0, width: "100%", textAlign: "center", height: 35 } as CSSProperties
              return (
                <Fragment key={index}>
                  { children({item, style:itemStyle}) }
                </Fragment>
              )
            })
          }
        </div>
      </div>
    </div>
  )

})

export default VirList
