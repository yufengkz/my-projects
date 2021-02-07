// import request from '../utils/request'

export function getUserData() {
    return new Promise(resolve => {
        resolve({
            areaSales: [
                {
                    order: '111111北京 +2222222222222%',
                    shop: '北京 -20%',
                    rider: '北京 -15%',
                    newShop: '北京 -9%',
                    avgOrder: '北京 -6%'
                },
                {
                    order: '上海222 -18%',
                    shop: '上海 -23%',
                    rider: '上海 -9%',
                    newShop: '上海 -4%',
                    avgOrder: '上海 +19%'
                },
                {
                    order: '广州 3333-10%',
                    shop: '广州 -7%',
                    rider: '广州 -22%',
                    newShop: '广州 +19%',
                    avgOrder: '广州 +10%'
                },
                {
                    order: '深圳44444 -2%',
                    shop: '深圳 -3%',
                    rider: '深圳 -15%',
                    newShop: '深圳 -22%',
                    avgOrder: '深圳 +16%'
                },
                {
                    order: '南京5555 +18%',
                    shop: '南京 -15%',
                    rider: '南京 +12%',
                    newShop: '南京 +7%',
                    avgOrder: '南京 +2%'
                },
                {
                    order: '杭州666 +17%',
                    shop: '杭州 -4%',
                    rider: '杭州 +21%',
                    newShop: '杭州 +10%',
                    avgOrder: '杭州 -20%'
                },
                {
                    order: '合肥777 -14%',
                    shop: '合肥 +16%',
                    rider: '合肥 +8%',
                    newShop: '合肥 +10%',
                    avgOrder: '合肥 +10%'
                },
                {
                    order: '济南 -19%',
                    shop: '济南 -7%',
                    rider: '济南 +5%',
                    newShop: '济南 +17%',
                    avgOrder: '济南 +16%'
                },
                {
                    order: '太原 -17%',
                    shop: '太原 -13%',
                    rider: '太原 +4%',
                    newShop: '太原 +8%',
                    avgOrder: '太原 +2%'
                },
                {
                    order: '成都 +22%',
                    shop: '成都 +12%',
                    rider: '成都 -23%',
                    newShop: '成都 -19%',
                    avgOrder: '成都 +6%'
                },
                {
                    order: '重庆 +3%',
                    shop: '重庆 -13%',
                    rider: '重庆 -11%',
                    newShop: '重庆 +15%',
                    avgOrder: '重庆 -21%'
                },
                {
                    order: '苏州 -21%',
                    shop: '苏州 -4%',
                    rider: '苏州 -12%',
                    newShop: '苏州 +6%',
                    avgOrder: '苏州 -20%'
                },
                {
                    order: '无锡 -7%',
                    shop: '无锡 +15%',
                    rider: '无锡 -21%',
                    newShop: '无锡 +6%',
                    avgOrder: '无锡 -22%'
                },
                {
                    order: '常州 -20%',
                    shop: '常州 +15%',
                    rider: '常州 +15%',
                    newShop: '常州 +21%',
                    avgOrder: '常州 -9%'
                },
                {
                    order: '温州 -6%',
                    shop: '温州 +18%',
                    rider: '温州 +13%',
                    newShop: '温州 +14%',
                    avgOrder: '温州 +10%'
                },
                {
                    order: '哈尔滨 +17%',
                    shop: '哈尔滨 +5%',
                    rider: '哈尔滨 +16%',
                    newShop: '哈尔滨 -18%',
                    avgOrder: '哈尔滨 -15%'
                },
                {
                    order: '长春 -12%',
                    shop: '长春 +18%',
                    rider: '长春 +13%',
                    newShop: '长春 -10%',
                    avgOrder: '长春 -18%'
                },
                {
                    order: '大连 +8%',
                    shop: '大连 -4%',
                    rider: '大连 -15%',
                    newShop: '大连 -20%',
                    avgOrder: '大连 +19%'
                },
                {
                    order: '沈阳 -2%',
                    shop: '沈阳 +6%',
                    rider: '沈阳 -6%',
                    newShop: '沈阳 -7%',
                    avgOrder: '沈阳 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },

                {
                    order: '北京 +22%',
                    shop: '北京 -20%',
                    rider: '北京 -15%',
                    newShop: '北京 -9%',
                    avgOrder: '北京 -6%'
                },
                {
                    order: '上海 -18%',
                    shop: '上海 -23%',
                    rider: '上海 -9%',
                    newShop: '上海 -4%',
                    avgOrder: '上海 +19%'
                },
                {
                    order: '广州 -10%',
                    shop: '广州 -7%',
                    rider: '广州 -22%',
                    newShop: '广州 +19%',
                    avgOrder: '广州 +10%'
                },
                {
                    order: '深圳 -2%',
                    shop: '深圳 -3%',
                    rider: '深圳 -15%',
                    newShop: '深圳 -22%',
                    avgOrder: '深圳 +16%'
                },
                {
                    order: '南京 +18%',
                    shop: '南京 -15%',
                    rider: '南京 +12%',
                    newShop: '南京 +7%',
                    avgOrder: '南京 +2%'
                },
                {
                    order: '杭州 +17%',
                    shop: '杭州 -4%',
                    rider: '杭州 +21%',
                    newShop: '杭州 +10%',
                    avgOrder: '杭州 -20%'
                },
                {
                    order: '合肥 -14%',
                    shop: '合肥 +16%',
                    rider: '合肥 +8%',
                    newShop: '合肥 +10%',
                    avgOrder: '合肥 +10%'
                },
                {
                    order: '济南 -19%',
                    shop: '济南 -7%',
                    rider: '济南 +5%',
                    newShop: '济南 +17%',
                    avgOrder: '济南 +16%'
                },
                {
                    order: '太原 -17%',
                    shop: '太原 -13%',
                    rider: '太原 +4%',
                    newShop: '太原 +8%',
                    avgOrder: '太原 +2%'
                },
                {
                    order: '成都 +22%',
                    shop: '成都 +12%',
                    rider: '成都 -23%',
                    newShop: '成都 -19%',
                    avgOrder: '成都 +6%'
                },
                {
                    order: '重庆 +3%',
                    shop: '重庆 -13%',
                    rider: '重庆 -11%',
                    newShop: '重庆 +15%',
                    avgOrder: '重庆 -21%'
                },
                {
                    order: '苏州 -21%',
                    shop: '苏州 -4%',
                    rider: '苏州 -12%',
                    newShop: '苏州 +6%',
                    avgOrder: '苏州 -20%'
                },
                {
                    order: '无锡 -7%',
                    shop: '无锡 +15%',
                    rider: '无锡 -21%',
                    newShop: '无锡 +6%',
                    avgOrder: '无锡 -22%'
                },
                {
                    order: '常州 -20%',
                    shop: '常州 +15%',
                    rider: '常州 +15%',
                    newShop: '常州 +21%',
                    avgOrder: '常州 -9%'
                },
                {
                    order: '温州 -6%',
                    shop: '温州 +18%',
                    rider: '温州 +13%',
                    newShop: '温州 +14%',
                    avgOrder: '温州 +10%'
                },
                {
                    order: '哈尔滨 +17%',
                    shop: '哈尔滨 +5%',
                    rider: '哈尔滨 +16%',
                    newShop: '哈尔滨 -18%',
                    avgOrder: '哈尔滨 -15%'
                },
                {
                    order: '长春 -12%',
                    shop: '长春 +18%',
                    rider: '长春 +13%',
                    newShop: '长春 -10%',
                    avgOrder: '长春 -18%'
                },
                {
                    order: '大连 +8%',
                    shop: '大连 -4%',
                    rider: '大连 -15%',
                    newShop: '大连 -20%',
                    avgOrder: '大连 +19%'
                },
                {
                    order: '沈阳 -2%',
                    shop: '沈阳 +6%',
                    rider: '沈阳 -6%',
                    newShop: '沈阳 -7%',
                    avgOrder: '沈阳 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                },
                {
                    order: '拉萨 -22%',
                    shop: '拉萨 -15%',
                    rider: '拉萨 +22%',
                    newShop: '拉萨 -14%',
                    avgOrder: '拉萨 -3%'
                },
                {
                    order: '呼和浩特 +9%',
                    shop: '呼和浩特 -18%',
                    rider: '呼和浩特 -12%',
                    newShop: '呼和浩特 +15%',
                    avgOrder: '呼和浩特 -7%'
                },
                {
                    order: '武汉 +5%',
                    shop: '武汉 -15%',
                    rider: '武汉 +20%',
                    newShop: '武汉 +13%',
                    avgOrder: '武汉 +17%'
                },
                {
                    order: '南宁 +16%',
                    shop: '南宁 +4%',
                    rider: '南宁 -3%',
                    newShop: '南宁 -19%',
                    avgOrder: '南宁 -10%'
                }
            ]
        })
    })
}
