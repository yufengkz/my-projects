var express = require('express')
var proxy = require('http-proxy-middleware')
var app = express()

//代理的接口地址
app.use(
    '/*',
    proxy({
        target: 'http://10.211.55.4:8880/',
        changeOrigin: true
        // pathRewrite: {
        //     '/sonar': ''
        // }
    })
)
// app.use('/down',proxy({
// 	target:'http://47.95.202.219:8001/download',
// 	changeOrigin:true,
// 	pathRewrite:{
// 		'^/download':''
// 	}
// }))
//设置静态资源根目录
app.use(express.static('static'))

app.listen(8880, function () {
    console.log('Server Running On http://192.168.41.80:8880')
})
