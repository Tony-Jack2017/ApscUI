import {
  Menu, Popover, Input, Avatar, List,
  ScrollBar, Icon, Pagination, Dialog, AvatarGroup, Progress, Divider
} from "@apsc/base-react";
import "@apsc/style/src/components/popover.less"
import {MenuItemType} from "@apsc/base-react";
import {useEffect, useRef, useState} from "react";

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

const avatarList = [
  Logo, Logo, Logo, Logo, Logo
]

const DashboardPage = () => {

  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const [percent, setPercent] = useState(0)

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    let timer = setInterval(() => {
      if(percent <= 100) {
        setPercent(pre => ((pre + 10) >= 100) ? 100 : pre += 10)
      }else {
        clearInterval(timer)
      }
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [percent])

  return (
    <div className="dashboard-page">
      <div style={{margin: 100, width: 200}}>
        <Icon icon="bx-left-arrow-alt" style={{ fontSize: 20 }} haveBg={true} activeBg="green" activeColor="white" />
      </div>
      <div style={{margin: 100}}>
        <Pagination total={160} page={0} size={20} />
      </div>
      <div style={{margin: 100, width: 300}}>
        <Divider contentPos="start" content={<span>OR</span>} />
      </div>
      <div style={{margin: 100}}>
        <AvatarGroup size="small" list={avatarList} />
      </div>
      <div style={{margin: 100, width: 300}}>
        <Progress type="square" percent={percent} />
      </div>
    </div>
  )
}

export default DashboardPage