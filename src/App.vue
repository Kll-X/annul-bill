<template>
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>
</template>

<style lang="scss">
    #app {
        width: 100vw;
        height: 100vh
    }

    img {
        pointer-events: none;
    }
</style>
