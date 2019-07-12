import request from '../util/request'
export const findOrderByCondition = {
        list:[
            {
                "buyingChannel": "线下实体",
                "complainAddress": "贵州茅台镇茅台酒厂555号",
                "complainDate": "2018-12-12(投诉日期)",
                "complainFiles": "",
                "complainId": "20181212",
                "complainReason": "",
                "complainState": "投诉状态",
                "complainTerm": "2018-12-30(投诉处理期限)",
                "complainTime": "12:12:12",
                "complainType": "产品质量",
                "confirmationTime": "",
                "customerId": "123456",
                "customerName": "张三",
                "customerTel": "13330413512",
                "entId": "1",
                "entName": "贵州茅台酒厂",
                "entUserId": "",
                "entUserName": "",
                "goodsId": "1",
                "goodsName": "茅台酒",
                "processingEndTime": "",
                "processingResult": "",
                "processingStartTime": "",
                "resultSatisfactionConfirmation": ""
            },
            {
                "buyingChannel": "购买渠道",
                "complainAddress": "",
                "complainDate": "2018-12-12(投诉日期)",
                "complainFiles": "",
                "complainId": "20181212",
                "complainReason": "",
                "complainState": "投诉状态",
                "complainTerm": "2018-12-30(投诉处理期限)",
                "complainTime": "12:12:12(投诉时间)",
                "complainType": "投诉类型(产品质量、服务)",
                "confirmationTime": "",
                "customerId": "123456",
                "customerName": "张三",
                "customerTel": "投诉客户手机",
                "entId": "1",
                "entName": "nt",
                "entUserId": "",
                "entUserName": "",
                "goodsId": "1",
                "goodsName": "茅台酒",
                "processingEndTime": "",
                "processingResult": "",
                "processingStartTime": "",
                "resultSatisfactionConfirmation": ""
            },
            {
                "buyingChannel": "购买渠道",
                "complainAddress": "",
                "complainDate": "2018-12-12(投诉日期)",
                "complainFiles": "",
                "complainId": "20181212",
                "complainReason": "",
                "complainState": "投诉状态",
                "complainTerm": "2018-12-30(投诉处理期限)",
                "complainTime": "12:12:12(投诉时间)",
                "complainType": "投诉类型(产品质量、服务)",
                "confirmationTime": "",
                "customerId": "123456",
                "customerName": "张三",
                "customerTel": "投诉客户手机",
                "entId": "1",
                "entName": "nt",
                "entUserId": "",
                "entUserName": "",
                "goodsId": "1",
                "goodsName": "茅台酒",
                "processingEndTime": "",
                "processingResult": "",
                "processingStartTime": "",
                "resultSatisfactionConfirmation": ""
            }
        ]
}

/**
 * 新建投诉订单信息
 * **/
export  let addOrder =(params)=>{
    return request({
        url:'/api/nfcm/eidTagComplainProducer/customerOrder/addOrder',
        method:'post',
        data:params
    })
}

/**
 * 获取投诉历史列表/api/nfcm/eidTagComplainProducer/customerOrder/findOrderByCondition
 * **/

export let getOrderList = (pages,customerId,startDate='',endDate='') =>{
    return request({
        url:'/api/nfcm/eidTagComplainProducer/customerOrder/findOrderByCondition',
        method:'post',
        data:{
            'queryParams':{
                "customerId":customerId,
                "startDate": startDate,
                "endDate": endDate,
            },
            "page":pages,
            "limit": "5"
        }
    })
}

