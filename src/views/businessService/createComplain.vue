<template>
    <div class="createComplain_main">
        <van-nav-bar
                title="新建投诉"
                left-text="返回"
                right-text=""
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
                fixed
        />
       <div class="createComplain_from">
           <van-field v-model="customerName" placeholder="投诉人姓名" left-icon="manager"   label="投诉人:"/>
           <van-field v-model="customerTel" placeholder="投诉人手机号" left-icon="phone" label="手机号:"/>
           <van-field v-model="goodsName" placeholder="投商品名称" left-icon="gem" label="投诉商品:"></van-field>
           <van-field v-model="goodsId"  left-icon="f" label="商品条形码:"></van-field>
           <!--<van-field v-model="entName" placeholder="请输入要投诉的企业名称" left-icon="hotel-o" label="投诉企业:"/>-->
           <!--<van-field v-model="entId" placeholder="投诉的企业ID" disabled left-icon="f" label="企业ID:"/>-->
           <van-field v-model="complainAddress" placeholder="投诉人地址" left-icon="location" label="投诉人:">
               <van-icon @click.native="location" slot="icon" name="location-o">定位</van-icon>
           </van-field>
           <section class="createComplain_section">
               <h2>投诉类型</h2>
               <van-radio-group class="createComplain_radio" v-model="complainType">
                   <van-cell-group>
                       <van-cell title="产品质量" clickable @click.native="complainType = '1'">
                           <van-radio name="1" />
                       </van-cell>
                       <van-cell title="服务" clickable @click.native="complainType = '2'">
                           <van-radio name="2" />
                       </van-cell>
                   </van-cell-group>
               </van-radio-group>

           </section>

           <section class="createComplain_section">
               <h2>购买渠道</h2>
               <van-radio-group class="createComplain_radio" v-model="buyingChannel">
                   <van-cell-group>
                       <van-cell title="线下实体" clickable @click="buyingChannel = '1'">
                           <van-radio name="1" />
                       </van-cell>
                       <van-cell title="网购" clickable @click="buyingChannel = '2'">
                           <van-radio name="2" />
                       </van-cell>
                   </van-cell-group>
               </van-radio-group>

           </section>

            <section class="createComplain_section">
                <h2>投诉原因</h2>
                <van-cell-group>
                    <van-field
                            v-model="complainReason"
                            type="textarea"
                            placeholder="请输入投诉原因"
                            rows="2"
                            autosize
                    />
                </van-cell-group>
            </section>

           <div class="createComplain_submit">
               <van-button @click.native="submit"  type="danger" size="large">提交</van-button>
           </div>


       </div>



    </div>
</template>

<script>
    import {addOrder} from '../../api/complaintService'
    import {Field,Button,Icon,Toast,RadioGroup, Radio,CellGroup,Cell,NavBar,List} from 'vant'
    export default {
        components:{
            [Field.name]:Field,
            [Button.name]:Button,
            [Icon.name]:Icon,
            [Toast.name]:Toast,
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [NavBar.name]:NavBar,
            [List.name]:List
        },
        data(){
            return{
                customerName:'',
                customerTel:'',
                // entName:'贵州茅台酒厂',
                // entId:'12312312312312312312',
                goodsName:'',
                goodsId:'',
                complainAddress:'',
                complainType:'',
                buyingChannel:'',
                complainReason:''

            }
        },
        methods:{
            location(){
                Toast('定位');
            },
            onClickLeft(){
                this.$router.back()
            },
            onClickRight(){

            },
            submit(){
                if (!this.customerName){
                    Toast('请填写投诉者姓名')
                }
                else if (!/^1[34578]\d{9}$/.test(this.customerTel)){
                    Toast('请填写正确的投诉人电话')
                }
                else if (!this.complainReason){
                    Toast('请填写投诉原因')
                }else if(!this.goodsId){
                    Toast('请填写商品ID')
                }
                else {
                    let params = {
                        complainType:this.complainType,
                        complainReason:this.complainReason,
                        complainAddress:this.complainAddress,
                        buyingChannel:this.buyingChannel,
                        goodsId:this.goodsId,
                        goodsName:this.goodsName,
                        customerName:this.customerName,
                        customerTel:this.customerTel,
                        customerId:'123456'
                    }
                    addOrder(params).then((res)=>{
                            let {data} = res
                            if (data.retCode=='200'){
                                Toast.success('投诉成功');
                               setTimeout(()=>{this.$router.back()},500)
                            } else {
                                Toast(data.retMsg)
                            }
                    })
                }



            }
        }
    }

</script>

<style lang="less" scoped>
.createComplain_main{
    .createComplain_radio{
        text-align: left;

    }

    .createComplain_from{
      margin-bottom: 100px;
    }
    .createComplain_submit{
        /*margin-top: 5px;*/
        padding: 10px;
    }
}

</style>
