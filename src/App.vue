<template>
    <div id="app">
        <!--        <keep-alive>-->
        <router-view/>
        <!--        </keep-alive>-->
    </div>
</template>
<script>
    export default {
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
