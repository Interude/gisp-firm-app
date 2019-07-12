<template>
<div >
    <van-nav-bar
            title="我的"
            fixed/>
    <div class="userinfo-banner">
        <div class="userinfo-logo">
            <img src="../../assets/nanoray_logo.png" width="80" height="80"/>
        </div>
        <h1 class="userinfo-title">
            纳光科技用户
        </h1>
    </div>
    <section class="userinfo-content-section">
        <van-cell-group>
            <van-cell value="已认证" class="title-text">
                <template slot="title">
                    <span>{{realName}}</span>
                </template>
                <van-icon slot="icon" class-prefix="iconfont" name='people' class="shiming"/>
                <van-icon slot="right-icon" class-prefix="iconfont" name='audit' class="shiming"/>
            </van-cell>
            <!--<van-cell class="title-text" is-link title="出库信息" @click="batchInfo">-->
            <van-cell title="清空缓存" icon="delete" is-link class="title-text" @click="clearCache"/>
            <!--</van-cell>-->
        </van-cell-group>
    </section>
    <div style="height:100px;"></div>
    <section class="userinfo-logout-section">
        <van-button type="danger" size="large" class="userinfo-logout-section-btnlogout" @click.native="loginOut">退出登录</van-button>
    </section>
</div>
</template>
<script>
import { Cell, CellGroup, Icon, Button ,NavBar} from "vant";
import store from '../../store/store'
import tool from '../../util/tool'
export default {
  name: "usersetting",
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]:Icon,
    [Button.name]:Button,
      [NavBar.name]:NavBar
  },data(){
      let getUserName = ()=>{return tool.getCache('firmInfo').realName}
      return{
         realName:getUserName()
      }

    },mounted(){



    },methods: {
        batchInfo(){
            this.$router.push({name:'batch_info'})
        },
        loginOut(){
            //this.$store.commit('SET_LOGIN_TOKEN','')
            tool.setCache('token','')
            tool.setCache('firmInfo','')
            this.$router.push({path:'/'})
        },
        clearCache(){
            let response = manager.getPlugin('CACHE').cleanCache();
            let resObj = JSON.parse(response);
            if(resObj && resObj.status == 0){
                this.$notify({
                    message: '清理成功',
                    duration: 2000,
                    background: '#367cff'
                });
            }else{
                this.$notify({
                    message: '清理失败',
                    duration: 2000
                });
            }
        }
    }

};
</script>
<style lang="less">
@bg:#ffffff;
.setColor(@c #cdcdcd){
    background-color: @c;
}

.userinfo-banner{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    position: relative;
    justify-content: center;
    background-image: linear-gradient(270deg,#8146b4,#6990f6);
    .userinfo-logo{
        display: flex;
        align-items: center;
        width: 120px;
        height: 120px;
        //background-color: #ffffff;
        .setColor(@bg);
        border-radius: 50%;
        justify-content: center;
    };
    .userinfo-title{
        font-size: 16px;
        text-align: center;
        color: #ffffff;
    };
    .shiming{
        font-size: 16px;
        height: 24px;
    };


}
.userinfo-content-section{
    .title-text{
        text-align: left;
    }
}
.userinfo-logout-section{
    padding: 0 20px;
    &-btnlogout {
        height: 40px;

  }
}
</style>


