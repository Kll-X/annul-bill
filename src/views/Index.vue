<template>
    <div id="index">
<!--        <iframe class="login_iframe" :src="getphone1_src" frameborder="0"></iframe>-->
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import URL from '@/service.config.js'

    export default {
        name: "index",
        data() {
            return {}
        },
        computed:{
            getphone1_src(){
                return URL.getphone1_src
            }
        },
        created() {
            console.log(1);
            window.getphoneDone = this.getphoneDone;
        },
        methods: {
            ...mapMutations([
                'UPDATE_USERINFO'
            ]),
            getphoneDone(obj) {
                if (obj.pn && obj.pnmask) {
                    this.UPDATE_USERINFO({pn: obj.pn, pnmask: obj.pnmask});
                    sessionStorage.msisdn = obj.pn;
                    //跳转至账单页面
                    this.$router.push({name: 'carousel'})
                } else {
                    console.log('getphoneDone fail',arguments);
                }
            }
        }
    }
</script>

<style lang="scss">
    #app {
        background: #61a8f6;
    }

    #index {
        position: relative;


        .login_iframe{
            width: 100vw;
            height: 100vh;
            position: relative;
        }


        .index_bg {
            display: block;
            width: 100%
        }
    }
</style>
