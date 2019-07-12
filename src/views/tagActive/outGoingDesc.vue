<template>
    <div class="outGoingDesc-main">
        <van-nav-bar
                v-if="this.batchInfo.state!=0"
                title="批次详情"
                left-text="返回"
                right-text="撤销该批次"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed
        />
        <van-nav-bar
                v-if="this.batchInfo.state==0"
                title="批次详情"
                left-text="返回"
                right-text="删除该批次"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight2"
                fixed
        />

        <div class="outGoingDesc-desc-content">
            <header class="header">
                <h5 style="padding: 0;margin: 0; color: #C7C7C7;font-family: Arial">
                    创建者:{{user}}

                </h5>
                <h5 style="padding: 0;margin: 0;color: #C7C7C7;font-family: Arial">创建时间:{{batchInfo.createDate}}</h5>
            </header>
            <div class="body">
                <van-steps direction="vertical" :active="active">
                    <van-step>
                        <h3>新建</h3>
                        <p>该批次处于新建状态请开始出库操作吧...</p>
                        <!--<van-button :disabled="active!=0" style="margin: 10px" size="small" type="danger" @click.native="deletes">删除</van-button>-->
                    </van-step>
                    <van-step>
                        <h3>出库中</h3>
                        <p>该批次处于出库状态</p>
                        <van-button :disabled="active!=1" style="margin: 10px" size="small" type="primary"
                                    @click.native="outGoingSure">出库结束
                        </van-button>
                    </van-step>
                    <van-step>
                        <h3>待发货</h3>
                        <p>该批次处于待发货</p>
                        <!--<van-button :disabled="active!=2"  style="margin: 10px" size="small" type="danger">撤销</van-button>-->
                        <van-button :disabled="active!=2" style="margin: 10px" size="small" @click.native="deliverGoods"
                                    type="primary">发货确认
                        </van-button>

                    </van-step>
                    <van-step>
                        <h3>已发货</h3>
                        <p>该批次处于已发货状态</p>
                        <!--<van-button disabled  style="margin: 10px" size="small" type="primary">出库撤销</van-button>-->
                    </van-step>

                    <van-step v-if="active==4">
                        <h3>已撤销</h3>
                        <p>该批次处于被撤销状态</p>
                        <!--<van-button disabled  style="margin: 10px" size="small" type="primary">出库撤销</van-button>-->
                    </van-step>
                </van-steps>
            </div>

        </div>
    </div>
</template>

<script>
    import {outgoingFinish, deliverGoods, cancelOutgoing,deleteBatchInfo} from '../../api/goodsBatch'
    import {NavBar, Step, Steps, Button, Dialog, Toast, Notify} from 'vant'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Step.name]: Step,
            [Steps.name]: Steps,
            [Button.name]: Button,
            [Dialog.name]: Dialog,
            [Toast.name]: Toast,
            [Notify.name]: Notify
        },
        data() {
            let getUser = () => {
                return JSON.parse(localStorage.getItem('firmInfo')).realName
            }
            return {
                active: 2,
                user: getUser(),
                batchInfo: {}
            }

        },
        methods: {
            onClickRight2(){
                Dialog.confirm({
                    title: '删除确认!'
                }).then(() => {
                    deleteBatchInfo({
                        outgoingBatchId: this.batchInfo.outgoingBatchId,
                        operator: this.user
                    }).then(res => {
                        let {data} = res
                        if (this.$FINAL.SUCCESS == data[this.$FINAL.RETCODE]) {
                            Toast.success('删除成功')
                            this.$router.push({name: 'batch_info'})
                        } else {
                            Notify(data[this.$FINAL.RETMSG])
                        }
                    }, err => {
                        Notify(data[this.$FINAL.RETMSG])
                    })
                }).catch(() => {

                })
            },

            onClickLeft() {
                this.$router.back()
            },
            onClickRight() {
                if (this.batchInfo.state == 3) {
                    Toast.fail('发货中的批次不允许撤销哒<~!~>');
                }

                else {
                    Dialog.confirm({
                        title: '撤销确认!'
                    }).then(() => {
                        cancelOutgoing({
                            outgoingBatchId: this.batchInfo.outgoingBatchId,
                            operator: this.user
                        }).then(res => {
                            let {data} = res
                            if (this.$FINAL.SUCCESS == data[this.$FINAL.RETCODE]) {
                                Toast.success('撤销成功')
                                this.$router.push({name: 'batch_info'})
                            } else {
                                Notify(data[this.$FINAL.RETMSG])
                            }
                        }, err => {
                            Notify(data[this.$FINAL.RETMSG])
                        })
                    }).catch(() => {

                    })
                }

            },
            outGoingSure() {//出库确认
                Dialog.confirm({
                    title: '出库确认!'
                }).then(() => {
                    outgoingFinish({outgoingBatchId: this.batchInfo.outgoingBatchId, operator: this.user}).then(res => {
                        let {data} = res
                        if (this.$FINAL.SUCCESS == data[this.$FINAL.RETCODE]) {
                            this.active = 2
                            Toast.success('出库成功')
                        } else {
                            Notify(data[this.$FINAL.RETMSG])
                        }
                    }, err => {
                        Notify(data[this.$FINAL.RETMSG])
                    })
                }).catch(() => {

                })
            },
            deliverGoods() {
                Dialog.confirm({
                    title: '发货确认!',
                    message: `地址:${this.batchInfo.deliveryArea}`
                }).then(() => {
                    deliverGoods({outgoingBatchId: this.batchInfo.outgoingBatchId, operator: this.user}).then(res => {
                        let {data} = res
                        if (this.$FINAL.SUCCESS == data[this.$FINAL.RETCODE]) {
                            this.active = 3
                            Toast.success('发货成功')
                        } else {
                            Notify(data[this.$FINAL.RETMSG])
                        }
                    }, err => {
                        Notify(data[this.$FINAL.RETMSG])
                    })
                }).catch(() => {

                })

            }
        },

        mounted() {
            this.batchInfo = this.$store.state.goods.batchInfo
            switch (this.batchInfo.state) {
                case '新建':
                    this.batchInfo.state = 0
                    break
                case '出库中':
                    this.batchInfo.state = 1
                    break
                case '未发货':
                    this.batchInfo.state = 2
                    break
                case '已发货':
                    this.batchInfo.state = 3
                    break
                case '撤销':
                    this.batchInfo.state = 4
                    break

            }
            this.active = this.batchInfo.state
            console.log(this.$store.state.goods.batchInfo)
        }

    }
</script>

<style lang="less" scoped>
    .outGoingDesc-main {
        .outGoingDesc-desc-content {

            .header {
                text-align: center;
                width: 95%;
                height: 60px;
                margin: 10px 10px auto;
                box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);

            }

            .body {
                p {
                    margin: 0;
                    padding: 0;
                }

                text-align: center;
                width: 95%;
                height: 450px;
                margin: 0px auto;
                box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
                /*background: #f68688;*/
                border-radius: 10px;

                .van-button {
                    margin-top: 10%;
                }
            }

        }
    }
</style>
