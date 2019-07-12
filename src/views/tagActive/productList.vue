<template>
  <div>
    <van-nav-bar
            title="产品列表"
            fixed
    />
    <!--{{productList}}-->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        class="product-card"
        v-for="item in productList"
        :key="item.productId"
        @click="productTagActive(item)">
        <a class="product-card__thumb">
          <img class="product-card__img" :src="imagePath+'?fileUrl='+item.goodsImages[0]+'&resType=GI'">
        </a>

        <div  class="product-card__content">
          <div class="product-card__title">{{item.goodsName}}</div>
          <div class="product_card__desc">{{item.producingArea}}</div>
          <div class="product_card__desc">{{item.goodsDesc}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import {List,NavBar} from 'vant'
import {queryGoodsList} from '../../api/tagActiveService'
import {getImage} from '../../api/goodsBatch'
import store from  '../../store/store'
export default {
  name: "productList",
  components:{
      [List.name]:List,
      [NavBar.name]:NavBar
  },
  data() {
    return {
      imagePath: '/api/filemgt/getFile',
      productList: [
        // {
        //   productId: "1",
        //   productImgUrl:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546492412311&di=ac424a3c2cd49178debbc66d7326d6ca&imgtype=0&src=http%3A%2F%2Fwww.cl010.com%2Fuploadfile%2Fueditor%2Fimage%2F20180813%2F1534149008862635.jpg",
        //   productName: "商品1",
        //   productDesc: "商品描述"
        // },
        // {
        //   productId: "2",
        //   productImgUrl:
        //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546492412311&di=ac424a3c2cd49178debbc66d7326d6ca&imgtype=0&src=http%3A%2F%2Fwww.cl010.com%2Fuploadfile%2Fueditor%2Fimage%2F20180813%2F1534149008862635.jpg",
        //   productName: "商品2",
        //   productDesc: "商品描述2"
        // }
      ],
      loading:false,
      finished:true
    };
  },
  methods: {
    productTagActive(item) {
    //console.info(item)
        this.$store.commit('SET_GOODS',item)
        this.$router.push({name:'batch_detail'})

    },
    onLoad(){

    },
  },mounted(){
      queryGoodsList(0).then((res)=>{
          let {data} = res
          console.info('商品',data)
          data.list.forEach(item=>{
            if (item.goodsImages){
              item.goodsImages = JSON.parse(item.goodsImages)
              // getImage(item.goodsImages,'GI').then(res=>{
              //   console.info('商品图片',res)
              // },err=>{
              //
              // })
              //console.info(item.goodsImages)
            }else {
              item.goodsImages = []
            }
           })
        this.productList = data.list;


      })
    }
};
</script>
<style lang="less">
.product-card {
  img{
    width: 100%;
    height:100%;
  }
  position: relative;
  &:before{
    content: '';
    position: absolute;
    border-top: 1px solid #ecf3e2;
    width: 100%;
    left: 0;
    top: 0;
  }
  border-right:1px solid #ecf3e2;
  border-radius: 5px;
  color: #323233;
  display: flex;
  font-size: 13px;
  position: relative;

  box-sizing: border-box;
  padding: 0;
  background-color: white;
  flex-wrap: wrap;
  margin: 5px;
  overflow: hidden;
  line-height:1.5em;

  &:not(:first-child) {
    margin-top: 10px;
  }
  &--center,
  &__thumb {
    align-items: center;
    justify-content: center;
  }
  &__thumb {
    position: relative;
    width: 90px;
    height: 90px;
    margin-right: 10px;
    flex: none;

    img {
      border: none;
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__content {
    padding-top: 4px;
    position: relative;
    flex: 1;
    height: 90px;
    min-width: 0; /* hack for flex box ellipsis */
    text-align: left;
  }

  &__title,
  &__desc {
    word-break: break-all;
  }

  &__title {
    line-height: 16px;
    max-height: 32px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
  }

  &__desc {
    color: #7d7e80;
    max-height: 20px;
    line-height: 20px;
  }
  box-shadow: -2px 1px 1px 0px #D9D9D9;
  margin-top: 10px;
}

</style>


