<template>
    <div>
        <swiper id="carousel" :options="swiperOption" ref="mySwiper"
                @slideChangeTransitionEnd="slideChangeTransitionEnd"
                @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide class="carousel">
                <img class="page_bg p0" :src="pages[0]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg p1" :src="pages[1]" alt="">
                <div class="bill_info">
                    <span class="year_2019 n1">
                        2019年
                    </span>
                    <span class="other_text n1">
                        您在
                        <span class="bill_data1" ref="bill_data1">{{bill_info.firstVisitDate}}</span>
                        第一次使用MM应用商场
                    </span>
                    <span class="year_2019 n2">
                        2019年
                    </span>
                    <span class="other_text n2">
                        您在MM下载的第一个应用
                        <span class="bill_data2" ref="bill_data2">{{bill_info.firstDwnApp}}</span>
                    </span>
                    <span class="year_2019 n3">
                        2019年
                    </span>
                    <span class="other_text n3">
                        我们一起走过了多少个日夜
                        <span class="bill_data3" ref="bill_data3">{{bill_info.activeDays}}</span>
                    </span>
                </div>
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg p2" :src="pages[2]" alt="">
                <div class="bill_info">
                    <span class="year_2019 n4">
                        2019年
                    </span>
                    <span class="other_text n4">
                        您一共访问了MM多少次
                        <span class="bill_data4" ref="bill_data4">{{bill_info.accessTimes}}</span>
                    </span>
                    <span class="year_2019 n5">
                        2019年
                    </span>
                    <span class="other_text n5">
                        您在下载了多少个应用
                        <span class="bill_data5" ref="bill_data5">{{bill_info.dwnAppCnt}}</span>
                    </span>
                    <span v-if="bill_info.isOrderFree" class="year_2019 n6">
                        2019年
                    </span>
                    <span v-if="bill_info.isOrderFree" class="other_text n6_1">
                        在MM
                        <span class="bill_data6_1" ref="bill_data6_1">{{bill_info.orderFreeDate}}</span>
                        订购了
                    </span>
                    <span v-if="bill_info.isOrderFree" class="other_text n6_2">
                        每月5GB应用下载服务
                    </span>
                    <span v-if="bill_info.isOrderFree" class="other_text n6_3">
                        为您节省了
                        <span class="bill_data6_2" ref="bill_data6_2">{{bill_info.economyFlow}}</span>
                        流量
                    </span>
                    <!--已订购没有下载量就显示这句-->
                    <span v-if="bill_info.isOrderFree && !bill_info.dwnCnt" class="other_text n6_4">
                        赶紧去MM应用商场下载应用吧
                    </span>
                    <span :class="{'noOrderFree':!bill_info.isOrderFree,'year_2019 n7':true,'download0':bill_info.isOrderFree && !bill_info.dwnCnt}">
                        2019年
                    </span>
                    <span :class="{'noOrderFree':!bill_info.isOrderFree,'other_text n7':true,'download0':bill_info.isOrderFree && !bill_info.dwnCnt}">
                        用MM下载应用节省了
                        <span class="bill_data7" ref="bill_data7">{{bill_info.dwnTime}}</span>
                    </span>
                </div>
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg p3" :src="pages[3]" alt="">

                <wordcloud
                        class="my_canvas"
                        :data="bill_info.dwnAppTags"
                        nameKey="name"
                        valueKey="value"
                        :color="'Category10'"
                        :showTooltip="false"
                        :spiral="'rectangular'"
                        :fontScale="'n'"
                        :wordPadding="0.01"
                        :fontSize="[10, 18]"
                        :rotate="{from: -60, to: 60, numOfOrientation: 10 }"
                        :wordClick="wordClickHandler">
                </wordcloud>

                <span class="bestLikeApp">{{bill_info.bestLikeApp}}</span>

            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg p4" :src="pages[4]" alt="">
                <span class="honor_title_1">{{honor_title}}</span>
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg p5" :src="pages[5]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg p6" :src="pages[6]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg p7" :src="pages[7]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <div id="img_content" ref="img_content">
                    <img class="page_bg p8" :src="pages[8]" alt="">
                    <span class="honor_title_2">{{honor_title}}</span>
                    <span class="slogan">{{slogan}}</span>
                </div>
                <img alt="" class="screenshot" ref="screenshot">
            </swiper-slide>
        </swiper>
                <img v-show="normal && !last_page" :src="require('../../public/img/guide.png')" alt="" class="guide">
    </div>

