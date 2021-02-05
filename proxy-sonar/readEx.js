var express = require('express')
var csv = require('csvtojson')
const axios = require('axios')
const request = require('request')

var app = express()

const config = { maxContentLength: Infinity, maxBodyLength: Infinity }
// gelizhengce_all.csv
let database
const converter = csv()
    .fromFile('./static/gelizhengce_all.csv')
    .then(json => {
        // console.log(json)
        database = json
        // getToken
        request(
            {
                // url: 'http://192.168.41.80:3000/api/getToken', // 本地
                url: 'http://10.211.55.4:3000/api/getToken', // 虚拟机
                method: 'post', //请求方式，默认为get
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username: 'admin', password: '123456' })
            },
            function (error, response, data) {
                console.log('%c 🍗 error: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', error)
                console.log(JSON.parse(data))
                let res = JSON.parse(data)
                // console.log('%c 🍅 response: ', 'font-size:20px;background-color: #FCA650;color:#fff;', response)
                if (res.code === 0) {
                    console.log(res.code)
                    let token = res.data.token
                    request(
                        {
                            // url: 'http://192.168.41.80:3000/api/create', // 本地
                            url: 'http://10.211.55.4:3000/api/create', // 虚拟机
                            method: 'post', //请求方式，默认为get
                            headers: {
                                'content-type': 'application/json',
                                token
                            },
                            body: JSON.stringify(database) //post参数字符串
                        },
                        function (error, response, doc) {
                            console.log('%c 🥑 data: ', 'font-size:20px;background-color: #FCA650;color:#fff;', doc)
                            // console.log('%c 🍅 response: ', 'font-size:20px;background-color: #FCA650;color:#fff;', response)
                            console.log('%c 🍗 error: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', error)
                        }
                    )
                }
            }
        )
    })

//代理的接口地址
app.get('/', (req, res) => {
    res.send({
        data: database
    })
})
// app.use('/down',proxy({
// 	target:'http://47.95.202.219:8001/download',
// 	changeOrigin:true,
// 	pathRewrite:{
// 		'^/download':''
// 	}
// }))
//设置静态资源根目录
app.use(express.static('static'))

app.listen(8888, function () {
    console.log('Server Running On http://192.168.41.80:8888')
})
