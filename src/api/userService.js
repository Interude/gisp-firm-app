import request from '../util/request'
import * as MD5 from '../util/md5'

/***
 * 无验证码登录
 * */
export let loginNoVerifyCode=(userName,password)=>{
    let data = {
        userName:userName,
        pwd: MD5.hex_md5(password),
    }
    return new request({
        url:'/api/oauth/loginNoCaptcha',
        method:'post',
        data:data
    })
}


/**
 * 获取用户信息/admin/user/getLoginUserInfo',
 * **/

export let getLoginUserInfo =()=>{
    return new request({
        url: '/api/admin/user/getLoginUserInfo',
        method: 'post',
    })
}
