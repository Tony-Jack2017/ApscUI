import Demo from "../../../../components/contents/demo";
import CodeShow from "@apsc/utils/src/code-show";
import {Button, Dialog} from "@apsc/base-react";
import React, {useState} from "react";
import {ButtonClickInterface, ButtonState} from "@apsc/base-react/src/base/Button/Button.types";

const codeString =
  `
  function HelloWorld() {
    return "Hello World !!!"
  }
`

const DialogPage = () => {

  const [ visible, setVisible ] = useState(false)
  const handleOpen: ButtonClickInterface = {
    type: "normal",
    callback:  () => {
      setVisible(true)
    }
  }


  return (
    <div className="table-page">
      <h1>Dialog Component</h1>
      <p>
        As the main call-to-action page element, button has many changes in the interface and style of different websites. As a developer, in order to achieve the effect of UI,
        we need to make many different styles and functions. In our UI tool, we use the button component Achieved a high degree of customization
      </p>
      <h3>
        Basic Dialog
      </h3>
      <p>
        The Basic Button are 3 type button which are "fill", "outline" and "text"
      </p>
      <Demo>
        <CodeShow code={codeString}/>
        <div className="flex-cc" style={{height: "100%"}}>
          <Button onClick={handleOpen}>Click Me</Button>
          <Dialog open={visible}>
            <div style={{background: "white"}}>This is A Dialog</div>
          </Dialog>
        </div>
      </Demo>
    </div>
  )
}

export default DialogPage