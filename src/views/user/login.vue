<template>
    <div>
        <div class="login-img-div">
            <div class="login-logo-dom" :style="logo"></div>
        </div>
        <div class="login-content">
            <van-cell-group>
                <van-field v-model="userName" placeholder="请输入用户名" label="用户名"/>
                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
            </van-cell-group>
            <div class="login-rememberpwd">
                <van-checkbox v-model="remeberPwd">记住密码</van-checkbox>
            </div>
            <van-button size="large" type="primary" class="login-btnlogin" @click="handleClick">登录</van-button>
            <div class="login-pwd-forget">
                <a>快速注册</a>|
                <a>忘记密码?</a>
            </div>
        </div>
    </div>
</template>
<script>
    import logo from "../../assets/nanoray_logo.png";
    import tool from '../../util/tool'
    import {Checkbox, Field, Button, Cell, CellGroup, Notify, Toast} from "vant";
    import {loginNoVerifyCode, getLoginUserInfo} from '../../api/userService'

    export default {
        name: "login",
        components: {
            [Checkbox.name]: Checkbox,
            [Field.name]: Field,
            [Button.name]: Button,
            [CellGroup.name]: Cell,
            [Notify.name]: Notify,
            [Toast.name]: Toast
        },
        data() {
            return {
                logo: `background-image: url(${logo})`,
                userName: "",
                password: "",
                remeberPwd: false
            };
        },
        methods: {
            handleClick() {
                if (!this.userName) {

                    Notify('请输入用户名')
                } else if (!this.password) {

                    Notify('请输入密码')
                } else {
                    loginNoVerifyCode(this.userName, this.password).then((res) => {
                       //  let refresh_token = res.headers.refresh_token
                       //  let token_type = res.headers.token_type
                       //  let access_token = res.headers.access_token
                       // // let captcha_token = res.headers.captcha_token
                       //  tool.setCache('token',{refresh_token:refresh_token,token_type:token_type,access_token:access_token})
                        let {data} = res
                        if (data[this.$FINAL.RETCODE] == this.$FINAL.SUCCESS) {
                            let refresh_token = data[this.$FINAL.RETDATA].refreshToken
                            let token_type = data[this.$FINAL.RETDATA].tokenType
                            let access_token = data[this.$FINAL.RETDATA].accessToken
                            let token={
                                refresh_token:refresh_token,
                                token_type:token_type,
                                access_token:access_token
                            }
                            tool.setCache('token',{refresh_token:refresh_token,token_type:token_type,access_token:access_token})


                            this.$store.commit("SET_LOGIN_TOKEN", this.userName);
                            tool.setCache('userName', this.userName)
                            tool.setCache('remeberPwd', this.remeberPwd)
                            if (this.remeberPwd) {
                                tool.setCache('password', this.password)
                            } else {
                                tool.setCache('password', '')
                            }
                            getLoginUserInfo().then(res => {
                                console.info('getLoginUserInfo', res)
                                let {data} = res
                                if (data[this.$FINAL.RETCODE] == this.$FINAL.SUCCESS) {
                                    // tool.setCache('realName', data[this.$FINAL.RETDATA].realName)
                                    // tool.setCache('frimUscc', data[this.$FINAL.RETDATA].firmUscc)
                                    tool.setCache('firmInfo',data[this.$FINAL.RETDATA])
                                    this.$router.push({path: "/"});
                                } else {
                                    Notify(data[this.$FINAL.RETMSG])
                                }
                            })


                        } else {
                            Notify(data[this.$FINAL.RETMSG])
                        }
                    })
                }
            }


        },
        mounted() {
            this.remeberPwd = tool.getCache('remeberPwd')
            if (!!tool.getCache('password')) {
                this.password = tool.getCache('password')
            }
            this.userName = tool.getCache('userName')
        }
    };
</script>
<style lang="less">
    @btn-primary-bg: #367cff;

    .login-img-div {
        text-align: center;
        margin: 50 auto 0px;
        height: 200px;
        padding-top: 50px;
        .login-logo-dom {
            width: 150px;
            height: 150px;
            display: block;
            margin: 0 auto;
            background-size: 150px 150px;
        }
    }

    .login-content {
        margin-top: 20px;
        padding: 0px 20px;
        .login-rememberpwd {
            text-align: left;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .pass-form-item-submit {
            margin-top: 20px;
            background-color: @btn-primary-bg !important;
        }
        .login-btnlogin {
            color: #ffffff;
            background-color: @btn-primary-bg;
            border: solid 1px @btn-primary-bg;
            height: 40px;
            &:active {
                background-color: @btn-primary-bg * 0.9;
            }
        }
        .login-pwd-forget {
            margin: 20px auto 0px;
            text-align: center;
        }
    }
</style>
