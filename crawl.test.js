
const { test, expect } = require('@jest/globals')

const { normalizeURL } = require('./crawl.js')


test('remove protocol prefix', () => {
    expect(
        normalizeURL('http://www.google.com')
    ).toBe('www.google.com/');
    expect(
        normalizeURL('https://www.google.com')
    ).toBe('www.google.com/');
});

test('remove user/pass and port', () => {
    expect(
        normalizeURL('https://user:pass@www.google.com')
    ).toBe('www.google.com/');
    expect(
        normalizeURL('https://www.google.com:432')
    ).toBe('www.google.com/');
    expect(
        normalizeURL('https://user:pass@www.google.com:432')
    ).toBe('www.google.com/');
});

test('paths', () => {
    expect(
        normalizeURL('https://www.google.com/about')
    ).toBe('www.google.com/about');
    expect(
        normalizeURL('https://www.google.com/search/howsearchworks/?fg=1')
    ).toBe('www.google.com/search/howsearchworks/');
});

test('search params', () => {
    expect(
        normalizeURL('https://www.google.com/search?query=JavaScript')
    ).toBe('www.google.com/search');
    expect(
        normalizeURL('https://www.google.com/search?q=JavaScript&sca_esv=85af15397c77c0f6&ei=VyHeZY_JN_rL1sQPtaytkAI&ved=0ahUKEwjP0J6Ci8yEAxX6pZUCHTVWCyIQ4dUDCBA&uact=5&oq=JavaScript')
    ).toBe('www.google.com/search');
});
