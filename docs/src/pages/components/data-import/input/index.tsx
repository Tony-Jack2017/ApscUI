import {ApscInput} from "@apsc/base-react";
import Demo from "../../../../components/contents/demo";
import CodeShow from "@apsc/utils/src/code-show";

const codeString =
`
  function test() {
    return "Hello World"
  }
`

const InputPage = () => {

    return (
        <div className="container-page input-page">
            <Demo>
                <CodeShow code={codeString} showLine={true}/>
                <div style={{height: "100%"}}>
                    <ApscInput label="Name" placeholder="Please enter some words" />
                </div>
            </Demo>
        </div>
    )
}

export default InputPage