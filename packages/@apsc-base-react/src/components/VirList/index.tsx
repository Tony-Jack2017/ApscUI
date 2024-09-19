import {CSSProperties, forwardRef, ReactElement, useEffect, useState} from "react";

interface ApscVirListItf {
  list: any[]
  fixedItem?: boolean
  children: (item: any, style: CSSProperties) => ReactElement
}

const ApscVirList = forwardRef<HTMLDivElement, ApscVirListItf>((props, ref) => {

  const {
    list, children
  } = props

  const [contentStyle, setContentStyle] = useState<CSSProperties>({
    height: 0, width: 0
  })
  const [virList, setVirList] = useState([])

  useEffect(() => {
    setContentStyle({
      width: "100%",
      height: list.length * 35
    })
  }, [list])

  const handleScroll = () => {

  }

  return (
    <div ref={ref} className="apsc-vir-list">
      <div className="vir-list-viewer" onScroll={handleScroll}>
        <div className="vir-list-content" style={contentStyle}>
          {
            virList.map((item, index) => {
              const itemStyle = { position: "absolute", top: index * 35, left: 0 } as CSSProperties
              return (
                <>
                  { children(item, itemStyle) }
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )

})

export default ApscVirList