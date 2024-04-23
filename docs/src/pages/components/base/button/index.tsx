import Demo from "../../../../components/contents/demo";
import {Button} from "@apsc/base-react";
import CodeShow from "@apsc/utils/src/code-show";

const codeString =
`
  function test() {
    return "Hello World"
  }
`

const ButtonPage = () => {
    return (
        <div className="container-page button-page">
            <h1>Button Component</h1>
            <p>
                As the main call-to-action page element, button has many changes in the interface and style of different websites. As a developer, in order to achieve the effect of UI,
                we need to make many different styles and functions. In our UI tool, we use the button component Achieved a high degree of customization
            </p>
            <h3>
                Basic Button
            </h3>
            <p>
                The Basic Button are 3 type button which are "fill", "outline" and "text"
            </p>
            <Demo>
                <CodeShow code={codeString} showLine={true}/>
                <div className="flex-cc" style={{height: "100%"}}>
                    <Button>Fill Type</Button>
                    <Button type="outline">Outline Type</Button>
                    <Button type="text">Text Type</Button>
                </div>
            </Demo>
            <h3>
                Button Color
            </h3>
            <p>
                You can custom the color of the button for the basic button
            </p>
            <Demo>
                <CodeShow code={codeString} showLine={true}/>
                <div className="flex-cc" style={{height: "100%"}}>
                    <Button color="0, 128, 0">Success</Button>
                    <Button color="255, 0, 0" type="outline">Dangerous</Button>
                    <Button color="255, 165, 0" type="text">Warning</Button>
                </div>
            </Demo>
        </div>
    )
}

export default ButtonPage