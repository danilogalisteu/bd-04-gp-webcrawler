
const { argv } = require('node:process');

const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


async function main() {
    if (argv.length < 3) {
        console.log('too few arguments')
        return
    }
    if (argv.length > 3) {
        console.log('too many arguments')
        return
    }
    const baseURL = argv[2]
    console.log(`webcrawler is starting at "${baseURL}"`)
    let pages = new Object()
    pages = await crawlPage(baseURL, baseURL, pages)
    printReport(pages)
}


main()
