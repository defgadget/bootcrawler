import { test, expect } from '@jest/globals'
import { sortPages } from "./report"

test('sort pages', () => {
	const pages = {
		"boot.dev": 2,
		"boot.dev/path": 5,
		"boot.dev/some": 3,
		"boot.dev/other": 1,
	}
	const sorted = sortPages(pages)
	let curr = 10000000
	for (const [_, count] of sorted) {
		expect(count).toBeLessThanOrEqual(curr)
		curr = count
	}
})
