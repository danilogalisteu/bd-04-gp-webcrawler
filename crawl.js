
const { JSDOM } = require('jsdom')


function normalizeURL(url) {
    const urlObj = new URL(url)
    let urlNorm = urlObj.hostname + urlObj.pathname
    if (urlNorm.length > 0) {
        if (urlNorm.slice(-1) === '/') {
            urlNorm = urlNorm.slice(0, -1)
        }
    }
    return urlNorm.toLowerCase()
}


function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody, {'url': baseURL})
    const alist = dom.window.document.querySelectorAll('a')
    const result = []
    for (anchor of alist) {
        link = anchor?.href
        if (link) {
            result.push(link)
        }
    }
    return result
}


module.exports = {
    normalizeURL,
    getURLsFromHTML
}
