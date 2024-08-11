
import {useRef, useState} from "react";
import {Popover} from "@apsc/base-react";
import "@apsc/style/src/components/popover.less"

const App = () => {

  const [state, setState] = useState(false)

  const handleClose = () => {
    setState(false)
  }

  const trigger = useRef<HTMLButtonElement | null>(null)

  return (
    <div id="app">
      <button style={{margin: 200}} onClick={() => {setState(pre => !pre)}}>Click Me1</button>
      <button ref={trigger} style={{margin: 300}} onClick={() => {setState(pre => !pre)}}>Click Me2</button>
      <Popover open={state} anchorEl={trigger.current as HTMLElement} >
        <div style={{backgroundColor: "red"}}>
          Hello World
        </div>
      </Popover>
    </div>
  )
}

export default App