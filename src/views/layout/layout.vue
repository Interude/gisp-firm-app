<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      fixed
    />
    <div style="height:46px"></div>
    <router-view></router-view>

    <van-tabbar  v-model="active" fixed>
      <!--<van-tabbar-item  class="layout-tabbaritem" to="/">-->
        <!--<span class="item-text">资讯</span>-->
        <!--<van-icon slot="icon" class-prefix="iconfont"  name="home" class="item-icon"/>-->
      <!--</van-tabbar-item>-->
      <!--<van-tabbar-item class="layout-tabbaritem" to="/antifake/mainMenu">-->
        <!--<span class="item-text">防伪</span>-->
        <!--<van-icon slot="icon" class-prefix="iconfont" name="nfc" class="item-icon"/>-->
      <!--</van-tabbar-item>-->
      <van-tabbar-item to="/tagActive/productList" class="layout-tabbaritem">
        <span class="item-text">商品出库</span>
        <van-icon slot="icon" class-prefix="iconfont" name="compass" class="item-icon"/>
      </van-tabbar-item>
      <van-tabbar-item class="layout-tabbaritem" to="/my">
        <span class="item-text">我的</span>
        <van-icon slot="icon" class-prefix="iconfont" name="people" class="item-icon"/>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NavBar, Toast, Tabbar, TabbarItem, Icon } from "vant";
import  request from '../../util/request'
export default {
  name: "layout",
  components: {
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Icon.name]: Icon
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    onClickLeft() {
     this.$router.back()
    },
    onClickRight() {
     new request({
         url:'',
         method:'post',
     })

    },
  }
};
</script>
<style lang="less">
.layout-tabbaritem {
  .item-text {
    font-size: 12px;
  }
  .item-icon {
    font-size: 18px;
  }
}
</style>
