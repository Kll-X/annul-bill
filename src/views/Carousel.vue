<template>
    <swiper id="carousel" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
        <!-- slides -->
        <swiper-slide class="carousel" v-for="(page, index) in pages" :key="index">
            <img class="page" :src="page" alt="">
        </swiper-slide>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'

    export default {
        name: 'carrousel',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                pages: [
                    require('../../public/img/1.png'),
                    require('../../public/img/2.png'),
                    require('../../public/img/3.png'),
                    require('../../public/img/4.png'),
                    require('../../public/img/5.png'),
                    require('../../public/img/6.png'),
                    require('../../public/img/7.png'),
                    require('../../public/img/8.png')
                ],
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    direction: 'vertical'
                }
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            // current swiper instance
            // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
            console.log('this is current swiper instance object', this.swiper);
        },
        methods: {
            callback() {
                console.log(1)
            }
        }
    }
</script>

<style lang="scss">
    #app {
        background: #4ab2fa;
    }

    #carousel {
        /*position: relative;*/
        width: 100vw;
        height: 100vh;

        .carousel{
            position: relative;
            .page {
                display: block;
                width: 100vw;
            }
        }

    }
</style>