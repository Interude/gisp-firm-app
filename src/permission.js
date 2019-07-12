import router from './router/router'
import store from './store/store'
import {getLoginUserInfo} from "./api/userService";

// import  {getLoginUserInfo} from 'api/userService'

const whiteList = ['/login', '/auth-redirect', '/401','/']// no redirect whitelist

router.beforeEach((to, from, next) => {
    // //console.log('dd',store.state.user.loginToken)
    //     //next()
    // // if(store.state.user.loginToken){
    // //     next()
    // // }else {
    // //     if(whiteList.indexOf(to.path) !== -1) {
    // //         next()
    // //     }else {
    // //         next(`/login?redirect=${to.path}`)
    // //     }
    // // }
    //
    // getLoginUserInfo().then(res=>{
    //     console.info(res)
    // },error => {
    //     console.info(error)
    // })

    if (whiteList.indexOf(to.path)!==-1){
        next()
    } else {
        getLoginUserInfo().then(res=>{
            next()
        },err=>{
            next({path:'/login'})
        })
    }
})
