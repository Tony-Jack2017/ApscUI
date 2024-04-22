import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";
import {SidebarMenuProp} from "../../../../common/menus";

interface CompSidebarProp {
    list: SidebarMenuProp[]
}

const CompSidebar:React.FC<CompSidebarProp> = (props) => {

    const { list } = props

  return (
    <div className="comp-sidebar">
      <div className="comp-sidebar-header">
      </div>
      <div className="comp-sidebar-content">
        <div className="sidebar-content-menu">
          {
            list.map((item, index) => {
              return (
                <Fragment key={index}>
                  {
                    item.isGroup
                      ?
                      <div className="menu-item-group">
                        <div className="item-group-title">
                          {item.title}
                        </div>
                        <div className="item-group-list">
                          {
                            item.children!.map((child, indexChild) => {
                              return (
                                <NavLink className="menu-item link-button" to={child.path as string} key={indexChild}>
                                  {child.title}
                                </NavLink>
                              )
                            })
                          }
                        </div>
                      </div>
                      :
                      <NavLink className="menu-item link-button" to={item.path as string}>
                        {item.title}
                      </NavLink>
                  }
                </Fragment>
              )
            })
          }
        </div>
      </div>
      <div className="comp-sidebar-header">
      </div>
    </div>
  )
}

export default CompSidebar
