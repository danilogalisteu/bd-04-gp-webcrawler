
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


async function crawlPage(baseURL, currentURL, pages, verbose=false) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname != currentURLObj.hostname) {
        if (verbose) {
            console.log(`URL from a different domain: ${currentURL}`)
        }
        return pages
    }

    const baseNormURL = normalizeURL(baseURL)
    const currentNormURL = normalizeURL(currentURL)
    if (currentNormURL in pages) {
        if (verbose) {
            console.log(`URL was already crawled: ${currentURL} [${pages[currentNormURL]}]`)
        }
        pages[currentNormURL] += 1
        return pages
    }
    if (currentNormURL == baseNormURL) {
        pages[currentNormURL] = 0
    } else {
        pages[currentNormURL] = 1
    }

    try {
        if (verbose) {
            console.log(`fetching ${currentURL}...`)
        }
        const response = await fetch(currentURL)
        const status = response.status
        if (status >= 400) {
            if (verbose) {
                console.log(`fetch response error on ${currentURL}: ${status}`)
            }
            return pages
        }
        const ctype = response.headers.get('content-type')
        if (!ctype.includes('text/html')) {
            if (verbose) {
                console.log(`fetch content error on ${currentURL}: ${ctype}`)
            }
            return pages
        }
        const content = await response.text()
        const links = getURLsFromHTML(content, baseURL)
        for (const link of links) {
            pages = await crawlPage(baseURL, link, pages)
        }
    }
    catch (err) {
        if (verbose) {
            console.log(`fetch error on ${currentURL}: ${err}`)
        }
    }
    return pages
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
