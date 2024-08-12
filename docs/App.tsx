
import {useRef, useState} from "react";
import {Popover, Menu, SubMenu} from "@apsc/base-react";
import "@apsc/style/src/components/popover.less"

const App = () => {

  const [state, setState] = useState({
    index: 0,
    open: false
  })

  const handleClose = () => {
    setState(pre => (
      {
        ...pre,
        open: false
      }
    ))
  }

  const trigger = useRef<(HTMLButtonElement| null)[]>([])



  return (
    <div id="app">

      <div style={{ margin:300, width: 200 }}>
        <Menu direction="horizontal">
          <SubMenu>
          </SubMenu>
          <SubMenu>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default App