<template>
    <div id="app">
        <!--        <keep-alive>-->
        <router-view/>
        <!--        </keep-alive>-->
    </div>
</template>
<script>
    import {customAnalysis,pvAnalysis} from '../public/lib/js/analysis'
    import URL from '@/service.config.js'

    export default {
        mounted(){

            if(1){             //如果MM打开

            }else if(2){       //如果必备打开

            }else if(3){       //如果白牌打开

            }else {       //如果其他客户端（端外）打开
                customAnalysis(URL.activity_id, URL.other_key, "", URL.dev);
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
        pointer-events: none;
    }
</style>
