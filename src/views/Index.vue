<template>
    <div id="index">
<!--        <iframe class="login_iframe" src="http://h5.mmarket.com/pps_webh5/getphone1/dist/index.html?type=2&yxbTest=true" frameborder="0"></iframe>-->
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    export default {
        name: "index",
        data() {
            return {}
        },
        created() {
            console.log(1);
            window.getphoneDone = this.getphoneDone;
        },
        methods: {
            ...mapMutations([
                'UPDATE_USERINFO'
            ]),
            getphoneDone(a, b) {
                if (a && b) {
                    this.UPDATE_USERINFO({pn: a, mask: b,login:true});
                    //跳转至账单页面
                    this.$router.push({name: 'carousel'})
                } else {
                    console.log('getphoneDone else')
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
        }


        .index_bg {
            display: block;
            width: 100%
        }
    }
</style>