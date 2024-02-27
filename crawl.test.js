
const { test, expect } = require('@jest/globals')

const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


test('normalizeURL: remove protocol prefix', () => {
    expect(
        normalizeURL('http://www.google.com')
    ).toBe('www.google.com');
    expect(
        normalizeURL('https://www.google.com')
    ).toBe('www.google.com');
});

test('normalizeURL: remove user/pass and port', () => {
    expect(
        normalizeURL('https://user:pass@www.google.com')
    ).toBe('www.google.com');
    expect(
        normalizeURL('https://www.google.com:432')
    ).toBe('www.google.com');
    expect(
        normalizeURL('https://user:pass@www.google.com:432')
    ).toBe('www.google.com');
});

test('normalizeURL: paths', () => {
    expect(
        normalizeURL('https://www.google.com/about')
    ).toBe('www.google.com/about');
    expect(
        normalizeURL('https://www.google.com/search/howsearchworks/?fg=1')
    ).toBe('www.google.com/search/howsearchworks');
});

test('normalizeURL: search params', () => {
    expect(
        normalizeURL('https://www.google.com/search?query=JavaScript')
    ).toBe('www.google.com/search');
    expect(
        normalizeURL('https://www.google.com/search?q=JavaScript&sca_esv=85af15397c77c0f6&ei=VyHeZY_JN_rL1sQPtaytkAI&ved=0ahUKEwjP0J6Ci8yEAxX6pZUCHTVWCyIQ4dUDCBA&uact=5&oq=JavaScript')
    ).toBe('www.google.com/search');
});


test('getURLsFromHTML: none or empty URL', () => {
    expect(
        getURLsFromHTML('<html><body></body></html>', 'https://www.boot.dev')
    ).toHaveLength(0);
    expect(
        getURLsFromHTML('<html><body><a><span>Courses</span></a></body></html>', 'https://www.boot.dev')
    ).toHaveLength(0);
});

test('getURLsFromHTML: single URL, absolute and relative', () => {
    expect(
        getURLsFromHTML('<html><body><a href="https://www.boot.dev/tracks/backend"><span>Courses</span></a></body></html>', 'https://www.boot.dev')
    ).toEqual(['https://www.boot.dev/tracks/backend']);
    expect(
        getURLsFromHTML('<html><body><a href="/tracks/backend"><span>Courses</span></a></body></html>', 'https://www.boot.dev')
    ).toEqual(['https://www.boot.dev/tracks/backend']);
});

test('getURLsFromHTML: multiple URLs, absolute and relative', () => {
    expect(
        getURLsFromHTML('<html><body><a href="https://www.boot.dev/tracks/backend"><span>Courses</span></a><a href="https://www.boot.dev/pricing"><span>Pricing</span></a></body></html>', 'https://www.boot.dev')
    ).toEqual(['https://www.boot.dev/tracks/backend', 'https://www.boot.dev/pricing']);
    expect(
        getURLsFromHTML('<html><body><a href="/tracks/backend"><span>Courses</span></a><a href="/pricing"><span>Pricing</span></a></body></html>', 'https://www.boot.dev')
    ).toEqual(['https://www.boot.dev/tracks/backend', 'https://www.boot.dev/pricing']);
});
