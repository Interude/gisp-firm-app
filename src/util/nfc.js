import {Toast} from 'vant'

class nfc {

    /**
     * 初始化nfc状态
     * **/
    constructor() {
        this.isEnable = false
        let isExists = manager.getPlugin('NFC').isExists()
        this.state = JSON.parse(isExists).data
        if (this.state) {
            this.isEnables = JSON.parse(manager.getPlugin('NFC').isEnable()).data
        }
    }

    /**
     * 激活nfc android
     * **/
    executeEnable_android() {
        manager.getPlugin('NFC').openSetting()
    }

    /**
     * 激活nfc ios
     * **/

    executeEnable_ios() {
        manager.getPlugin('NFC').openNFC()
    }

    /***
     * 读取nfc
     * **/
    readTagMsg(fun) {
        /*
        return new Promise((resolve, reject) => {
            manager.getPlugin('NFC').addTagListener(() => {
                manager.getPlugin('NFC').read(callData => {
                    let retData = JSON.parse(callData)
                    if (retData.data.tagId.length) {
                        alert(retData.data.tagId.length)
                        resolve(retData)
                    } else {
                        reject(`读取失失败,errCode${retData.state}`)
                    }
                })
            })
        })*/

        manager.getPlugin('NFC').addTagListener(() => {
            manager.getPlugin('NFC').read(callData => {
                fun(JSON.parse(callData))
            },'')

        })
    }


}

export default nfc
