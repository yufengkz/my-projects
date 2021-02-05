const puppeteer = require('puppeteer')
const fs = require('fs')
const e = require('express')

const loginUrl = 'https://account.wps.cn/?cb=https%3A%2F%2Ff.wps.cn%2Ffw%2FqGWl38rq%3F_%3D1611799625045&from=&reload=true&qrcode=kdocs'

const login = async () => {
    const browser = await puppeteer.launch({ headless: false })
    // 登录页
    const page = await browser.newPage()
    page.setViewport({ width: 1366, height: 1000 })
    await page.goto(loginUrl)

    // 操作登录按钮 id = wechat
    // 获取元素并选择登录方式
    // 微信登录
    // const chooseLoginBtn = await page.$('#wechat')
    // chooseLoginBtn.click()
    // 选择手机账号登录 class = f_icon account
    await page.waitForSelector('.account')
    const accountBtn = await page.$('.account')
    accountBtn.click()
    // 同意协议（延时获取）
    const agreeBtn = await page.waitForSelector('#dialog .dialog-footer-ok')
    agreeBtn.click()

    // 写入登录信息 id = email || mobile

    // 写入密码

    // const src = await page.$eval('.account', el => el.innerHTML)
    // console.log(src)
    // socket通信？ 通信成功后再往下执行表单提交
    // form  ul = src-form-pc-pages-form-write-index__form-list
    // await page.waitForSelector('.src-form-pc-pages-form-write-index__form-list')
    // const form = await page.$eval('.src-form-pc-pages-form-write-index__form-list', el => el.innerHTML)
    // console.log('%c 🍫 form: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', form)

    // await browser.close() page.frames()
}

login()
