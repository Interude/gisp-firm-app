<template>
  <div>
    <van-nav-bar
            title="防伪"
            fixed/>
    <div class="weui-grids">
      <a class="weui-grid" @click="service(1)">
        <div class="weui-grid__icon">
        <!--<van-icon name="umbrella-circle"></van-icon>-->
          <img src="../../assets/serviceIcon/fw2.png"/>
        </div>
        <p class="weui-grid__label">防伪</p>
      </a>
      <a class="weui-grid" @click="service(2)">
        <div class="weui-grid__icon">
          <img src="../../assets/serviceIcon/ts.png"/>
        </div>
        <p class="weui-grid__label">投诉建议</p>
      </a>
    </div>
  </div>
</template>
<script>
import {NavBar,Row, Col, Icon, Toast,Cell } from "vant";

export default {
    name: "antifakeMainMenu",
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Icon.name]: Icon,
        [Toast.name]: Toast,
        [NavBar.name]: NavBar,
        [Cell.name]: Cell
    },
    data() {
        return {};
    },
    computed: {},
    methods:{
        service(tag){

            switch (tag) {
                case 1:
                    this.$router.push({name: 'nfcverify'})
                    break
                case 2:
                    this.$router.push({name: 'complaint'})
                    break
                default:
                    Toast('敬请期待~')
                    break
            }
        }
    }
}
</script>
<style lang="less">


</style>


