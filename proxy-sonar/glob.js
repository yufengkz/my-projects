const glob = require('glob')
const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '')

const pages = glob.sync(dir + '/pages/*')

const entry = {}

pages.forEach(item => {
    let filename = item.substring(item.lastIndexOf('/') + 1, item.length)
    console.log(filename)
    // entry[filename] = { path: item }
    // entry[filename]['template'] = filename
    // console.log(entry)
    // if (fs.existsSync(item)) {
    //     let config = JSON.parse(fs.readFileSync(item, 'utf-8'))
    //     Object.assign(entry[filename], config)
    // }
    // console.log(entry)
})
