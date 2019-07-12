import request from '../util/request'
import tool from '../util/tool'
/**
 * 获取商品列表
 * **/
export  const  queryGoodsList = (pages)=>{

   return new request({
        url:'/api/goods/queryGoodsList',
        method:'post',
        data:{
            "limit":"10",
            "page":pages,
            "queryParams":{
                "firmUscc":tool.getCache('firmInfo').firmUscc
            }
        }
    })
}

/**
 * 标签激活
 * **/
export const activeEidTags =(goodsId='',TagList)=>{
    return new request({
        url: '/api/customapi/eidTag/activeEidTags',
        method:'post',
        data:{
            "goodsId":goodsId,
            "eidTagInfos":TagList
        }
    })
}

