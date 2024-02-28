
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
    const dom = new JSDOM(htmlBody)
    const alist = dom.window.document.querySelectorAll('a')
    const result = []
    for (anchor of alist) {
        const link = anchor?.href
        if (link) {
            // relative links must start with slash
            if (link[0] == '/') {
                result.push(new URL(link, baseURL).href)
            } else {
                try {
                    result.push(new URL(link).href)
                }
                catch (err) {
                    console.log(`${err.message}: ${link}`)
                }
            }
        }
    }
    return result
}


async function crawlPage(currentURL) {
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
