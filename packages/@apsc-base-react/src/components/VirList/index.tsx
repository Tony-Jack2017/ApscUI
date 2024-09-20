import React, {CSSProperties, forwardRef, Fragment, ReactElement, UIEventHandler, useEffect, useState} from "react";

interface ApscVirListItf {
  height: number,
  list: any[]
  fixedItem?: boolean
  gap: number
  children: ({item, style}:{item: any, style: CSSProperties}) => ReactElement
}

const VirList = forwardRef<HTMLDivElement, ApscVirListItf>((props, ref) => {

  const {
    height, gap = 0, list, children
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
      height: ((list.length) * (35 + gap) - gap)
    })
  }, [list])

  useEffect(() => {
    setVirList(list.slice(offset.start, offset.end))
  }, [offset])

  const handleScroll= (event: React.UIEvent<HTMLDivElement>) => {
    if(event.currentTarget) {
      const scrollTop = event.currentTarget.scrollTop
      setOffset({
        start: Math.floor(scrollTop / (35 + gap)),
        end: Math.ceil((height + scrollTop) / (35 + gap))
      })
    }
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
              return (
                <Fragment key={index}>
                  {
                    children({
                      item,
                      style:{
                        backgroundColor: (index + offset.start) % 2 === 0 ? "red" : "green",
                        position: "absolute",
                        top: ((index + offset.start) * (35 + 10)),
                        left: 0,
                        width: "100%",
                        textAlign: "center",
                        height: 35
                      }
                    })
                  }
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
