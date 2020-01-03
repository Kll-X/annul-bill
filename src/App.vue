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
        created() {
            if (!is_ios()){
                location.href = "mm://launchbrowser?url=http%3A%2F%2Fodp.mmarket.com%3FdispatchUrl="+ encodeURIComponent('http://h5.mmarket.com/pps_webh5/annual-bill/dist/')
            }
            function is_ios() {
                var u = navigator.userAgent;
                // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isiOS) {
                  return true;
                } else {
                  return false;
                }
            }
        },
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
        pointer-events: none;  //使用这个样式后，导致图片监听触碰会被屏蔽
    }
</style>
