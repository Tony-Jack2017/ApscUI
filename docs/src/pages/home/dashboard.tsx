import {
  Menu, Popover, Input, Avatar, List,
  ScrollBar, Icon, Pagination, Dialog
} from "@apsc/base-react";
import "@apsc/style/src/components/popover.less"
import {MenuItemType} from "@apsc/base-react";
import {useRef, useState} from "react";

// @ts-ignore
import Logo from '../../assets/common/logo/logo.png'

const list: MenuItemType[] = [
  {type: "list", itemType: "link", title: "menu1", path: "/dashboard", icon: "bxs-dashboard"},
  {type: "list", itemType: "normal", title: "menu2", icon: "dashboard"},
  {type: "list", itemType: "normal", title: "menu3", icon: "dashboard"},
  {
    type: "list", itemType: "normal", title: "menu4", icon: "dashboard",
    list: [
      {type: "list", itemType: "normal", title: "sub1"},
      {type: "list", itemType: "normal", title: "sub2"},
      {type: "list", itemType: "normal", title: "sub3"},
      {type: "list", itemType: "normal", title: "sub4"},
    ]
  },
  // { type: "list", itemType: "normal", title: "menu5", icon: "dashboard"  },
]


const DashboardPage = () => {

  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement | null>(null)

  const onClose = () => {
    console.log(222)
    setOpen(false)
  }

  return (
    <div className="dashboard-page">
      <div style={{margin: 100, width: 200}}>
        <Menu direction="vertical" menList={list} inline={true}>
        </Menu>
      </div>
      <div style={{margin: 100}}>
        <Pagination total={160} page={0} size={20} />
      </div>
      <div style={{margin: 100}}>
        <button onClick={() => setOpen(true)}>open dialog</button>
        <Dialog open={open} onClose={onClose}>
          Hello World
        </Dialog>
      </div>
    </div>
  )
}

export default DashboardPage