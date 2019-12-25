<template>
    <div id="app">
        <!--        <keep-alive>-->
        <router-view/>
        <!--        </keep-alive>-->
    </div>
</template>
<script>
    import {customAnalysis, pvAnalysis} from '../public/lib/js/analysis'
    import URL from '@/service.config.js'

    export default {
        mounted() {
            //添加预埋统计
            pvAnalysis(URL.activity_id, "", URL.dev);
            if (window.androidmm) {
                if (window.androidmm.openMusic) {// MM客户端
                    customAnalysis(URL.activity_id, URL.mm_key, "", URL.dev);
                } else {//必备客户端
                    customAnalysis(URL.activity_id, URL.bibei_key, "", URL.dev);
                }
            } else if (window.openApp) {//白牌机
                customAnalysis(URL.activity_id, URL.baipai_key, "", URL.dev);
            } else {//端外
                customAnalysis(URL.activity_id, URL.other_key, "", URL.dev);
            }
        }
    }
</script>
<style lang="scss">
    #app {
        width: 100vw;
        height: 100vh
    }

    img {
        /*pointer-events: none;*/  //使用这个样式后，影响到图片不能监听被点击或者长按
    }
</style>
