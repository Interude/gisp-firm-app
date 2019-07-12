<template>
    <div class="batch-info-main">
        <van-nav-bar
                title="出库批次"
                left-text="返回"
                right-text="新建批次"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed/>
        <h4 v-if="isNotHaveData">没有查询到该商品的出库信息<span class="fa fa-frown-o"></span></h4>
      <div class="search" @click="search">
          <van-cell title="" value="筛选" size="large" is-link />
      </div>
        <!--<van-radio-group v-model="radio" @change="change">-->
            <!--<van-radio name="0">新建</van-radio>-->
            <!--<van-radio name="1">出库中</van-radio>-->
            <!--<van-radio name="2">待发货</van-radio>-->
        <!--</van-radio-group>-->
        <!--<van-radio-group v-model="radio" @change="change">-->
            <!--<van-radio name="3">已发货</van-radio>-->
            <!--<van-radio name="4">撤销</van-radio>-->
        <!--</van-radio-group>-->

        <van-list class="list"   v-model="loading"  finished-text="到底了~" :finished="finished" @load="onLoad" >
            <div v-for="(item,key) in List" :key="key" class="batch-info-content"  @click="batchEntry(item)">
                <div :class="[item.style]">{{item.state}}</div>
                <p class="batch-info-content-p">
                <span class="batch-info-label">
                出库批次号
            </span>
                    <span class="batch-info-data">
               {{item.outgoingBatchId}}
            </span>
                </p>
                <p class="batch-info-content-p">
                <span class="batch-info-label">
                商品名称
            </span>
                    <span class="batch-info-data">
              {{item.goodsName}}
            </span>
                </p>
                <p class="batch-info-content-p">
                <span class="batch-info-label">
                品牌名称
            </span>
                    <span class="batch-info-data">
               {{item.brandName}}
            </span>
                </p>
                <p class="batch-info-content-p">
                <span class="batch-info-label">
               创建人
            </span>
                    <span class="batch-info-data">
                {{item.creater}}
            </span>
                </p>
                <p class="batch-info-content-p">
                <span class="batch-info-label">
               发货地区
            </span>
                    <span class="batch-info-data">
             {{item.deliveryArea}}
            </span>
                </p>

                <p class="batch-info-content-p">
                <span class="batch-info-label">
               创建时间
            </span>
                    <span class="batch-info-data">
               {{item.createDate}}
            </span>
                </p>

                <p class="batch-info-content-p">
                <span class="batch-info-label">
               当前批次商品数量
            </span>
                    <span class="batch-info-data">
               {{item.outgoingSum}}件
            </span>
                </p>

                <!--<span class="batch_info_entry" @click="batchEntry(item)">出库录入<i class="fa fa-angle-right"></i></span>-->
            </div>
        </van-list>
        <!--<van-popup v-model="show" position="bottom">-->
           <!--<div>-->
               <!---->
           <!--</div>-->
        <!--</van-popup>-->
        <van-actionsheet
                v-model="show"
                :actions="actions"
                @select="onSelect"
        />
    </div>
</template>

<script>
    import {Dialog,Row, Col, NavBar, Toast, Tabbar, TabbarItem, Icon,Cell,List,Field,Radio,RadioGroup,Notify,Popup,Actionsheet,CellGroup} from "vant";
    import {findBatchInfoByCondition,addBatchInfo} from '../../api/goodsBatch'
    export default{
        components:{
            [NavBar.name]:NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [Cell.name]:Cell,
            [List.name]:List,
            [Field.name]:Field,
            [Radio.name]:Radio,
            [RadioGroup.name]:RadioGroup,
            [Notify.name]:Notify,
            [Popup.name]:Popup,
            [Actionsheet.name]:Actionsheet,
            [CellGroup.name]:CellGroup,
            [Dialog.name]:Dialog
        },
        data(){
            return{
                show:false,
                page:0,
                total:0,
                isNotHaveData:false,
                loading: false,
                finished: false,
                radio:'',
                listData:[],
                state:'',
                List:[],
                actions:[
                    {name:'新建',label:0},
                    {name:'出库中',label:1},
                    {name:'待发货',label:2},
                    {name:'已发货',label:3},
                    {name:'已撤销',label:4},
                    {name:'所有',label:''}
                ]

            }
        },
        methods:{
            search(){
                this.show = true
            },
            onSelect(item){
                this.List = []
                    console.log(item.label)
                    // this.show = false
                this.page = 0
                this.state = item.label
                //this.getList(this.state,this.page)
                this.finished = false
                this.show = false
                },
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                this.$router.push({name:'create_new_batch'})
            },
            onLoad(){

                console.log('当前页',this.page)
                   this.page++
                this.getList(this.state,this.page)
                this.loading = false
                    //this.loading = false
            },
            batchEntry(item){
                this.$store.commit('SET_BATCH',item)

                if (item.state=='新建'){
                   // alert(item.state)
                    this.$router.push({name:'activeTagList'})
                }
                else if (item.state=='出库中'){
                    Dialog.confirm({
                        title:'操作选择',
                        confirmButtonText:'继续出库',
                        cancelButtonText:'退库',
                        closeOnClickOverlay:true

                    }).then(()=>{
                        this.$router.push({name:'activeTagList'})
                    }).catch(()=>{
                        this.$router.push({name:'back_going'})
                    })
                }
                else {
                    this.$router.push({name:'out_goingDesc'})
                }


            },
            getList(state='',page=0){
                let goodsInfo = this.$store.state.goods.goodsInfo
                findBatchInfoByCondition({commodityCode:goodsInfo.commodityCode,goodsName:goodsInfo.goodsName,states:state},page).then(res=>{
                    console.info('出库查询',res)
                    let {data} = res
                    if (this.$FINAL.SUCCESS == data[this.$FINAL.RETCODE]){
                        this.listData = data.list
                        this.listData.forEach(item=>{
                            if (item.state == 0) {
                                item.style = 'xj'
                                item.state='新建'
                            }
                            if (item.state==1){
                                item.style = 'ck'
                                item.state='出库中'
                            }
                            if (item.state==2){
                                item.style = 'wfh'
                                item.state='未发货'
                            }
                            if (item.state==3){
                                item.style = 'yfh'
                                item.state = '已发货'
                            }
                            if (item.state == 4){
                                item.style = 'cx'
                                item.state = '撤销'
                            }
                            this.List.push(item)

                        })

                        //  this.loading = false
                        if (data.total <=this.page*5){
                            this.finished = true
                        }

                    }
                    else {
                        Notify(data[this.$FINAL.RETMSG])
                    }
                },error => {
                    Notify(data[this.$FINAL.RETMSG])
                })
            }

        },mounted(){
           // this.getList()

        }
    }

