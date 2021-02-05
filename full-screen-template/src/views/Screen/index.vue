<template>
    <div class="container">
        <loading v-if="!ready">Loading...</loading>
        <container :options="{ width: 3840, height: 2160 }" v-else>
            <div class="header">
                header
            </div>
            <div class="center">
                <div class="left">left</div>
                <div class="right">right</div>
            </div>
        </container>
    </div>
</template>

<script>
/* eslint-disable */
import { ref, getCurrentInstance } from 'vue'
import Loading from '../../components/Loading'
import Container from '../../components/Container'

export default {
    components: {
        Loading,
        Container
    },
    setup() {
        const context = getCurrentInstance().ctx
        const ready = ref(true)

        return {
            ready
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    // background-color: rgb(50, 47, 48);
    background: rgb(29, 29, 29);
    color: #fff;
    font-size: 48px;

    #screen-container {
        display: flex;
        flex-direction: column;

        .header {
            height: 167px;
            margin-top: 10px;
            background: #ccc;
        }

        .center {
            margin-top: 20px;
            flex: 1;
            display: flex;

            .left {
                flex: 0 0 860px;
                display: flex;
                flex-direction: column;
                width: 860px;
                height: 100%;
                margin: 0 10px;
                box-sizing: border-box;
                background: rgb(60, 61, 64);
            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                margin: 0 10px;
                max-width: 2960px;
                overflow: hidden;
                background: #ccc;
            }
        }
    }
}
</style>
