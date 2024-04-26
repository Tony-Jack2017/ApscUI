import Demo from "../../../../components/contents/demo";
import Switch from "@apsc/base-react/src/base/Switch/Switch";
import {useState} from "react";
import CodeShow from "@apsc/utils/src/code-show";

const codeString =
`
  function test() {
    return "Hello World"
  }
`

const SwitchPage = () => {

    const [checked, setChecked] = useState(false)
    const handleClick = () => {
        setChecked(!checked)
    }

    return (
        <div className="container-page switch-page">
            <h1>Switch Component</h1>
            <h3>
                Basic Switch
            </h3>
            <Demo>
                <CodeShow code={codeString}/>
                <div className="flex-cc" style={{height: "100%"}}>
                    <Switch isChecked={checked} onClick={handleClick} />
                    <Switch type="outside"/>
                </div>
            </Demo>
        </div>
    )
}

export default SwitchPage
