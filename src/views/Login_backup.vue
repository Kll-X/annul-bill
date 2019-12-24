<template>
    <div id="login">
        <img class="login_bg" ondragstart="return false" src="../../public/img/login_bg.png" alt="">
        <div class="input_group">
            <div class="item">
                <input placeholder="请输入电话号码" ref="tel_code" type="text" class="tel_code">
            </div>
            <div class="item">
                <input placeholder="请输入图像验证码" ref="img_code" type="text" class="img_code">
                <div class="update_img_code" @click.stop="update_img_code()">
                    <img ref="update_img_code"
                         src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577330437&di=aac4844d5e73df5fc98a1a915457d3e4&imgtype=jpg&er=1&src=http%3A%2F%2Fpic2.zhimg.com%2F206aeda3c64f00fff266b7be040fec7d_b.png"/>
                </div>
            </div>
            <div class="item">
                <input placeholder="请输入短信验证码" type="text" ref="sms_code" class="sms_code">
                <span data-forbid="false" ref="update_sms_code" class="update_sms_code"
                      @click.stop="update_sms_code($event)">获取验证码</span>
            </div>
            <div class="get_bill" @click.stop="get_bill()" ref="get_bill">
                获取账单
            </div>
        </div>
    </div>
</template>

<script>
    import URL from '@/service.config.js'
    import axios from "axios";

    export default {
        name: "login",
        data() {
            return {
                verifyId: ''
            }
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
                axios({
                    url: URL.getVerifyCode,
                    method: "get"
                })
                    .then(res => {
                        if (res.resultCode == 0) {
                            this.verifyId = res.data.verifyId ? res.data.verifyId : 111;
                            this.$nextTick(() => {
                                this.$refs.update_img_code.src = res.data.verifyCodeStr;
                            })
                        } else {
                            this.$toast('刷新图形验证码失败');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        this.$toast("刷新图形验证码失败");

                        // 测试更换图片验证码
                        this.$nextTick(() => {
                            this.$refs.update_img_code.src = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577331277&di=f397b64eb237c9ecf555065f60f6f240&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.zhuangjiba.com%2Fd%2Ffile%2Fhelp%2F2018%2F08%2Fcfdefaddb3f47d78f8c66a7de28720aa.png';
                        })
                    });
            },
            update_sms_code(e) {
                let self = this;
                //判断是否可点击
                // e.target.getAttribute('data-forbid');(获取属性)
                // this.$refs.update_sms_code.dataset.forbid(获取属性)
                // this.$refs.update_sms_code.dataset.forbid = true;(修改属性)

                if (this.$refs.update_sms_code.dataset.forbid == 'true') {
                    return;
                }
                //判断手机号是否填写规范
                if (!isMobile(this.$refs.tel_code.value)) {
                    this.$toast('请输入11位手机号码');
                    return;
                }
                //判断图像验证码是否填写规范
                if (isEmpty(this.$refs.img_code.value)) {
                    this.$toast('请输入正确的图片验证码');
                    return;
                }
                //触发请求下发短信
                this.$refs.update_sms_code.dataset.forbid == 'true';
                console.log(self.$refs.tel_code.value);
                axios({
                    url: URL.sendCode,
                    method: "post",
                    data: {
                        phone: getSingleRsa(self.$refs.tel_code.value),
                        verifyCode: $.trim(self.$refs.img_code.value),
                        verifyId: self.verifyId
                    }
                })
                    .then(res => {
                        this.$refs.update_sms_code.dataset.forbid == 'false';
                        if (res.status == 1) {
                            this.$toast(res.result);
                        } else {
                            //刷新图像验证码
                            this.update_img_code();
                            this.$toast(res.result);
                        }
                    })
                    .catch(err => {
                        this.$refs.update_sms_code.dataset.forbid == 'false';
                        console.log(err);
                        //刷新图像验证码
                        this.update_img_code();
                        this.$toast("短信验证码发送失败");
                    });
            },
            get_bill(e) {
                let self = this;

                if (URL.dev) {
                    if (this.$refs.get_bill.dataset.forbid == 'true') {
                        return;
                    }
                    //判断手机号是否填写规范
                    if (!isMobile(this.$refs.tel_code.value)) {
                        this.$toast('请输入11位手机号码');
                        return;
                    }
                    //判断图像验证码是否填写规范
                    if (isEmpty(this.$refs.sms_code.value)) {
                        this.$toast('请输入正确的短信验证码');
                        return;
                    }
                    //校检短信验证码
                    this.$refs.get_bill.dataset.forbid == 'true';
                    axios({
                        url: URL.accountVerifyCode,
                        method: "post",
                        data: {
                            phone: getSingleRsa(self.$refs.tel_code.value),
                            verify: $.trim(self.$refs.sms_code.value)
                        }
                    })
                        .then(res => {
                            if (res.status != 1) {
                                this.$refs.get_bill.dataset.forbid == 'false';
                                this.$toast('短信验证码有误，请重试！');
                                this.update_img_code();
                                return
                            } else {
                                //短信验证码校验正确，执行登录
                                axios({
                                    url: URL.accountLogin,
                                    method: "post",
                                    data: {
                                        mobile: getSingleRsa(self.$refs.tel_code.value)
                                    }
                                })
                                    .then(res => {
                                        this.$refs.get_bill.dataset.forbid == 'false';
                                        if (res.status != 1) {
                                            this.$toast('登陆失败，请重试！');
                                            this.update_img_code();
                                            return
                                        } else {
                                            //登录成功，跳转到轮播图页面
                                            function toCarousel() {
                                                self.$router.replace({name: 'carousel'})//会把login页的这条浏览历史记录清除掉
                                            }

                                            this.$toast({
                                                icon: 'success',
                                                duration: 1000, // 持续展示 toast
                                                forbidClick: true,
                                                message: '登录成功',
                                                overlay: true,
                                                onClose: toCarousel
                                            });
                                        }
                                    })
                                    .catch(err => {
                                        this.$refs.get_bill.dataset.forbid == 'false';
                                        console.log(err);
                                        //刷新图像验证码
                                        this.update_img_code();
                                        this.$toast("短信验证码发送失败");
                                    });
                            }
                        })
                        .catch(err => {
                            this.$refs.get_bill.dataset.forbid == 'false';
                            console.log(err);
                            //刷新图像验证码
                            this.update_img_code();
                            this.$toast("短信验证码发送失败");
                        });
                }else{
                    function toCarousel() {
                        self.$router.replace({name: 'carousel'})//会把login页的这条浏览历史记录清除掉
                    }

                    this.$toast({
                        icon: 'success',
                        duration: 1000, // 持续展示 toast
                        forbidClick: true,
                        message: '登录成功',
                        overlay: true,
                        onClose: toCarousel
                    });
                }


            }
        },
        mounted() {
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
            display: block;
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
                    color: rgba(255, 255, 255, 0.6) !important;
                }

                input::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: rgba(255, 255, 255, 0.6) !important;
                }

                input:-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: rgba(255, 255, 255, 0.6) !important;
                }

                input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    color: rgba(255, 255, 255, 0.6) !important;
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
                }

                .update_img_code, .update_sms_code {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: rgba(0, 0, 0, 0);
                    font-size: 0.4rem;
                }

                .update_img_code img {
                    width: 100%;
                    height: 100%;
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