import {FC, Fragment} from "react";
import "./index.less"
import dedent from 'dedent'
import {highlight, languages} from "prismjs";
import 'prismjs/components/prism-jsx'



export type CodeShowProps = {
  code: string
  showLine?: boolean
}

export type CodeFilterProps = {
  codeItem: string
}

function handleCodeInfo(code:string) :string {
  const codeStr = dedent(code)
  console.log(highlight(codeStr, languages.jsx!, 'jsx'))
  return highlight(codeStr, languages.jsx!, 'jsx')
}


const CodeFilter:FC<CodeFilterProps> = (props) => {
  const { codeItem } = props
  return (
    <code className="code-item">
      {
        codeItem.split(/\s+/).map((item, index) => {
          return (
              <span key={index}>
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
      <pre className="code-show" dangerouslySetInnerHTML={ { __html: handleCodeInfo(code) } }>
      {
        // handleCodeInfo(code).split("\n").map((item, index) => {
        //   return (
        //       <Fragment key={index}>
        //         {item}
        //       </Fragment>
        //   )
        // })

      }
    </pre>
  )
}


export default CodeShow
