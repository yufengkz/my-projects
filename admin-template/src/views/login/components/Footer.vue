<template>
    <div class="footer">
        <div class="bottom">
            <span>版权所有© xxxxx有限公司</span>
            <span>系统管理基础框架</span>
            <span>
                <a href="">沪ICP备32131231231231232号-1</a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'commonfooter',
    data() {
        return {}
    },
    methods: {
        backtoTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0
        }
    },
    watch: {}
}
</script>

<style scoped lang="scss">
.footer {
    width: 100%;
    position: absolute;
    bottom: 30px;
    .bottom {
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: white;
        font-size: 14px;
        span {
            margin-left: 20px;
        }
    }
}
@media screen and (max-width: 992px) {
    .footer {
        z-index: 0;
        .bottom {
            display: block;
            text-align: center;
            color: white;
            font-size: 10px;
            span {
                display: block;
                margin-top: 5px;
            }
        }
    }
}
</style>
