<template>
    <div class="complaint_main">

        <van-nav-bar
                title="投诉历史"
                left-text="返回"
                right-text="新建投诉"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed
        />
        <van-list class="complaint_list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
                <div v-for="item in list">
                    <van-panel class="complain_panel" :title="item.goodsName" :desc="item.entName" :status="item.complainState">
                        <div class="complain_content">
                            <p>投诉时间:{{item.complainTime}}</p>
                            <p>投诉编号:{{item.complainId}}</p>
                        </div>
                        <div slot="footer" class="complain_footer">
                            <div class="complain_button">
                                <van-button size="small" @click.native="desc(item)" plain  >详情</van-button>
                                &nbsp;
                                <van-button size="small"  @click.native="backout(item)"  type="danger">扯诉</van-button>
                            </div>
                        </div>
                    </van-panel>
                </div>




        </van-list>
    </div>
</template>
<script>
    import {List,Cell,CellGroup,Panel,Button,NavBar,Toast} from 'vant'

    import {getOrderList} from '../../api/complaintService'
    export default {

        data(){
            return{
                list: [],
                loading: false,
                finished: false,
                pages:1
            }
        },
        components:{
            [List.name]:List,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Panel.name]:Panel,
            [Button.name]:Button,
            [NavBar.name]:NavBar
        },
        methods:{

            onLoad() {
               getOrderList(this.pages,'123456').then((res)=>{

                     console.info('res',res)
                    let {data} = res
                    if (this.list.length==parseInt(data.total)){
                        this.finished = true;
                        this.loading = false;
                    }else {
                        data.list.forEach((item)=>{
                            if (item.complainState===1){
                                item.complainState='处理完'
                            }else if (item.complainState===2){
                                item.complainState='评价完'
                            }else if (item.complainState===0){
                                item.complainState='未处理'
                            }
                            item.buyingChannel = item.buyingChannel===1?'线下实体':'网络'
                            item.complainType = item.complainType===1?'产品质量':'服务'
                            this.list.push(item)

                        })
                        this.pages++
                        this.loading = false;
                    }

                })



             //
             // this.list = findOrderByCondition.list
             //    console.info('adsad',findOrderByCondition.list)
             //        this.loading = false
              /*
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 100) {
                        this.finished = true;
                    }
                }, 500);*/
            },

            desc(item){
                this.$router.push({name:'complainDetails',params:{item:item}})
            },
            backout(item){

                this.$dialog.alert({
                    message: '该投诉已经处理,不允许撤诉',
                    showCancelButton:true
                }).then(()=>{

                }).catch(()=>{

                });
            },
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){
                this.$router.push({path:'/createComplain'})

            }
        }
        ,
        mounted(){
           // console.info(typeof findOrderByCondition,findOrderByCondition)


        }
    }

</script>
<style lang="less" scoped>
.complaint_main{
    .complaint_list{
        margin-bottom: 100px;

    }

    .complain_panel{


        text-align: left;
        .complain_content{
            padding-top:0;
            text-align: left;
            padding-left:15px ;
            font-size: 8px;
        }
        .complain_footer{
                padding: 0;
                margin: 0;
                text-align: right;
            .complain_button{
                padding: 0;
                margin: 0;

            }
        }

    }
}

</style>
