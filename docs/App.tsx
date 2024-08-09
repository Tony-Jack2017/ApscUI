
import WrapPortal from "@apsc/base-react/src/tools/Potarl";
import {useState} from "react";

const App = () => {

  const [state, setState] = useState(false)

  const handleClose = () => {
    setState(false)
  }

  return (
    <div id="app">
      <button onClick={() => {setState(pre => !pre)}}>Click Me</button>
      <WrapPortal show={state} onClose={handleClose} >
        <div style={{ width: 100, height: 100, backgroundColor: "white"}}>
        </div>
      </WrapPortal>
    </div>
  )
}

export default App