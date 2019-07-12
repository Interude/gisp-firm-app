
import axios from 'axios'
import {Toast} from 'vant'
import tool from '../util/tool'
const service = axios.create({
  timeout: 5000, // request timeout
  withCredentials:true
})
export const uploadService = axios.create({
    timeout:20000,
    withCredentials:false,
    headers:{"Content-Type":"multipart/form-data"}
})

service.interceptors.request.use(config=>{
const toast = Toast.loading({
    duration: 0,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: 'spinner',
    message: ''
});
    config.headers['Authorization'] = `${tool.getCache('token')==null?'':tool.getCache('token').token_type} ${tool.getCache('token')==null?'':tool.getCache('token').access_token}`
    config.headers['refresh_token'] = `${tool.getCache('token')==null?'':tool.getCache('token').refresh_token}`
    console.info('请求拦截',config)
  return config
},error => {
    Toast(error.message)
    return Promise.reject(error)
})


service.interceptors.response.use(response=>{
    Toast.clear();
   // console.info('响应拦截',response)


  return response
},error => {
    Toast.clear();
    let reg = new RegExp('401')
    if (reg.test(error)) {
       // alert()
       // Toast('未登陆')
    }else {
        Toast(error.message)
    }
    return Promise.reject(error)
})

export default service
