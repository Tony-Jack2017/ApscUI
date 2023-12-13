import {FC} from "react";

export type CodeShowProps = {
  code: string
  showLine?: boolean
}

export type CodeFilterProps = {
  codeItem: string
}

function getCodeInfo(code:string) {
  const codeInfo = code.split("\n")
  return codeInfo
}


const CodeFilter:FC<CodeFilterProps> = (props) => {
  const { codeItem } = props
  return (
    <code className="code-item">
      {
        codeItem.split(" ").map((item, index) => {
          return item == ""
            ? `\u00A0`
            : (
              <span key={index}>
                {`\u00A0`}
                 {item}
              </span>
            )
        })
      }
    </code>
  )
}

const CodeShow:FC<CodeShowProps> = (props) => {
  const {
    code ,
    showLine = false
  } = props
  return (
    <pre>
      {
        getCodeInfo(code).map((item, index) => {
          return (
            <p key={index}>
              { showLine && <span>{index}</span> }
              <CodeFilter codeItem={item} />
            </p>
          )
        })
      }
    </pre>
  )
}


export default CodeShow
