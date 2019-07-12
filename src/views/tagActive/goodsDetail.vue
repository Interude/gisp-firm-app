<template>
    <div class="goods-detail-main">
        <van-nav-bar
                title="商品明细"
                left-text="返回"
                right-text="出库"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed
        />
        <!--<van-list finished-text="没有更多了">-->
        <div class="goods-detail-main-panel">
            <div class="goods-detail-main-pane-header">
                <div class="goods-detail-main-header-content-l">
                    <p style="padding: 0"><label>商品名称</label></p>
                    <img style="margin-bottom:3px;margin-left: 0;padding: 0; border-radius: 5%; margin-top:1%; width: 80px;height: 80px;float: left" :src="imagePath+'?fileUrl='+detail.goodsImages+'&resType=GI'">
                    <small style="font-weight: bold;color: #C7C7C7;font-family: Arial"><em>商品描述:</em>{{detail.goodsDesc}}</small>
                    <div style="clear: both"></div>
                </div>
                <div class="goods-detail-main-header-content-r">
                    <p><label>{{detail.goodsName}}</label></p>
                    <!--<p><label>sadasd</label></p>-->
                </div>
            </div>
            <div class="goods-detail-main-content">
                <div v-for="item in Object.keys(this.detail)" class="goods-detail-main-content-desc">
                    <label>{{goodsKey[item]}}</label>
                    <span>{{detail[item]}}</span>
                </div>

            </div>
        </div>
        <!--<div class="goods-detail-main-panel">-->
            <!--<div class="goods-detail-main-pane-header">-->
                <!--<div class="goods-detail-main-header-content-l">-->
                    <!--<p><label>商品名称</label></p>-->
                <!--</div>-->
                <!--<div class="goods-detail-main-header-content-r">-->
                    <!--<p><label>{{detail.goodsName}}</label></p>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="goods-detail-main-content">-->

                <!--<div v-for="item in Object.keys(this.detail)" class="goods-detail-main-content-desc">-->
                    <!--<label>{{goodsKey[item]}}</label>-->
                    <!--<span>{{detail[item]}}</span>-->
                <!--</div>-->

            <!--</div>-->
        <!--</div>-->
        <!--</van-list>-->

        <!--<div class="goods-detail-main-panel">-->
            <!--<div class="goods-detail-main-pane-header">-->
                <!--<div class="goods-detail-main-header-content-l">-->
                    <!--<p><label>哈哈哈</label></p>-->
                <!--</div>-->
                <!--<div class="goods-detail-main-header-content-r">-->
                    <!--<p><label>哈哈哈</label></p>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="goods-detail-main-content">-->

                <!--<div v-for="i in [1,2,3,4,5]" class="goods-detail-main-content-desc">-->
                    <!--<label>阿萨德大</label>-->
                    <!--<span>sdsda</span>-->
                <!--</div>-->

            <!--</div>-->
        <!--</div>-->

    </div>
</template>
<script>
    import {Row, Col, NavBar, Toast, Tabbar, TabbarItem, Icon,Cell} from "vant";
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [Cell.name]:Cell,

        },
        data(){
            return{
                imagePath: '/api/filemgt/getFile',
                detail:'',
                goodsKey:{
                    goodsId:'商品编号',
                    batchNumber:'产品批号',
                    commodityCode:'商品条码',
                    consumerHotline:'消费者热线',
                    firmName:'生产企业名称',
                    firmUscc:'生产企业编码',
                    goodsCategory:'商品分类',
                    goodsDesc:'商品描述',
                    goodsName:'商品名称',
                    goodsRemark:'商品备注',
                    ingredient:'配料-产品成分',
                    packagingRatio:'产品包装比例',
                    producingArea:'产地',
                    productStandard:'产品标准号',
                    productionDate:'生产日期',
                    productionLicense:'生产许可证编号',
                    shelfLife:'保质期',
                    specifications:'规格-净含量',
                    technology:'生产工艺'
                }
            }
        },
        methods:{
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                this.$router.push({name:'batch_info'})
            }
        },
        mounted(){
            console.info(this.$store.state.goods.goodsInfo)
            this.detail = this.$store.state.goods.goodsInfo
            //delete this.detail.goodsImages
            delete this.detail.goodsMovies
            delete this.detail.pictureUrl

        }

    }
</script>

<style scoped lang="less">
    .goods-detail-main{
        width: 100%;
        height: 100%;
        .goods-detail-main-panel{
            margin-top:0px ;
            margin-bottom: 13%;
                &::before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 1%;
                    right: 0;
                    width: 100%;
                    height: 1px;
                    border-top: 1px solid #D9D9D9;
                    color: #D9D9D9;
                }
            position: relative;
            top:30px;
            width: 100%;
            display: inline-block;
            /*border:1px solid red;*/

            .goods-detail-main-pane-header{

                width: 100%;
                min-height:100px;
                .goods-detail-main-header-content-l{
                    position: relative;
                    top: 0px;
                    margin-left: 8px;
                    text-align: left;
                    p{

                        display: block;
                        /*margin-block-start: 1em;*/
                        /*margin-block-end: 1em;*/
                        /*margin-inline-start: 0px;*/
                        /*margin-inline-end: 0px;*/
                        font-weight:bold;
                        font-size: 20px;
                        line-height: 100%;

                    }

                }
                .goods-detail-main-header-content-r{

                    position: absolute;
                    top: 5px;
                    right: 8px;
                    p{
                        line-height: 100%;
                        display: block;
                        /*margin-block-start: 1em;*/
                        /*margin-block-end: 1em;*/
                        /*margin-inline-start: 0px;*/
                        /*margin-inline-end: 0px;*/
                        font-weight:bold;
                        color:  #909399;

                    }
                }
            }
            .goods-detail-main-content{
                width: 100%;
                height: 100%;

                &::before{
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    height: 1px;
                    border-top: 1px solid #d9d9d9;
                    color: #d9d9d9;
                    left: 0px;

                }
                &::after{
                    /*content: "";*/
                    /*position: absolute;*/
                    /*left: 0;*/
                    /*bottom: 0;*/
                    /*right: 0;*/
                    /*height: 1px;*/
                    /*border-top: 1px solid #d9d9d9;*/
                    /*color: #d9d9d9;*/
                   /*width: 100%;*/
                }
                position: relative;
               .goods-detail-main-content-desc{
                   height:25px;
                   position: relative;
                        label{
                            color: #909399;
                            position: absolute;
                            left: 8px;
                            top: 4px;
                            font-weight: bold;
                            font-size: 13px;

                        }
                    span{
                        overflow: scroll;
                        max-width:60%;
                        max-height: 1.5em;
                         color: #909399;
                        position: absolute;
                        right: 8px;
                        top: 4px;
                        font-weight: bold;
                        font-size: 13px;
                    }
               }

            }
        }
    }

</style>