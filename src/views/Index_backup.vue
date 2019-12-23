<template>
    <div id="index">
        <img class="index_bg" ondragstart="return false" src="../../public/img/index_bg.png" alt="">
        <span class="next_btn" @click.stop="next_btn"></span>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {}
        },
        methods: {
            next_btn(a,b) {
                console.log(a,b);
                this.$router.push({name: 'carousel'})
            }
        },
        created() {
            window.next_btn = this.next_btn;
        }
    }
</script>

<style lang="scss">
    #app {
        background: #61a8f6;
    }

    #index {
        position: relative;

        .index_bg {
            display: block;
            width: 100%
        }

        .next_btn {
            background: rgba(0, 0, 0, 0);
            position: absolute;
            bottom: 2.13rem;
            width: 3.84rem;
            height: 1rem;
            left: 50%;
            border-radius: 5px;
            -webkit-transform: translateX(-50%);
            -moz-transform: translateX(-50%);
            transform: translateX(-50%);
        }
    }
</style>