</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import wordcloud from 'vue-wordcloud'
    import html2canvas from 'html2canvas';
    import URL from '@/service.config.js'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: 'carrousel',
        components: {
            swiper,
            swiperSlide,
            wordcloud
        },
        data() {
            return {
                normal:false,
                last_page: 0,
                dataURL: '',
                level: [
                    '贤识学者',
                    '一代宗师',
                    '游戏猎人',
                    '元始天尊',
                    '斗战胜佛',
                    '传说斗神',
                    '超凡大师',
                    '江湖传说',
                    '武林盟主',
                    '傲世王者'
                ],
                pages: [
                    require('../../public/img/1.png'),
                    require('../../public/img/2.png'),
                    require('../../public/img/3.png'),
                    require('../../public/img/4.png'),
                    require('../../public/img/5.png'),
                    require('../../public/img/6.png'),
                    require('../../public/img/7.png'),
                    require('../../public/img/8.png'),
                    require('../../public/img/9.png')
                ],
                swiperOption: {
                    direction: 'vertical'
                },
                keyword_arr: [],
                bill_info: {
                    msisdn: '',
                    firstVisitDate: '',
                    firstDwnApp: '',
                    activeDays: '',
                    accessTimes: '',
                    dwnAppCnt: '',
                    isOrderFree: '',
                    orderFreeDate: '',
                    economyFlow: '',
                    dwnCnt: '',//总下载流量
                    dwnTime: '',
                    dwnAppTags: this.getRandomArr([
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        ""
                    ]),
                    bestLikeApp: ''
                }
            }
        },
        computed: {
            ...mapState([
                'userinfo'
            ]),
            honor_title() {
                let pnmask = this.userinfo.pnmask;
                return pnmask ? this.level[pnmask[pnmask.length - 1]] : this.level[0];
            },
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            slogan() {
                let slogans = [
                    '流行应用千万条，安全下载第一条！',
                    '皮皮虾，我们走，去下游戏，横着走！',
                    '大吉大利，今晚吃“机”！',
                    '热门应用，速来盘TA！',
                    '生活就要断舍离，可…放下手机，我太难了！',
                    '好嗨呦，绿色下载直达巅峰！',
                    '拒绝996，健康生活绿色下载！',
                    '绿色下载，雨女无瓜？快来MM，畅享安全！',
                    '用MM下应用，柠檬精都不酸啦！',
                    '硬核下载，不得不爱！'
                ];
                return slogans[parseInt(Math.random() * slogans.length)]
            }
        },
        created() {
            let self = this;
            // this.keyword_arr = this.getRandomArr([
            //     "新闻资讯",
            //     "生活助手",
            //     "通话通信",
            //     "娱乐八卦",
            //     "输入法",
            //     "旅游出行",
            //     "金融理财",
            //     "浏览器",
            //     "系统工具",
            //     "数字音乐",
            //     "社区交友",
            //     "美化壁纸",
            //     "网络购物",
            //     "影音工具",
            //     "商务办公",
            //     "交通导航",
            //     "健康医疗",
            //     "网络视频"
            // ]);
            // console.log(this.keyword_arr);

            //判断是否已有用户登录后的信息，否则跳转回首页
            if (sessionStorage.msisdn) {
                //  请求账单信息
                this.axios({
                    url: URL.get_bill,
                    method: "post",
                    data: {
                        msisdn: sessionStorage.msisdn
                    }
                })
                    .then((res) => {
                        // console.log('res=>',res);
                        if (res.data.resultCode == 0) {
                            this.normal = true;
                            //    请求账单信息成功
                            this.$nextTick((x) => {   //正确写法
                                this.bill_info.msisdn = res.data.data.msisdn;
                                this.bill_info.firstVisitDate = res.data.data.firstVisitDate;
                                this.bill_info.firstDwnApp = res.data.data.firstDwnApp;
                                this.bill_info.activeDays = res.data.data.activeDays;
                                this.bill_info.accessTimes = res.data.data.accessTimes;
                                this.bill_info.dwnAppCnt = res.data.data.dwnAppCnt;
                                this.bill_info.isOrderFree = res.data.data.isOrderFree;
                                this.bill_info.orderFreeDate = res.data.data.orderFreeDate;
                                this.bill_info.economyFlow = res.data.data.economyFlow;
                                this.bill_info.dwnTime = parseInt(res.data.data.dwnAppCnt) * 5 + '分钟';
                                this.bill_info.dwnAppTags = this.getRandomArr(res.data.data.dwnAppTags);
                                this.bill_info.bestLikeApp = res.data.data.bestLikeApp
                            })
                        } else {
                            this.normal = false;
                            //请求数据有误，首页禁止滑动
                            this.$nextTick((x) => {
                                $('.p0').parent().addClass("swiper-no-swiping");
                            });
                            this.$toast({
                                duration: 2000, // 持续展示 toast
                                forbidClick: true,
                                message: res.data.msg ? res.data.msg : '获取账单信息失败，请稍后重试！',
                                overlay: true
                            });
                        }
                    })
                    .catch(err => {
                        this.normal = false;
                        //请求数据有误，首页禁止滑动
                        this.$nextTick((x) => {
                            $('.p0').parent().addClass("swiper-no-swiping");
                        });
                        this.$toast({
                            duration: 2000, // 持续展示 toast
                            forbidClick: true,
                            message: err.msg ? err.msg : '获取账单信息失败，请稍后重试！',
                            overlay: true
                        });
                    });
            } else {
                function toIndex() {
                    self.$router.replace({name: 'index'})//会把login页的这条浏览历史记录清除掉
                }

                this.$toast({
                    duration: 2000, // 持续展示 toast
                    forbidClick: true,
                    message: '请先登录',
                    overlay: true,
                    onClose: toIndex
                });
            }
        },
        mounted() {
            let self = this;
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            // console.log('this is current swiper instance object', this.swiper);
        },
        methods: {
            ...mapMutations([
                'UPDATE_USERINFO'
            ]),
            toImage() {

                this.$nextTick((x) => {   //正确写法
                    html2canvas($('#img_content')[0], {
                        backgroundColor: null
                    }).then((canvas) => {
                        let dataURL = canvas.toDataURL("image/png");
                        this.dataURL = dataURL;
                        this.$refs.screenshot.src = this.dataURL;
                        console.log('转图完成');
                    });
                })
            },
            slideChangeTransitionEnd() {
                //  监听页面切换，发出响应请求
                // console.log(this.swiper.activeIndex);
                if (this.swiper.activeIndex == 8) {
                    this.toImage();
                    this.last_page = 1
                } else {
                    this.last_page = 0
                }
                // console.log(this.last_page)
            },
            callback() {
                console.log(1)
            },
            wordClickHandler(name, value, vm) {
                console.log('wordClickHandler', name, value, vm);
            },
            //打乱数组顺序
            getArrRandomly(arr) {
                var len = arr.length;
                for (var i = len - 1; i >= 0; i--) {
                    var randomIndex = Math.floor(Math.random() * (i + 1));
                    var itemIndex = arr[randomIndex];
                    arr[randomIndex] = arr[i];
                    arr[i] = itemIndex;
                }
                return arr;
            },

            //截取打乱后的数组的前10（num）位
            getRandomArr(arr = [], num = 10) {
                const tmpArr = this.getArrRandomly(arr);
                let list = [];
                for (let i = 0; i < num; i++) {
                    let temp_obj = {};
                    temp_obj.name = tmpArr[i];
                    temp_obj.value = i;
                    list.push(temp_obj);
                }
                ;
                return list;
            }

        }
    }
