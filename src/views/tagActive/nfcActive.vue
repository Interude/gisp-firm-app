<template>
    <section class="nfc-active-container">
        <div class="icon-container">
        </div>
        <van-icon class-prefix="iconfont" name='nfc' class="menuitem-icon"/>
        <div class="list-container">
        </div>
    </section>
</template>
<script>
import {Icon} from 'vant'
export default {
    name:'nfcActive',
    components:{
        [Icon.name]:Icon
    }
}
</script>
<style lang="less">
.nfc-active-container{
    min-height: 100vh;
    background-color: #f5f5f5;
    .icon-container{
        height: 200px;
    };
    .menuitem-icon{
        margin-top: 300px;
        font-size: 192px;
        margin: 15px 0px;
        color: #cdcdcd;
    };
    .list-container{
        background-color: rgba(255, 250, 240, .4);
        position:absolute;
        top: 46px;
        left: 0px;
        right: 0px;
        bottom: 50px;
    }
}
</style>


