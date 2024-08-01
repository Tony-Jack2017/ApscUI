import Demo from "../../../../components/contents/demo";
import CodeShow from "@apsc/utils/src/code-show";
import {Button} from "@apsc/base-react";

const codeString =
  `
  function HelloWorld() {
    return "Hello World !!!"
  }
`

const MenuPage = () => {
  return (
    <div className="table-page">
      <h1>Menu Component</h1>
      <p>
        As the main call-to-action page element, button has many changes in the interface and style of different websites. As a developer, in order to achieve the effect of UI,
        we need to make many different styles and functions. In our UI tool, we use the button component Achieved a high degree of customization
      </p>
      <h3>
        Basic Menu
      </h3>
      <p>
        The Basic Button are 3 type button which are "fill", "outline" and "text"
      </p>
      <Demo>
        <CodeShow code={codeString}/>
        <div className="flex-cc" style={{height: "100%"}}>
          <Button >Fill Type</Button>
          <Button type="outline">Outline Type</Button>
          <Button type="text">Text Type</Button>
        </div>
      </Demo>
    </div>
  )
}

export default MenuPage