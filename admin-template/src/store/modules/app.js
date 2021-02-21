/* eslint-disable */
import Cookies from 'js-cookie'
import { getEnum } from '@/api/common'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus'),
            withoutAnimation: false
        },
        device: 'desktop',
        enum: {} // 枚举
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
            state.sidebar.withoutAnimation = false
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        },
        SET_ENUM: (state, obj) => {
            state.enum = obj
        },
        SET_RECORDS: (state, records) => {
            state.operateRecords = records
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        ToggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        },
        async GetEnum({ commit }) {
            const res = await getEnum()
            if (res.code === 200) {
                const enumFormatted = {}
                for (const item in res.data) {
                    if (Object.prototype.hasOwnProperty.call(res.data, item)) {
                        const options = []
                        for (const childItem in res.data[item]) {
                            if (Object.prototype.hasOwnProperty.call(res.data[item], childItem)) {
                                options.push({
                                    code: childItem,
                                    value: res.data[item][childItem]
                                })
                            }
                        }
                        enumFormatted[`${item}Options`] = options
                    }
                }
                enumFormatted.authResultOptions = enumFormatted.authRecordTypeOptions.concat([
                    {
                        code: '0',
                        value: '无'
                    }
                ])
                commit('SET_ENUM', Object.assign({}, enumFormatted, res.data))
            }
        }
    }
}

export default app
