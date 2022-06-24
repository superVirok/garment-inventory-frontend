export default {
    menuclass:['teal','item'],
    menus:[
        [
            {
                id:0,
                title:'用户管理',
                iclass:['large','user','icon'],
                path:'/main/system/user'
            },
            {
                id:1,
                title:'货物管理',
                iclass:['large','tshirt','icon'],
                path:'/main/system/goods'
            },
            {
                id:2,
                title:'货物类型',
                iclass:['large','code branch','icon'],
                path:'/main/system/type'
            },
        ],

        [
            {
                id:0,
                title:'入库单管理',
                iclass:['large','warehouse','icon'],
                path:'/main/stock/instock'
            },
            {
                id:1,
                title:'出库单管理',
                iclass:['large','warehouse','icon'],
                path:'/main/stock/outstock'
            },
            {
                id:2,
                title:'入库单明细',
                iclass:['large','warehouse','icon'],
                path:'/main/stock/indetail'
                },
            {
                id:3,
                title:'出库单明细',
                iclass:['large','warehouse','icon'],
                path:'/main/stock/outdetail'
            }
        ],

        [
            {
                id:0,
                title:'修改密码',
                iclass:['large','key','icon'],
                path:'/main/assistance/changePwd'
            },
            {
                id:1,
                title:'帮助信息',
                iclass:['large','question circle','icon'],
                path:'/main/assistance/information'
            }
        ],

        [
            {
                id:0,
                title:'权限授予',
                iclass:['large','user secret','icon'],
                path:'/main/authorization/management'
            }
        ]
    ]

}