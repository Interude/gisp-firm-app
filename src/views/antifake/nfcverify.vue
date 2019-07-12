<template>
  <section class="nfc-active-container">
    <div class="icon-container"></div>
    <van-icon class-prefix="iconfont" name="nfc" class="menuitem-icon"/>
    <div>请将手机NFC区域靠近商品标签区域</div>
    <div class="list-container" v-show="showDlg">
      <div>
        <img
          width="200"
          height="300"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546492412311&di=ac424a3c2cd49178debbc66d7326d6ca&imgtype=0&src=http%3A%2F%2Fwww.cl010.com%2Fuploadfile%2Fueditor%2Fimage%2F20180813%2F1534149008862635.jpg"
        >
      </div>
      <div>
        <van-icon
          class-prefix="iconfont"
          name="close_icon"
          class="menuitem-icon"
          @click="closeDlg"
        />
      </div>
    </div>
  </section>
</template>
<script>
import { Icon, Toast } from "vant";
import {tagAntifakeService} from '../../api/tagAntifakeService'
export default {
  name: "nfcVerify",
  data() {
    return {
      showDlg: false,
      dlgTxt: "fasdfasdfasdf"
    };
  },
  components: {
    [Icon.name]: Icon,
    [Toast.name]:Toast
  },
  methods: {
    closeDlg() {
      this.showDlg = false;
    }
  },
  mounted: function() {
    let vue_this = this
    let isbusy = false
    const ret = manager.getPlugin("NFC").addTagListener(function() {
      if(isbusy){
          return
      }
      isbusy = true
      manager.getPlugin("NFC").read(function(res) {
        let tagObj = JSON.parse(res);
        let tagItem = { tagId: "" };
        tagItem.tagId = tagObj.data.tagId;
        if(tagObj.data.tagId){
            const params = {
                eidTagId:tagObj.data.tagId
            }
            tagAntifakeService(params).then((res)=>{
                            let {data} = res
                            if (data.retCode=='200'){
                                Toast.success('恭喜，商品'+data.retData.goodsName+' 是真品!');
                            } else {
                                Toast(data.retMsg)
                            }
                            isbusy = false
                    })
        }
      });
    });
  }
};
</script>
<style lang="less">
.nfc-active-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  .icon-container {
    height: 200px;
  }
  .menuitem-icon {
    margin-top: 300px;
    font-size: 192px;
    margin: 15px 0px;
    color: #cdcdcd;
  }
  .list-container {
    background-color: rgba(255, 250, 240, 0.4);
    padding-top: 50px;
    position: fixed;
    top: 46px;
    left: 0px;
    right: 0px;
    bottom: 50px;
    .menuitem-icon {
      font-size: 36px;
      margin: 15px 0px;
      color: #cdcdcd;
    }
  }
}
</style>


