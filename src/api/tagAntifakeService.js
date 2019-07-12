/**
 * 防伪查询接口
 */
import request from '../util/request'

export  let tagAntifakeService =(params)=>{
    return request({
        url:'/api/eidTagPublic/authenticate',
        method:'post',
        data:params
    })
}