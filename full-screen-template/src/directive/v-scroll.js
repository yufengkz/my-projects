/**
 * desc: 单条向上无缝滚动  or https://github.com/chenxuan0000/vue-seamless-scroll
 */
/* eslint-disable camelcase */
import Vue from 'vue'

Vue.directive('newscroll', {
    bind(el, binding, vnode) {
        // 进行一次性初始化设置
        console.log('bind')
    },

    inseted(el, binding, vnode) {
        console.log('inseted')
    },
    update(el, binding, vnode) {
        console.log('update')

        const sel = el // 该滚动元素
        const die_h = binding.value.oH // 固定死的高度

        let step = 0 // 一小步的距离
        let timer_b = null // 循环每个li
        let timer_s = null //  一个li循环高度++

        if (binding.oldValue.oH !== binding.value.oH) {
            console.log('只调用一次')
            if (timer_b) clearTimeout(timer_b)
            cycle()
        }

        function cycle() {
            if (timer_b) clearTimeout(timer_b)
            timer_b = setTimeout(function() {
                scroll()
            }, 2000)
        }

        function scroll() {
            cancelAnimationFrame(timer_s)
            timer_s = requestAnimationFrame(function fn() {
                if (Math.abs(step) >= die_h) {
                    cancelAnimationFrame(timer_s)
                    step = 0
                    sel.style.marginTop = 0
                    sel.appendChild(sel.firstChild)
                    cycle()
                } else {
                    step--
                    sel.style.marginTop = `${step}px`
                    timer_s = requestAnimationFrame(fn)
                }
            })
        }
    },

    componentUpdated() {
        console.log('组件更新完成')
    },

    unbind() {
        console.log('解绑')
    }
})

/**
 * mounted () {
        this.oH = this.$refs.wrap.offsetHeight;
    },

    directives: {
        "v-newscroll": require('../_common/directives/v-newscroll.js')
    }
 */
