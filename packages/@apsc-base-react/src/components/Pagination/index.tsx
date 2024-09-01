import {forwardRef, ReactNode} from "react";
import classNames from "classnames";
import Icon from "../../tools/Icon";
import {useImmerReducer} from "use-immer";

interface PaginationItf {
  type?: "normal" | "test"
  total: number
  page: number
  size: number
  prefix?: ReactNode
  suffix?: ReactNode
}

const pageReducer = (draft: any, action: any) => {

  switch (action.type) {
    case "pre" :
      draft.page -= 1;
      break;
    case "next" :
      draft.page += 1;
      break;
    case "num":
      draft.page = action.payload.num;
      break;
  }
}

const Pagination = forwardRef<HTMLDivElement, PaginationItf>((props, ref) => {

  const {
    type = "normal",
    total,
    page,
    size,
    prefix, suffix
  } = props

  const maxNum = Array.from({length: (total / size)}, (_, index) => index + 1);

  const [pageState, dispatch] = useImmerReducer(pageReducer, {
    page: page
  })

  const preClasses = classNames([
    "prefix",
    {"prefix-disable": pageState.page >= maxNum.length}
  ])
  const sufClasses = classNames([
    "suffix"
  ])
  const classes = classNames([
    "apsc-pagination",
    `pagination-type-${type}`,
    {"prefix-disable": pageState.page <= 1}
  ])

  const handleClick = (type: string, index?: number) => {
    if (type !== "num") {
      dispatch({type: type})
    } else {
      dispatch({type: type, payload: {num: index}})
    }
  }

  return (
    <div className={classes}>
      <div className={preClasses}>
        {
          prefix
            ? prefix
            : (
              <div
                className={preClasses}
                onClick={() => {
                  if (pageState.page - 1 >= 0) {
                    handleClick("pre")
                  }
                }}>
                <Icon icon="bx-chevron-left"/>
              </div>
            )
        }
      </div>
      <div className="content">
        {
          maxNum.map((item, index) => {
            return (
              <div
                key={index}
                className={classNames([
                  "page-item",
                  {"page-item-active": index === pageState.page},
                  {"page-item-inactive": index !== pageState.page}
                ])}
                onClick={() => handleClick("num", index)}>
                {index + 1}
              </div>
            )
          })
        }
      </div>
      <div className={sufClasses}>
        {suffix
          ? suffix
          : (
            <div
              className={sufClasses}
              onClick={() => {
                if (pageState.page + 1 < maxNum.length) {
                  handleClick("next")
                }
              }}>
              <Icon icon="bx-chevron-right"/>
            </div>
          )
        }
      </div>
    </div>
  )
})

export default Pagination