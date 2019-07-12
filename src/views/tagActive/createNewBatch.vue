<template>
    <div class="createNewBatch_main">
        <van-nav-bar
                title="新建出库批次"
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed/>

        <div class="createNewBatch_content">
            <!--<van-row gutter="20">-->
                <!--<van-col span="12">span: 8</van-col>-->
              <!---->
                <!--<van-col span="12">span: 8</van-col>-->
            <!--</van-row>-->
            <div class="header">
                    <h5 style="line-height:60px;padding: 0;margin: 0; color: #C7C7C7;font-family: Arial">
                        创建者:{{user}}

                    </h5>
                <!--<h5 style="padding: 0;margin: 0;color: #C7C7C7;font-family: Arial">创建时间:2019-03-11</h5>-->


            </div>
            <div class="body">
                <van-cell-group>
                    <!--<van-field-->
                            <!--value=""-->
                            <!--label="出库批次号"-->
                    <!--/>-->

                    <van-field
                            disabled
                            v-model="goodsInfo.commodityCode"
                            label="商品条码"
                    />
                    <van-field
                            disabled
                            v-model="goodsInfo.goodsName"
                            label="商品名称"
                    />
                    <van-field
                            v-model="brandName"
                            label="商品品牌"
                    />
                    <van-field
                            disabled
                            v-model="goodsInfo.firmUscc"
                            label="企业编号">
                    </van-field>
                    <van-field
                            disabled
                            v-model="goodsInfo.firmName"
                            label="企业名称">
                    </van-field>
                    <van-field
                            required
                            v-model="deliveryArea"
                            label="发货地区"
                    />
                    <van-field
                            required
                            v-model="areaCode"
                            label="发货编码">
                    </van-field>


                </van-cell-group>

                <van-button size="small" type="primary" @click.native="submit">新建确认</van-button>
            </div>

        </div>

    </div>
</template>

<script>
    import {Button,Field,Row, Col, NavBar, Toast, Tabbar, TabbarItem, Icon,Cell,List,CellGroup,Notify} from "vant";
    import {addBatchInfo} from '../../api/goodsBatch'
    export default {
        components:{
            [NavBar.name]:NavBar,
            [Col.name]:Col,
            [Row.name]:Row,
            [Field.name]:Field,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Button.name]:Button,
            [Toast.name]:Toast,
            [Notify.name]:Notify

        },
        data(){
            let getUser = ()=>{
                return JSON.parse(localStorage.getItem('firmInfo')).realName
            }
            return{
                goodsInfo:{},
                brandName:'',
                areaCode:'',//发货编码
                deliveryArea:'',//发货地址
                user:getUser()

            }

        },methods:{
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){

            },
            submit(){
                addBatchInfo({
                    commodityCode:this.goodsInfo.commodityCode,
                    goodsName:this.goodsInfo.goodsName,
                    brandName:this.brandName,
                    areaCode:this.areaCode,
                    deliveryArea:this.deliveryArea,
                    firmUscc:this.goodsInfo.firmUscc,
                    firmName:this.goodsInfo.firmName,
                    creater:JSON.parse(localStorage.getItem('firmInfo')).realName
                        })
                    .then(res=>{
                            console.log('新增出库',res)
                        let {data} = res
                        if (this.$FINAL.SUCCESS == data[this.$FINAL.RETCODE]){
                            Toast.success('新增批次成功')
                            this.$router.back()
                        } else {
                           // Toast.success('新增批次成功')
                            Notify(data[this.$FINAL.RETMSG])
                        }
                },err=>{
                        Notify(data[this.$FINAL.RETMSG])
                })
            }
        },
        mounted(){
            console.info('商品信息',this.$store.state.goods.goodsInfo)
            this.goodsInfo = this.$store.state.goods.goodsInfo
            //console.info(this.goodsInfo)
        }

    }
</script>

<style lang="less" scoped>
    .createNewBatch_main{
        .createNewBatch_content{
            .header{
                text-align: center;
                width: 95%;
                height: 60px;
                margin: 10px 10px  auto;
                box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);

            }
            .body{
                text-align: center;
                width: 95%;
                height: 450px;
                margin: 0px auto;
                box-shadow: 0 2px 8px 0 rgba(7, 17, 27, 0.06);
                /*background: #f68688;*/
                border-radius: 10px;
                .van-button{
                    margin-top: 10%;
                }
            }


        }
    }

</style>