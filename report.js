
function sortObject(obj) {
    const sortArray = []
    for (let item in obj) {
        sortArray.push([item, obj[item]])
    }
    sortArray.sort(function(a, b) {return b[1] - a[1]})
    return sortArray
}


function printReport(pages) {
    console.log('Starting report...')
    const reportArray = sortObject(pages)
    for (const item of reportArray) {
        console.log(`Found ${item[1]} internal links to ${item[0]}`)
    }
}


module.exports = {
    printReport
}