</script>

<style lang="scss">
    #app {
        background: #4ab2fa;
    }

    #carousel {
        position: relative;
        width: 100vw;
        height: 100vh;

        .carousel {
            /*position: relative;*/

            .page_bg {
                display: block;
                width: 100vw;
            }

            .page_bg.p0 {
                pointer-events: auto;
            }

            .bill_info {
                position: absolute;
                left: 50%;
                top: 0;
                bottom: 0;
                transform: translateX(-50%);
                width: 100vw;
                box-sizing: border-box;
                padding: 0 0.7rem;

                .year_2019 {
                    color: white;
                    font-size: 0.38rem;
                    position: absolute;
                }

                .year_2019.n1 {
                    top: 2.28rem
                }

                .year_2019.n2 {
                    top: 4.9rem
                }

                .year_2019.n3 {
                    top: 7.46rem
                }

                .year_2019.n4 {
                    top: 1.8rem
                }

                .year_2019.n5 {
                    top: 3.92rem
                }

                .year_2019.n6 {
                    top: 6.06rem
                }

                .year_2019.n7 {
                    top: 9.71rem
                }

                .year_2019.n7.noOrderFree {
                    top: 6.06rem
                }

                .year_2019.n7.download0 {
                    top: 10.02rem
                }

                .other_text {
                    color: white;
                    font-size: 0.38rem;
                    position: absolute;

                    .bill_data1 {
                        font-size: 0.58rem;
                        font-weight: bold;
                        color: #fae200;
                    }

                    .bill_data2 {
                        font-size: 0.38rem;
                        font-weight: bold;
                        color: #fbf800;
                    }

                    .bill_data3 {
                        font-size: 0.5rem;
                        font-weight: bold;
                        color: #fae200;
                    }

                    .bill_data4 {
                        font-size: 0.38rem;
                        font-weight: bold;
                        color: #fae000;
                    }

                    .bill_data5 {
                        font-size: 0.38rem;
                        font-weight: bold;
                        color: #fae000;
                    }

                    .bill_data6_1 {
                        font-size: 0.58rem;
                        font-weight: bold;
                        color: #fae300;
                    }

                    .bill_data6_2 {
                        font-size: 0.38rem;
                        font-weight: bold;
                        color: #fae000;
                    }

                    .bill_data7 {
                        font-size: 0.62rem;
                        font-weight: bold;
                        color: #fae000;
                    }
                }

                .other_text.n1 {
                    top: 2.87rem;
                }

                .other_text.n2 {
                    top: 5.69rem;
                }

                .other_text.n3 {
                    top: 8.1rem;
                }

                .other_text.n4 {
                    top: 2.55rem;
                }

                .other_text.n5 {
                    top: 4.67rem;
                }

                .other_text.n6_1 {
                    top: 6.65rem;
                }

                .other_text.n6_2 {
                    top: 7.55rem;
                }

                .other_text.n6_3 {
                    top: 8.28rem;
                }

                .other_text.n6_4 {
                    top: 9.05rem;
                    color: #fbf700;
                }

                .other_text.n7 {
                    top: 10.27rem;
                }

                .other_text.n7.noOrderFree {
                    top: 6.65rem
                }

                .other_text.n7.download0 {
                    top: 10.74rem
                }

            }

            .my_canvas {
                position: absolute;
                top: 5.3rem;
                width: 7.2rem;
                height: 5rem;
                left: 50%;
                transform: translateX(-50%);
                background: #ffffff;
            }

            .bestLikeApp {
                position: absolute;
                top: 16.71rem;
                left: 50%;
                -webkit-transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                -o-transform: translateX(-50%);
                transform: translateX(-50%);
                font-size: 0.32rem;
                font-weight: bold;
                color: #fcfdfe;
            }

            .honor_title_1 {
                position: absolute;
                top: 7rem;
                left: 52%;
                -webkit-transform: translateX(-50%);
                -moz-transform: translateX(-50%);
                -ms-transform: translateX(-50%);
                -o-transform: translateX(-50%);
                transform: translateX(-50%);
                font-size: 0.96rem;
                font-weight: bold;
                color: #edd749;
            }

            .honor_title_2 {
                position: absolute;
                top: 4.47rem;
                left: 1.32rem;
                font-size: 0.75rem;
                font-weight: bold;
                color: #1353ba;
            }

            .slogan {
                position: absolute;
                top: 6.37rem;
                left: 1.15rem;
                font-size: 0.56rem;
                font-weight: bold;
                color: #1353ba;
                display: inline-block;
                width: 8.48rem;
                word-wrap: break-word;
            }
        }

        .screenshot {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            width: 100vw;
            height: 100vh;
            opacity: 0;
            z-index: 1;
            pointer-events: auto;
        }

    }

    .guide {
        position: fixed;
        bottom: 0.2rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        width: 1rem;
    }

    /*插件bug*/
    div.tooltip {
        display: none;
    }
</style>