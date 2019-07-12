<template>
    <div class="activeTagList_main">

        <van-nav-bar
                title="标签列表"
                left-text="返回"
                right-text="出库详情"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed
        />
        <div v-if="!taglist.length" class="activeTagListLogo">等待扫描......</div>
        <van-cell value class="active-tag-list-item" v-for="(item,key) in taglist">
            <template slot="title">
                <span>{{item.eidTagId}}</span>
            </template>
            <van-icon slot="icon" class-prefix="iconfont" name="nfc" class="active-tag-list-item__icon"/>
            <van-icon slot="right-icon" class-prefix="iconfont" name="close_icon" class="active-tag-list-item__icon"
                      @click="del(key)"/>
        </van-cell>
        <van-button v-if="taglist.length" class="btn" size="small" type="primary" round @click.native="submit">批次流水上报<i
                style="font-weight: bold;font-size: 13px;margin-left: 5px" class="fa fa-angle-right"></i></van-button>
    </div>
</template>
<script>
    import {Cell, Icon, Toast, NavBar, Notify, Button, Dialog} from "vant";
    import {activeEidTags} from '../../api/tagActiveService'
    import {addBatchDetailInfo} from '../../api/goodsBatch'
    import nfc from '../../util/nfc'

    export default {
        name: 'activeTagList',
        components: {
            [Button.name]: Button,
            [Cell.name]: Cell,
            [Icon.name]: Icon,
            [Toast.name]: Toast,
            [NavBar.name]: NavBar,
            [Dialog.name]: Dialog
        },
        data() {
            return {
                taglist: [],
                productID: '',
                outgoingBatchId: '',
                batchInfo: {}
            }
        }, methods: {
            del(key) {

                this.taglist.splice(key, 1)
            },
            onClickLeft() {
                this.$router.back()
            },
            onClickRight() {
                this.$router.push({name: 'out_goingDesc'})
            },
            submit() {
                Dialog.confirm({
                    title: '是否提交批次流水?',
                }).then(() => {

                    addBatchDetailInfo({
                        outgoingBatchId: this.batchInfo.outgoingBatchId,
                        operator: JSON.parse(localStorage.getItem('firmInfo')).realName,
                        list: this.taglist
                    }).then(res => {
                        let {data} = res
                        if (this.$FINAL.SUCCESS == data[this.$FINAL.RETCODE]) {
                            Toast.success('提交成功')
                            this.$router.back()
                        } else {
                            Toast.success(data[this.$FINAL.RETMSG])
                        }
                    }, err => {
                        Notify(data[this.$FINAL.RETMSG])
                    })
                }).catch(() => {

                });

            }
        },
        mounted() {
            this.batchInfo = this.$store.state.goods.batchInfo
            console.info('批次信息', this.$store.state.goods.batchInfo)
            let os = window.manager.platform
            if (os == 'android') {
                this.batchInfo = this.$store.state.goods.batchInfo
                console.info('批次信息', this.$store.state.goods.batchInfo)
                let Nfc = new nfc()

                if (!Nfc.state) {
                    Toast('您的设备不支持nfc功能')
                    setTimeout(() => {
                        this.$router.back()
                    }, 1000)
                } else {
                    if (!Nfc.isEnables) {
                        Nfc.executeEnable_android()
                        this.$router.back()
                    } else {

                        let tl = this.taglist
                        Nfc.readTagMsg((tagObj) => {
                            if (!!tagObj.data.tagId) {
                                tl.push({eidTagId: tagObj.data.tagId})
                            } else {
                                Notify('无效标签')
                            }

                        },'')

                    }
                }
            }
            else if (os == 'ios') {
                this.batchInfo = this.$store.state.goods.batchInfo
                console.info('批次信息', this.$store.state.goods.batchInfo)
                //this.outgoingBatchId = this.$route.params.item.outgoingBatchId
                //this.productID = this.$route.params.pid
                let Nfc = new nfc()

                if (!Nfc.state) {
                    Toast('您的设备不支持nfc功能')
                    setTimeout(() => {
                        this.$router.back()
                    }, 1000)
                } else {
                    if (!Nfc.isEnables) {
                        Nfc.executeEnable_ios()
                        this.$router.back()
                    } else {

                        let tl = this.taglist
                        Nfc.readTagMsg((tagObj) => {
                            if (!!tagObj.data.tagId) {
                                tl.push({eidTagId: tagObj.data.tagId})
                            } else {
                                Notify('无效标签')
                            }

                        },'')

                    }
                }
            } else {
                Toast.success('当前设备不支持')
            }


        }
    };
</script>
<style lang="less" scoped>
    .active-tag-list-item {
        color: #000000;
        text-align: left;

        &__icon {
            font-size: 16px;
            height: 24px;
        }
    }

    .activeTagList_main {
        .btn {
            position: fixed;
            border-color: black;
            background: black;
            bottom: 8%;
            left: 50%;
            margin-left: -50px;
            opacity: .4;
        }

        .activeTagListLogo {
            text-align: center;

            margin-top: 75%;
        }
    }
</style>


