<template>
    <div class="complainDetails_main">
        <van-nav-bar
                title="详情"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
                fixed
        />
        <section class="createComplain_section complains">
            <h2>信息明细</h2>
            <van-cell style="text-align: left" title="投诉人姓名" :value="source.customerName" size="large" />
            <van-cell style="text-align: left" title="投诉人电话" :value="source.customerTel" size="large" />
            <van-cell style="text-align: left" title="投诉发起地址" :value="source.complainAddress" size="large" />

            <van-cell style="text-align: left" title="投诉商品"   :value="source.goodsName" size="large" />
            <van-cell style="text-align: left" title="投诉厂商"   :value="source.entName" size="large" />
            <van-cell style="text-align: left" title="购买渠道"   :value="source.buyingChannel" size="large" />
            <van-cell style="text-align: left" title="投诉类型"   :value="source.complainType" size="large" />
            <van-cell style="text-align: left" title="投诉时间"   :value="source.complainTime" size="large" />
            <van-cell style="text-align: left" title="投诉处理期限"   :value="source.complainTerm" size="large" />

        </section>
        <van-steps direction="vertical" :active="1" active-color="#f44">
            <!--<van-step>-->
                <!--<h3>未处理</h3>-->
                <!--<p>2019-01-01 12:40</p>-->
            <!--</van-step>-->
            <van-step>
                <h3>已处理</h3>
                <p>2019-01-01 15:40</p>
            </van-step>
            <van-step>
                <h3>已评价(完结)</h3>
                <p>2019-01-10 09:30</p>
            </van-step>
        </van-steps>
    </div>
</template>


<script>
    import {NavBar,Panel,Cell,Step, Steps} from 'vant'
    export default {
        components:{
            [NavBar.name]:NavBar,
            [Panel.name]:Panel,
            [Cell.name]:Cell,
            [Step.name]:Step,
            [Steps.name]:Steps
        },
        data(){
          return{
              source:''
          }
        },
        methods:{
            onClickLeft(){
                this.$router.back()
            }
        },
        mounted(){
           this.source =  this.$route.params.item
            console.info('参数',this.source)
        }

    }
</script>


<style lang="less" scoped>
    .complainDetails_main{
        margin-bottom: 100px;

    }


</style>
