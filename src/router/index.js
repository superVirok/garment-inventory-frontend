//该文件用于创建整个应用的路由

import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../components/Login'
import Main from '../components/Main'
import Index from '../components/Index'
import Content from '../components/Content'
import user from '../table/user'
import goods from '../table/goods'
import type from '../table/type'
import stock from '../table/stock'
import stockDetail from '../table/stockDetail'
import info from '../table/info'
import auth from '../table/auth'
import changePwd from '../form/changePwd'


//创建一个路由器
const router = createRouter({
    linkActiveClass:'active',
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:Login
        },
        {
            path:'/index',
            name:'index',
            component:Index,
            meta:{isAuth:true,title:'主页'},
                 beforeEnter: (to, from, next) => {
                    if(to.meta.isAuth){ //判断是否需要鉴权
                        let userInfo = sessionStorage.getItem('userInfo')
                        if(userInfo !== null){
                            next()
                        }else{
                            alert('请先登录')
                        }
                    }else{
                        next()
                    }
                } 
        },
        {
            path:'/main',
            name:'main',
            component:Main,
            children:[
                {
                    path:'system',
                    component:Content,
                    children:[
                        {
                            name:'user',
                            path:'user',
                            component:user,
                            meta:{isAuth:true,title:'用户管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if(userInfo.user.userRole === 0 ||userInfo.userAuthorization === 2){
                                       next()
                                   }else{
                                       alert('您没有用户管理权限,请让管理员授予权限')
                                   }
                               }else{
                                   next()
                               }
                           } 
                        },
                        {
                            name:'goods',
                            path:'goods',
                            component:goods,
                            meta:{isAuth:true,title:'货物管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if(userInfo.user.userRole === 0 || userInfo.goodsAuthorization === 2){
                                       next()
                                   }else{
                                       alert('您没有货物管理权限,请让管理员授予权限')
                                   }
                               }else{
                                   next()
                               }
                           }  
                        },
                        {
                            name:'type',
                            path:'type',
                            component:type,
                            meta:{isAuth:true,title:'货物类型管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if( userInfo.user.userRole === 0 || userInfo.goodsAuthorization === 2){
                                       next()
                                   }else{
                                       alert('您没有货物类型管理权限,请让管理员授予权限')
                                   }
                               }else{
                                   next()
                               }
                           } 
                        }
                    ]
               },
               {
                    name:'stock',
                    path:'stock',
                    component:Content,
                    children:[
                        {
                            name:'instock',
                            path:'instock',
                            component:stock,
                            meta:{isAuth:true,title:'入库管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if(userInfo.user.userRole === 0 || userInfo.wareAuthorization === 2){
                                       next()
                                   }else{
                                       alert('您没有入库管理权限,请让管理员授予权限')
                                   }
                               }else{
                                   next()
                               }
                           } 
                        },
                        {
                            name:'outstock',
                            path:'outstock',
                            component:stock,
                            meta:{isAuth:true,title:'出库管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if(userInfo.user.userRole === 0 || userInfo.wareAuthorization === 2){
                                       next()
                                   }else{
                                       alert('您没有出库管理权限,请让管理员授予权限')
                                   }
                               }else{
                                   next()
                               }
                           } 
                        },
                        {
                            name:'indetail',
                            path:'indetail',
                            component:stockDetail,
                            meta:{isAuth:true,title:'入库单详情管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if(userInfo.user.userRole === 0 || userInfo.wareAuthorization === 2){
                                       next()
                                   }else{
                                       alert('您没有入库单详情管理权限,请让管理员授予权限')
                                   }
                               }else{
                                   next()
                               }
                           } 
                        },
                        {
                            name:'outdetail',
                            path:'outdetail',
                            component:stockDetail,
                            meta:{isAuth:true,title:'出库单详情管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if(userInfo.user.userRole === 0 || userInfo.wareAuthorization === 2){
                                       next()
                                   }else{
                                       alert('您没有出库单详情管理权限,请让管理员授予权限')
                                   }
                               }else{
                                   next()
                               }
                           } 
                        }
                    ]
                },
                {
                    name:'assistance',
                    path:'assistance',
                    component:Content,
                    children:[
                        {
                            name:'changePwd',
                            path:'changePwd',
                            component:changePwd,
                        },
                        {
                            name:'information',
                            path:'information',
                            component:info,
                        },
                    ]
                },
                {
                    name:'authorization',
                    path:'authorization',
                    component:Content,
                    children:[
                        {
                            path:'management',
                            component:auth,
                            meta:{isAuth:true,title:'授权管理'},
                            beforeEnter: (to, from, next) => {
                               if(to.meta.isAuth){ //判断是否需要鉴权
                                   let userInfo = sessionStorage.getItem('userInfo')
                                   userInfo = JSON.parse(userInfo)
                                   if(userInfo.user.userRole === 0){
                                       next()
                                   }else{
                                       alert('您不是管理员,无法给其他用户授权!')
                                   }
                               }else{
                                   next()
                               }
                           } 
                        }
                    ]
                }
            ]
        }
    ]
})

export default router