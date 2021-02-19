<template>
    <div class="headers-nav">
        <div class="home-wrap-header">
            <div class="home-wrap-nav-img" @click="jumpPagehome">
                <!-- NavBar -->
                <!-- <img @click="jumpPagehome" alt="logo" src="@/assets/SinoCapital.png"> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeadersNav',
    data() {
        return {}
    },
    methods: {
        jumpPagehome() {
            // 跳转首页面
            if (event.stopPropagation) {
                // 针对 Mozilla 和 Opera
                event.stopPropagation()
            } else if (window.event) {
                // 针对 IE
                window.event.cancelBubble = true
            }
            this.$router.push('/')
        }
        // onUserSelectChanges(value) {
        //   this.$emit('change', value)
        // }
    }
}
</script>
<style lang="scss" scoped>
.headers-nav {
    width: 100%;
    position: absolute;
    top: 30px;
    z-index: 3;
    .home-wrap-header {
        margin-left: 12%;
        display: flex;
        flex-direction: row;
        align-items: center;
        align-content: center;
        .home-wrap-nav {
            margin: 0 auto;
            height: 40px;
            margin-bottom: 2px;
            line-height: 80px;
        }
        .home-wrap-nav-img {
            font-size: 38px;
            // width: 280px;
            height: 48px;
            img {
                height: 48px;
                // width: 100%;
                cursor: pointer;
            }
        }
        .divider {
            width: 1px;
            height: 28px;
            background: white;
            margin-left: 20px;
            margin-right: 20px;
        }
        .sel-dropdown {
            margin-left: 40px;
            margin-bottom: 4px;
            width: 120px;
            border-radius: 1px;
            border: 1px solid #256fca;
            background: #256fca;
            background-color: #256fca;
        }
    }
}
// .header-dropdown {
//   .el-dropdown-menu__item {
//     font-size: 12px;
//     line-height: 25px;
//     cursor: default;
//     width: 180px;
//     word-break: break-all;
//   }
//   .el-dropdown-menu__item :last-child {
//     cursor: pointer;
//   }
//   .el-dropdown-menu__item:hover,
//   .el-dropdown-menu__item:active {
//     color: #606266;
//     background: #fff;
//   }

//   .el-dropdown-menu__item.clickable:hover {
//     color: #0094ff;
//   }
// }
@media screen and (max-width: 992px) {
    .headers-nav {
        position: relative;
        top: 20px;
        .home-wrap-header {
            margin: 0;
            justify-content: center;
        }
    }
}
</style>
<style lang="scss">
.sel-dropdown {
    .el-input__inner {
        -webkit-appearance: none;
        background-color: transparent;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #ffffff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: white;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
    }
}
</style>
