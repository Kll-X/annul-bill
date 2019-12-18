<template>
    <div id="login">
        <img class="login_bg" ondragstart="return false" src="../../public/img/login_bg.png" alt="">
        <div class="input_group">
            <div class="item">
                <input placeholder="请输入电话号码" ref="tel_code" type="text" class="tel_code">
            </div>
            <div class="item">
                <input placeholder="请输入图像验证码" type="text" class="img_code"><span ref="update_img_code" class="update_img_code"
                                                          @click.stop="update_img_code()">获取验证码</span>
            </div>
            <div class="item">
                <input placeholder="请输入短信验证码" type="text" class="sms_code"><span ref="update_sms_code" class="update_sms_code"
                                                          @click.stop="update_sms_code()">获取验证码</span>
            </div>
            <div class="get_bill" @click.stop="get_bill()">
                获取账单
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {}
        },
        created() {
            //自动聚焦
            this.changfouce();
            //刷新验证码
            this.update_img_code();
        },
        methods: {
            //在vue生命周期的created()钩子函数进行的DOM操作要放在Vue.nextTick()的回调函数中，
            //因为created()钩子函数执行的时候DOM并未进行任何渲染，而此时进行DOM操作是徒劳的，所以此处一定要将DOM操作的JS代码放进Vue.nextTick()的回调函数中。
            changfouce() {
                this.$nextTick((x) => {   //正确写法
                    this.$refs.tel_code.focus();
                })
            },
            update_img_code() {
                this.$nextTick((x) => {
                    console.log('update_img_code');
                    this.$refs.update_img_code.innerHTML = '1234';
                })
            },
            update_sms_code() {
                console.log('update_sms_code');
                this.$refs.update_sms_code.innerHTML = '1234';
            },
            get_bill() {
                console.log('get_bill');
                this.$router.replace({name: 'carousel'});//会把login页的这条浏览历史记录清除掉
            }
        }
    }
</script>

<style lang="scss">
    #app {
        background: #46b2fa;
    }

    #login {
        position: relative;

        .login_bg {
            width: 100%
        }

        .input_group {
            background: rgba(0, 0, 0, 0);
            position: absolute;
            width: 10rem;
            top: 5.73rem;
            left: 50%;
            border-radius: 5px;
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0);
            .item {
                display: flex;
                height: 1.1rem;
                padding: 0.2rem;
                margin-bottom: 0.63rem;
                border-radius: 0.2rem;
                background: rgba(255, 255, 255, 0.4);
                overflow: hidden;
                color: #fff;

                input {
                    margin: 0;
                    padding: 0;
                    outline: 0;
                    border: 0;
                    height: 100%;
                    background: transparent;
                    font-size: 0.42rem;
                    font-weight: bold;
                    color: #fff;
                }
                input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                    color:    rgba(255,255,255,0.6) !important;
                }
                input::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color:    rgba(255,255,255,0.6) !important;
                }
                input:-moz-placeholder { /* Mozilla Firefox 19+ */
                    color:    rgba(255,255,255,0.6) !important;
                }
                input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    color:    rgba(255,255,255,0.6) !important;
                }

                .tel_code {
                    box-sizing: border-box;
                    padding: 0.5rem 0.4rem;
                    width: 100%;
                }

                .img_code {
                    box-sizing: border-box;
                    padding: 0.5rem 0.4rem;
                    width: 6.7rem;
                    border-right: 1px solid white;
                }

                .update_img_code, .update_sms_code {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(0, 0, 0, 0);
                    font-size: 0.4rem;
                }

                .sms_code {
                    box-sizing: border-box;
                    padding: 0.5rem 0.4rem;
                    width: 6.7rem;
                    border-right: 1px solid white;
                }
            }

            .get_bill {
                width: 100%;
                height: 1.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(#15d6ff, #016eff);
                border-radius: 0.2rem;
                color: #fff;
                font-size: 0.42rem;
            }

        }
    }


</style>