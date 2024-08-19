
import {Menu, Popover, Input} from "@apsc/base-react";
import "@apsc/style/src/components/popover.less"
import {ItemType} from "packages/@apsc-base-react/src/components/Menu/types/menu";
import {useRef, useState} from "react";

const list:ItemType[] = [
  { type: "list", itemType: "normal", title: "menu1", icon: "dashboard" },
  { type: "list", itemType: "normal", title: "menu2", icon: "dashboard"  },
  { type: "list", itemType: "normal", title: "menu3", icon: "dashboard"  },
  {
    type: "list", itemType: "normal", title: "menu4", icon: "dashboard",
    list: [
      { type: "list", itemType: "normal", title: "sub1" },
      { type: "list", itemType: "normal", title: "sub2" },
      { type: "list", itemType: "normal", title: "sub3" },
      { type: "list", itemType: "normal", title: "sub4" },
    ]
  },
  // { type: "list", itemType: "normal", title: "menu5", icon: "dashboard"  },
]

const App = () => {

  const [open, setOpen] = useState(false)
  const trigger =  useRef<HTMLButtonElement | null>(null)

  return (
    <div id="app">
      <div style={{ margin:100, width: 200 }}>
        <Menu direction="vertical" menList={list} inline={true}>
        </Menu>
      </div>
      <div>
        <button ref={trigger} style={{margin: 100}} onClick={() => {setOpen(true)}}>Click Me</button>
        <Popover open={open}
                 anchorEl={trigger.current} onClose={() => { setOpen(false) }}>
          This is Test
        </Popover>
      </div>
      <div style={{margin: 100}}>
        <Input name="username" />
      </div>
    </div>
  )
}

export default App
