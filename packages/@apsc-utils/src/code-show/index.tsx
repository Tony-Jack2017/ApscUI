import {FC} from "react";
import "./index.less"
import dedent from 'dedent'
import {highlight, languages} from "prismjs";
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css';

export type CodeShowProps = {
    code: string
    showLine?: boolean
}
export type CodeFilterProps = {
    codeItem: string
}

function handleCodeInfo(code: string): (string) {
    return highlight(dedent(code), languages.jsx!, 'jsx')
}
const CodeShow: FC<CodeShowProps> = (props) => {
    const {
        code,
        showLine = false
    } = props

    const codeArr = handleCodeInfo(code).split(/\n/)
    return (
        <code>
            <pre className="code-show">
                {
                    codeArr.map((item, index) => {
                        return (
                            <div className="code-item" key={index}>
                                { showLine ? <span className="line-number">{index + 1}</span> : null }
                                <div className="item-content" dangerouslySetInnerHTML={{__html: item}}></div>
                            </div>
                        )
                    })
                }
            </pre>
        </code>
    )
}

export default CodeShow
