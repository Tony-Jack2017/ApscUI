import {FC, ReactElement, useState} from "react";

export type DemoProps = {
    children: ReactElement[]
}

const Demo:FC<DemoProps> = (props) => {
    const { children } = props
    const [codeVisible, setCodeVisible] = useState(false)
    const handleShowCode = () => {
        setCodeVisible(!codeVisible)
    }
    return (
        <div className="apsc-demo-box">
            <div className="demo-box-header">
                <i className="iconfont icon-code" style={{fontSize: '16px'}} onClick={handleShowCode} />
            </div>
            <div className="demo-box-content">
                <div className={`demo-box-code ${codeVisible ? 'demo-box-code_show' : 'demo-box-code_hide'}`}>
                    {children[0]}
                </div>
                <div className="demo-box-show">
                    {children[1]}
                </div>
            </div>
            <div className="demo-box-footer">
                <i className="iconfont icon-code" style={{fontSize: '16px'}} onClick={handleShowCode} />
            </div>
        </div>
    )
}

export default Demo