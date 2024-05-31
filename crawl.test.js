import { test, expect } from '@jest/globals'
import { normalizeURL, getURLsFromHTML } from './crawl'

test('normalize url http://blog.boot.dev/path', () => {
	const url = "http://blog.boot.dev/path"
	const normalized = normalizeURL(url)
	const expected = "blog.boot.dev/path"
	expect(normalized).toBe(expected)
})
test('normalize url http://blog.boot.dev/path/', () => {
	const url = "http://blog.boot.dev/path/"
	const normalized = normalizeURL(url)
	const expected = "blog.boot.dev/path"
	expect(normalized).toBe(expected)
})
test('normalize url https://blog.boot.dev/path', () => {
	const url = "https://blog.boot.dev/path"
	const normalized = normalizeURL(url)
	const expected = "blog.boot.dev/path"
	expect(normalized).toBe(expected)
})
test('normalize url https://blog.boot.dev/path/', () => {
	const url = "https://blog.boot.dev/path/"
	const normalized = normalizeURL(url)
	const expected = "blog.boot.dev/path"
	expect(normalized).toBe(expected)
})
test('normalize url https://blog.boot.dev', () => {
	const url = "https://blog.boot.dev"
	const normalized = normalizeURL(url)
	const expected = "blog.boot.dev"
	expect(normalized).toBe(expected)
})
test('html with no anchor tags', () => {
	const html = '<html><body><h1>Heading</h1></body></html>'
	const links = getURLsFromHTML(html, "https://boot.dev")
	const expected = []
	expect(links).toStrictEqual(expected)
})

test('get single url link from getURLsFromHTML', () => {
	const html = '<html><body><h1>Heading</h1><a href="https://boot.dev"/></body></html>'
	const links = getURLsFromHTML(html, "https://boot.dev")
	const expected = ["https://boot.dev/"]
	expect(links).toStrictEqual(expected)
})

test('get multiple urls links from getURLsFromHTML', () => {
	const html = '<html><body><h1>Heading</h1><a href="https://boot.dev"/><a href="https://another.com" /></body></html>'
	const links = getURLsFromHTML(html, "https://boot.dev")
	const expected = ["https://boot.dev/", "https://another.com/"]
	expect(links).toStrictEqual(expected)

})

test('get single relative url link from getURLsFromHTML', () => {
	const html = '<html><body><h1>Heading</h1><a href="/path"/></body></html>'
	const links = getURLsFromHTML(html, "https://boot.dev")
	const expected = ["https://boot.dev/path"]
	expect(links).toStrictEqual(expected)
})

test('get multiple relative urls links from getURLsFromHTML', () => {
	const html = '<html><body><h1>Heading</h1><a href="/path"/><a href="/path2" /></body></html>'
	const links = getURLsFromHTML(html, "https://boot.dev")
	const expected = ["https://boot.dev/path", "https://boot.dev/path2"]
	expect(links).toStrictEqual(expected)

})


