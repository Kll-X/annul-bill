<template>
    <div>
        <swiper id="carousel" :options="swiperOption" ref="mySwiper"
                @slideChangeTransitionEnd="slideChangeTransitionEnd"
                @someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[0]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[1]" alt="">
                <div class="bill_info">
                    <span class="year_2019 n1">
                        2019年
                    </span>
                    <span class="other_text n1">
                        您在
                        <span class="bill_data1">X月X日</span>
                        第一次使用MM应用商场
                    </span>
                    <span class="year_2019 n2">
                        2019年
                    </span>
                    <span class="other_text n2">
                        您在MM下载的第一个应用
                        <span class="bill_data2">XXXXXX</span>
                    </span>
                    <span class="year_2019 n3">
                        2019年
                    </span>
                    <span class="other_text n3">
                        我们一起走过了多少个日夜
                        <span class="bill_data3">286</span>
                    </span>
                </div>
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[2]" alt="">
                <div class="bill_info">
                    <span class="year_2019 n4">
                        2019年
                    </span>
                    <span class="other_text n4">
                        您一共访问了MM多少次
                        <span class="bill_data4">XXXXXX</span>
                    </span>
                    <span class="year_2019 n5">
                        2019年
                    </span>
                    <span class="other_text n5">
                        您在下载了多少个应用
                        <span class="bill_data5">XXXXXX</span>
                    </span>
                    <span class="year_2019 n6">
                        2019年
                    </span>
                    <span class="other_text n6_1">
                        在MM
                        <span class="bill_data6_1">X月X日</span>
                        订购了
                    </span>
                    <span class="other_text n6_2">
                        每月5GB应用下载服务
                    </span>
                    <span class="other_text n6_3">
                        为您节省了
                        <span class="bill_data6_2">XXXX</span>
                        流量
                    </span>
                    <span class="year_2019 n7">
                        2019年
                    </span>
                    <span class="other_text n7">
                        用MM下载应用节省了
                        <span class="bill_data7">多少时间</span>
                    </span>
                </div>
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[3]" alt="">

                <wordcloud
                        class="my_canvas"
                        :data="defaultWords"
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

                <span class="favor_item">{{favor_item}}</span>

            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[4]" alt="">
                <span class="honor_title_1">{{honor_title}}</span>
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[5]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[6]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <img class="page_bg" :src="pages[7]" alt="">
            </swiper-slide>
            <swiper-slide class="carousel">
                <div id="img_content" ref="img_content">
                    <img class="page_bg" :src="pages[8]" alt="">
                    <span class="honor_title_2">{{honor_title}}</span>
                    <span class="slogan">{{slogan}}</span>
                </div>
                <img alt="" class="last_page" ref="last_image">
            </swiper-slide>
        </swiper>
        <img v-show="!last_page" :src="require('../../public/img/guide.gif')" alt="" class="guide">
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
                last_page: 0,
                dataURL: '',
                favor_item: '影音娱乐',
                honor_title: '一代宗师',
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
                    direction: 'vertical',
                },
                keyword_arr: [
                    {name: '影音娱乐'}, {name: '拍摄美化'}, {name: '新闻阅读'}, {name: '金融理财'}, {name: '系统工具'},
                    {name: '网络购物'}, {name: '生活助手'}, {name: '旅游出行'}, {name: '社交通讯'}, {name: '商务办公'}, {name: '教育教学'},
                    {name: '运动健康'}, {name: '儿童应用'}, {name: '美化壁纸'}, {name: '儿童游戏'}, {name: '休闲益智'}, {name: '动作冒险'},
                    {name: '经营养成'}, {name: '体育赛车'}, {name: '角色扮演'}, {name: '文字游戏'}, {name: '疯狂跑酷'}, {name: '其他游戏'},
                    {name: '消除游戏'}, {name: '棋牌游戏'}, {name: '飞行射击'}, {name: '策略塔防'}, {name: '网络游戏'}, {name: '射击游戏'}
                ],

            }
        },
        computed: {
            ...mapState([
                'userinfo'
            ]),
            swiper() {
                return this.$refs.mySwiper.swiper
            },
            defaultWords() {
                return this.getRandomArr(this.keyword_arr)
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
            //判断是否已有用户登录后的信息，否则跳转回首页
            if (this.userinfo.login) {
                //  请求账单信息
                this.axios({
                    url: URL.getVerifyCode,
                    method: "get"
                })
                    .then(res => {

                    })
                    .catch(err => {

                    });
            } else {
                this.$router.push({name: 'index'})
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
                        this.$refs.last_image.src = this.dataURL;
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
                console.log(this.last_page)
            },
            callback() {
                console.log(1)
            },
            wordClickHandler(name, value, vm) {
                console.log('wordClickHandler', name, value, vm);
            },
            getRandomArr(arr) {
                var newArr = [];
                for (var i = 0; i < 10; i++) {
                    var idx = parseInt(Math.random() * arr.length);
                    arr[idx].value = i;
                    newArr.push(arr[idx]);
                    arr.splice(idx, 1)
                }
                // console.log(newArr);
                return newArr
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

                .other_text.n7 {
                    top: 10.27rem;
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

            .favor_item {
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
                left: 50%;
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

        .last_page {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: block;
            width: 100vw;
            height: 100vh;
            opacity: 0;
            z-index: 1
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