
import {Menu} from "@apsc/base-react";
import "@apsc/style/src/components/popover.less"
import {ItemType} from "@apsc/base-react/src/components/Menu";

const list:ItemType[] = [
  { type: "list", itemType: "normal", title: "menu1" },
  { type: "list", itemType: "normal", title: "menu2" },
  { type: "list", itemType: "normal", title: "menu3" },
  {
    type: "list", itemType: "normal", title: "menu1",
    list: [
      { type: "list", itemType: "normal", title: "sub1" },
      { type: "list", itemType: "normal", title: "sub2" },
      { type: "list", itemType: "normal", title: "sub3" },
      { type: "list", itemType: "normal", title: "sub4" },
    ]
  },
]

const App = () => {

  return (
    <div id="app">
      <div style={{ margin:300, width: 200 }}>
        <Menu direction="horizontal" list={list}>
        </Menu>
      </div>
    </div>
  )
}

export default App