</script>

<style scoped lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .batch-info-main{
        .van-radio-group{
            .van-radio{
              display: block;
            }
        }
        width: 100%;
        .search{
            margin: 10px auto;
            border: 1px solid #D9D9D9;
            width: 95%;
        }


        h4{
            color: #C7C7C7;
            width: 210px;
            height: 1em;
            position: absolute;
            top:50%;
            left: 50%;
            margin-left: -105px;
            margin-top: -1em;
        }
       .list{
           margin-bottom: 50px;
         //  background: royalblue;


           .batch-info-content{
               border-radius: 5px;
               box-shadow: -2px 1px 1px 0px #D9D9D9;
               overflow: hidden;
               position: relative;
               width: 95%;
               height: 175px;
               margin: 10px auto;
               border-right: 1px solid #D9D9D9;
               /*border-left: 1px solid #D9D9D9;*/
               &::before{
                   position: absolute;
                   content:'';
                   /*border-top: 1px solid #D9D9D9;*/
                   width: 100%;
                   left: 0;
                   top: 0;
               }
               &::after{
                   position: absolute;
                   content:'';
                   /*border-top: 1px solid   #D9D9D9;*/
                   width: 100%;
                   left: 0;
                   bottom: 0;
               }

               .batch-info-content-p{
                   width: 100%;
                   height: 1em;
                   margin:.5em 0;
                   font-size: 13px;

                   position: relative;
                   .batch-info-label{
                       position: absolute;
                       left: 5px;
                       top: 5px;
                       font-weight: bold;
                       color:  #909399;

                   }
                   .batch-info-data{
                       position: absolute;
                       right: 5px;
                       top: 5px;
                       font-weight: bold;
                       color:  #909399;


                   }
               }
               .yfh{
                   text-align: center;
                   width: 40px;
                   height: 30px;
                   position: absolute;
                   border: 2px solid #FFFFFF;
                   border-radius: 5px;
                   bottom:-10px;
                   left: -6px;
                   z-index: 4;
                   font-weight: bold;
                   font-family: 'dincondm';
                   font-size: 12px;
                   color: #FFFFFF;
                   line-height: 20px;
                   padding: 0 8px;
                   background-color: #67C23A;
               }
               .wfh{
                   text-align: center;
                   width: 40px;
                   height: 30px;
                   position: absolute;
                   border: 2px solid #FFFFFF;
                   border-radius: 5px;
                   bottom:-10px;
                   left: -6px;
                   z-index: 4;
                   font-weight: bold;
                   font-family: 'dincondm';
                   font-size: 12px;
                   color: #FFFFFF;
                   line-height: 20px;
                   padding: 0 8px;
                   background-color: #E6A23C;
               }
               .xj{
                   text-align: center;
                   width: 40px;
                   height: 30px;
                   position: absolute;
                   border: 2px solid #FFFFFF;
                   border-radius: 5px;
                   bottom:-10px;
                   left: -6px;
                   z-index: 4;
                   font-weight: bold;
                   font-family: 'dincondm';
                   font-size: 12px;
                   color: #FFFFFF;
                   line-height: 20px;
                   padding: 0 8px;
                   background-color: #4e9dff;
                   /*background-image: linear-gradient(90deg, #f68688 0%, #f04f22 100%);*/
               }
               .ck{
                   text-align: center;
                   width: 40px;
                   height: 30px;
                   position: absolute;
                   border: 2px solid #FFFFFF;
                   border-radius: 5px;
                   bottom:-10px;
                   left: -6px;
                   z-index: 4;
                   font-weight: bold;
                   font-family: 'dincondm';
                   font-size: 12px;
                   color: #FFFFFF;
                   line-height: 20px;
                   padding: 0 8px;
                   background-color: #F56C6C;
                   /*background-image: #F56C6C*/
               }
               .cx{
                   text-align: center;
                   width: 40px;
                   height: 30px;
                   position: absolute;
                   border: 2px solid #FFFFFF;
                   border-radius: 5px;
                   bottom:-10px;
                   left: -6px;
                   z-index: 4;
                   font-weight: bold;
                   font-family: 'dincondm';
                   font-size: 12px;
                   color: #FFFFFF;
                   line-height: 20px;
                   padding: 0 8px;
                   background-color: #f5e725;
               }
               .batch_info_entry{
                   position: absolute;
                   bottom: 0;
                   right: 5px;
                   color:#409EFF;
                   font-size: 10px;
                   font-weight: bold;
                   i{
                       line-height: 1em;
                       font-size: 14px;
                   }


               }
           }
       }
        .van-radio-group{
            margin-top: 10px;
            /*background: red;*/
            text-align: center;
            .van-radio{
               display: inline-block;
                margin-left: 5px;
            }
        }
    }


</style>