type NavRightMenuProp = {
    icon ?: string
    name ?: string
    path : string
    isIconItem ?: boolean | false
}

const menuList: NavRightMenuProp[] = [
    {
        name: "Develop",
        path: "/develop"
    },
    {
        name: "Components",
        path: "/components"
    },
    {
        icon: "icon-github-fill",
        isIconItem: true,
        path: "https://github.com/Tony-Jack2017/Apsc.git"
    }
]

export {
    menuList
}