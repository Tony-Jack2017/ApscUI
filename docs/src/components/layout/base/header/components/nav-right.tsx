
import { menuList } from  "../../../../common/menus/hed-nav"
import {NavLink} from "react-router-dom";

const NavRight = () => {
    return (
        <div className="layout-header-right-nav">
            {
                menuList.map(((item, index) => {
                    return (
                        <div className="nav-item" key={index}>
                            {
                                item.isIconItem
                                    ? <i className={`iconfont ${item.icon}`} style={{height:24, width:24}} />
                                    : <div className="nav-item-link">
                                        <NavLink to={item.path}>
                                            {item.name}
                                        </NavLink>
                                      </div>
                            }
                        </div>
                    )
                }))
            }

        </div>
    )
}

export default NavRight