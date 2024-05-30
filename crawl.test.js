import { test, expect } from '@jest/globals'
import { normalizeURL } from './crawl'

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

