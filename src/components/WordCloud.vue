<template>
    <div class="word-cloud-list">
        <div class="row" v-for="(rowItem, rowIndex) in row" :style="{top: 100/row*rowIndex + '%', width: 100 - Math.abs(rowIndex-(row-1)/2)*10+ '%'}">
            <div class="item" :style="getRandomCloudCss(rowIndex,index)" v-for="(item,index) in list.slice(columnNum*rowIndex,columnNum*(1+rowIndex))">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WordCloud",
        props: {
            list: Array,
            row: {
                type: Number,
                default: 4
            }
        },
        methods: {
            getRandomCloudCss(row, col) {
                let transX,transY, fontSize, opacity;
                transX = Math.random() - .5
                transY = .5*Math.random() - .25
                fontSize = .4*Math.random() + .8
                opacity = .5 + Math.random()
                return {
                    transform: 'translateX('+ transX +'rem) '+ 'translateY('+ transY +'rem)',
                    fontSize: fontSize + 'em',
                    opacity: opacity
                }
            },
        },
        computed: {
            columnNum() {
                return Math.ceil(this.list.length/this.row)
            }
        }
    }
</script>

<style scoped lang="scss">
    .word-cloud-list {
        font-size: .5rem;
        position: relative;
        display: flex;
        justify-content: center;
        .row{
            display: flex;
            justify-content: space-between;
            position: absolute;
            width: 100%;
            .item{
                color: white;
            }
        }
        .item-word-cloud{
            display: inline-block;
        }
    }
</style>
