import {ApscInput} from "@apsc/base-react";
import Demo from "../../../../../components/contents/demo";
import Code from "../../../../../components/contents/code";

const InputPage = () => {
    return (
        <div className="container-page input-page">
            <Demo>
                <Code />
                <div style={{height: "100%"}}>
                    <ApscInput label="Name" placeholder="Please enter some words" />
                </div>
            </Demo>
        </div>
    )
}

export default InputPage