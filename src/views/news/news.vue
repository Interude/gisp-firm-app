<template>
    <div class="news_mian">
        <van-nav-bar
                title="咨询"
                fixed/>
        <iframe width="100%" height="700px" src="https://news.sina.com.cn">

        </iframe>

    </div>
</template>


<script>
    import {NavBar,Panel,Cell,Step, Steps} from 'vant'
    export default {
        components:{
            [NavBar.name]:NavBar
        }

    }
</script>

<style lang="less" scoped>


</style>
