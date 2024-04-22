import Sidebar from "../../components/layout/base/sidebar";

export type NavRightMenuProp = {
    icon ?: string
    name ?: string
    path : string
    isIconItem ?: boolean | false
}


export interface SidebarMenuProp {
    id: string
    icon ?: string
    title : string
    isGroup ?: boolean | false
    path ?: string
    children ?: CompMenuProp[]
}

export interface CompMenuProp extends SidebarMenuProp {
    tag ?: string
}

export interface DevelopMenuProp extends SidebarMenuProp {
    tag ?: string
}

export const NrMenuList: NavRightMenuProp[] = [
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
    },
    {
        icon: "icon-sun-fill",
        isIconItem: true,
        path: "/"
    }
]

export const CompMenuList: CompMenuProp[]  = [
    {
        id: "0",
        title: "Base Components",
        isGroup: true,
        children: [
            {
                id: "0-1",
                title: "Button",
                path: "/components/base/button"
            },
            {
                id: "0-2",
                title: "Switch",
                path: "/components/base/switch"
            }
        ]
    },
    {
        id: "1",
        title: "Data Display",
        isGroup: true,
        children: [
            {
                id: "1-1",
                title: "List",
                path: "/components/display/list"
            },
            {
                id: "1-2",
                title: "Table",
                path: "/components/display/table"
            }
        ]
    },
    {
        id: "2",
        title: "Data Import",
        isGroup: true,
        children: [
            {
                id: "2-1",
                title: "Input",
                path: "/components/import/input"
            },
            {
                id: "2-2",
                title: "Select",
                path: "/components/import/select"
            }
        ]
    }
]

export const DevelopMenuList: DevelopMenuProp[]  = [
    {
        id: "0",
        title: "Apsc Design",
        isGroup: true,
        children: [
            {
                id: "0-1",
                title: "Color",
                path: "/develop/design/color"
            },
            {
                id: "0-2",
                title: "Font",
                path: "/develop/design/font"
            }
        ]
    },
]
