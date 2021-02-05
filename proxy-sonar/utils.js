const getResourceContent = async function (page, url) {
    const { content, base64Encoded } = await page._client.send('Page.getResourceContent', { frameId: String(page.mainFrame()._id), url })
    assert.equal(base64Encoded, true)
    return content
}

module.exports = getResourceContent
