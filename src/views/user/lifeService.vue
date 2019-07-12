<template>
    <div class="main">
        <van-nav-bar
                title="服务"
                fixed
        />
        <div class="weui-grids">
            <a v-for="(item,key) in menus" class="weui-grid" @click="service(item)" :key="key">
                <div class="weui-grid__icon">
                    <img :src="item.src"/>
                </div>
                <p class="weui-grid__label">{{item.text}}</p>
            </a>
        </div>



    </div>

</template>

<script>
    import {Row, Col, NavBar, Toast, Tabbar, TabbarItem, Icon} from "vant";

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col
        },
        data(){
            return{
            menus:[
                {name:'productList',path:'/tagActive/productList',src:require('../../assets/serviceIcon/hf.png'),text:'产品注册'},
                {name:'jd',path:'',src:require('../../assets/serviceIcon/jd.png'),text:'酒店'},
                {name:'gy',path:'',src:require('../../assets/serviceIcon/fw.png'),text:'公益活动'},
                {name:'shjf',path:'',src:require('../../assets/serviceIcon/shjf.png'),text:'生活缴费'},
                {name:'csfw',path:'',src:require('../../assets/serviceIcon/csfw.png'),text:'城市服务'},
                {name:'hfcz',path:'',src:require('../../assets/serviceIcon/hf.png'),text:'话费充值'},
            ]
            }
        },

        methods: {
            service(item) {
                if (!item.path){
                    Toast('敬请期待')
                } else {
                    this.$router.push({path:item.path})
                }

            }
        }

    }

</script>
<style lang="less">
    @weuiGridBorderColor: #D9D9D9;
    @weuiGridFontSize: 14px;
    @weuiGridIconSize: 28px;
    @weuiGridColumnCount: 3;

    .setTopLine(@c: #C7C7C7) {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid @c;
        color: @c;
        transform-origin: 0 0;
        transform: scaleY(0.5);
    }

    .setBottomLine(@c: #C7C7C7) {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid @c;
        color: @c;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
    }

    .setLeftLine(@c: #C7C7C7) {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-left: 1px solid @c;
        color: @c;
        transform-origin: 0 0;
        transform: scaleX(0.5);
    }

    .setRightLine(@c: #C7C7C7) {
        content: " ";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-right: 1px solid @c;
        color: @c;
        transform-origin: 100% 0;
        transform: scaleX(0.5);
    }

    .weui-grids {
        position: relative;
        overflow: hidden;
        // margin-top: 10px;

        &:before {
            //.setTopLine(@weuiGridBorderColor);
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid @weuiGridBorderColor;
            color: @weuiGridBorderColor;
            transform-origin: 0 0;
            transform: scaleY(0.5);
        }
        &:after {
            //.setLeftLine(@weuiGridBorderColor);
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            bottom: 0;
            border-left: 1px solid @weuiGridBorderColor;
            color: @weuiGridBorderColor;
            transform-origin: 0 0;
            transform: scaleX(0.5);
        }
    }

    .weui-grid {
        position: relative;
        float: left;
        padding: 20px 10px;
        width: 75% / @weuiGridColumnCount;
        box-sizing: border-box;

        &:before {
            //.setRightLine(@weuiGridBorderColor);
            content: " ";
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            bottom: 0;
            border-right: 1px solid @weuiGridBorderColor;
            color: @weuiGridBorderColor;
            transform-origin: 100% 0;
            transform: scaleX(0.5);
        }
        &:after {
            //.setBottomLine(@weuiGridBorderColor);
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid @weuiGridBorderColor;
            color: @weuiGridBorderColor;
            transform-origin: 0 100%;
            transform: scaleY(0.5);
        }

        &:active {
            // background-color: @weuiBgColorActive;
        }
    }

    .weui-grid__icon {
        width: @weuiGridIconSize;
        height: @weuiGridIconSize;
        margin: 0 auto;

        img {
            display: block;
            width: 100%;
            height: 100%;
        }

        & + .weui-grid__label {
            margin-top: 5px;
        }
    }

    .weui-grid__label {
        display: block;
        text-align: center;
        //color: @weuiTextColorTitle;
        font-size: @weuiGridFontSize;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

</style>
