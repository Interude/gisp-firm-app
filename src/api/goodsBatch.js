import  request from '../util/request'
import  Vue from 'vue'
/**
 * 新增出库批次
 * **/
export let addBatchInfo = (paramsData)=>{
    console.log('新增出库参数',paramsData)
    return request({
        url:'/api/eidTag/tagOutgoing/addBatchInfo',
        method:'post',
        data:paramsData

    })
}

/**
 * 未出库批次查询
 * **/
export let findBatchInfoByCondition=(queryParams,page)=>{
    console.log('当前的页数',page)
    return request({
        url:'/api/eidTag/tagOutgoing/findBatchInfoByCondition',
        method:'post',
        data: {
            page:page,
            limit:5,
            queryParams:{
                "operator":'',
                'commodityCode':queryParams.commodityCode,
                'states':queryParams.states,
                'deliveryArea':'',
                'startDate':'',
                'endDate':'',
                'goodsName':queryParams.goodsName,
                'brandName':'',
            }
        }
    })
}

/**
 * 批次流水上送
 * **/
export let addBatchDetailInfo=(params)=>{
    console.log('上送批次信息',params)
        return request({
            url:'/api/eidTag/tagOutgoing/addBatchDetailInfo',
            method:'post',
            data:params
        })

}

// https://【服务域名】/tagOutgoing/outgoingFinish
/**
 * 出库结束确认
 * **/
export let outgoingFinish=(params)=>{
    console.log('出库确认',params)
    return request({
        url:'/api/eidTag/tagOutgoing/outgoingFinish',
        method:'post',
        data:params
    })

}

/**
 * https://【服务域名】/tagOutgoing/deliverGoods
 * **/
export let deliverGoods = (params) =>{
    return request({
        url:'/api/eidTag/tagOutgoing/deliverGoods',
        method:'post',
        data:params
    })
}
// https://【服务域名】/tagOutgoing/cancelOutgoing
export  let cancelOutgoing = (params) =>{
    return request({
        url:'/api/eidTag/tagOutgoing/cancelOutgoing',
        method:'post',
        data:params
    })
}

// https://【服务域名】/tagOutgoing/deleteBatchInfo

/**
 * 删除状态为0(新建)的批次
 * **/
export  let deleteBatchInfo = (params) =>{
    return request({
        url:'/api/eidTag/tagOutgoing/deleteBatchInfo',
        method:'post',
        data:params
    })
}

// https://【服务域名】/tagOutgoing/checkEidTagIdOut

/**
 * 判断标签是否可退库
 * **/
export  let checkEidTagIdOut = (params) =>{
    Vue.prototype.$FINAL.ISRUNNING = false
    return request({
        url:'/api/eidTag/tagOutgoing/checkEidTagIdOut',
        method:'post',
        data:params
    })
}

/**
 * 退库上报出库批次流水
 * **/
export  let retreatBatchDetailInfo = (params) =>{
    return request({
        url:'/api/eidTag/tagOutgoing/retreatBatchDetailInfo',
        method:'post',
        data:params
    })
}

/**
 * 图片查询
 * **/

export let getImage=(url,Type)=>{
    return request({
        url:`/api/filemgt/getFile?fileUrl=${url}&resType=${Type}`,
        method:'get',
    })
}