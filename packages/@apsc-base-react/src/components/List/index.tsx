import React, {cloneElement, forwardRef, ReactElement, ReactNode, useEffect, useRef} from "react";
import ListItem from "./item";
import ScrollBar from "../../tools/ScrollBar";

interface ListItf<T> {
  width?: string | number
  height?: string | number
  list?: T[]
  isItemCus?: boolean
  gap?: string
  cusChild?: (item: T, index: number) => ReactNode
  children?: ReactElement[]
}

const List = forwardRef<HTMLDivElement, ListItf<any>>((props, ref) => {
  const {
    gap = "12px",
    width = "100%",
    height = "100%",
    isItemCus = false,
    list ,
    cusChild,
    children
  } = props

  const itemsRef = useRef<HTMLDivElement[]>([])
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('observe');
          }, index * 200); // 每个元素延迟200ms
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: listRef.current, // 使用视口作为根
      rootMargin: '0px',
      threshold: 0.1 // 10% 可见时触发
    });
    itemsRef.current.forEach(item => {
      if (item) { observer.observe(item)}
    });
    listRef.current?.style.setProperty("--gap", gap)
    return () => observer.disconnect();
  }, []);

  const innerStyle = {
    width, height
  }

  return (
    <div ref={listRef} className="apsc-list" style={innerStyle}>
      <ScrollBar direction="vertical">
        {
          children && React.Children.map(children, (child, index) =>
            cloneElement(child, { key: index, ref: (el:HTMLDivElement) => itemsRef.current[index] = el }))
        }
        {
          list && list.map((item, index) => {
            return (
              <ListItem isCus={isItemCus} ref={(el:HTMLDivElement) => itemsRef.current[index + (children ? children.length - 1 : 0)] = el } key={index}>
                {cusChild ? cusChild(item, index) : (<span>Item -- {index}</span>)}
              </ListItem>
            )
          })
        }
      </ScrollBar>
    </div>
  )
})


export default List