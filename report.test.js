
const { test, expect } = require('@jest/globals')

const { sortObjectByValue } = require('./report.js')


test('sortObjectByValue: empty object', () => {
    let emptyObj = new Object()
    expect(
        sortObjectByValue(emptyObj)
    ).toEqual([]);
});

test('sortObjectByValue: ascending and descending sort', () => {
    let simpleObj = new Object()
    simpleObj['min'] = 0.0
    simpleObj['mid'] = 1.0
    simpleObj['max'] = 2.0
    expect(
        sortObjectByValue(simpleObj, ascending=true)
    ).toEqual([['min', 0], ['mid', 1], ['max', 2]]);
    expect(
        sortObjectByValue(simpleObj, ascending=false)
    ).toEqual([['max', 2], ['mid', 1], ['min', 0]]);
});
