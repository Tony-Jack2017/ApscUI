import {Outlet} from "react-router-dom";

const App = () => {
  return (
    <div id="app" style={{ display: "flex" }}>
      <Outlet />
    </div>
  )
}

export default App
