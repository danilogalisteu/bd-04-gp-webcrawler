
function sortObjectByValue(obj, ascending=true) {
    const sortArray = []
    for (let item in obj) {
        sortArray.push([item, obj[item]])
    }
    if (ascending) {
        sortArray.sort(function(a, b) {return a[1] - b[1]})
    } else {
        sortArray.sort(function(a, b) {return b[1] - a[1]})
    }
    return sortArray
}


function printReport(pages) {
    console.log('Starting report...')
    const reportArray = sortObjectByValue(pages, ascending=false)
    for (const item of reportArray) {
        console.log(`Found ${item[1]} internal links to ${item[0]}`)
    }
}


module.exports = {
    sortObjectByValue, 
    printReport
}
