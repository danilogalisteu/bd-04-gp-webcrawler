
const { JSDOM } = require('jsdom')


function normalizeURL(url) {
    const urlObj = new URL(url)
    let urlNorm = urlObj.hostname + urlObj.pathname
    if (urlNorm.length > 0) {
        if (urlNorm.slice(-1) === '/') {
            urlNorm = urlNorm.slice(0, -1)
        }
    }
    return urlNorm
}


function getURLsFromHTML(htmlBody, baseURL) {
    return []
}


module.exports = {
    normalizeURL,
    getURLsFromHTML
}
