import { JSDOM } from 'jsdom'

function normalizeURL(url) {
	const urlObj = new URL(url)
	const hostname = urlObj.hostname
	let path = urlObj.pathname
	if (path.endsWith("/")) {
		path = path.slice(0, path.length - 1)
	}
	return `${hostname}${path}`

}

function getURLsFromHTML(htmlBody, baseURL) {
	if (baseURL.endsWith("/")) {
		baseURL = baseURL.slice(0, baseURL.length - 1)
	}
	const dom = new JSDOM(htmlBody)
	const anchor_tags = dom.window.document.querySelectorAll("a")
	let urls = []
	for (let a of anchor_tags) {

		if (a.href.startsWith("/")) {
			urls.push(`${baseURL}${a.href}`)
		} else {
			urls.push(a.href)
		}
	}
	return urls
}

async function fetchAndParseHTML(url) {
	let resp = null
	try {
		const urlObj = new URL(url)
		urlObj.search = ''
		url = urlObj.toString()
		resp = await fetch(url)
	} catch (err) {
		console.log("encountered an error:", err.message, url)
		return
	}

	if (resp.status >= 400) {
		console.log("request failed with status", resp.status)
		return
	}

	const contentType = resp.headers.get("Content-Type")
	if (!contentType.includes("text/html")) {
		return
	}
	const html = await resp.text()
	return html
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
	// let currentURLObj = null
	// let baseURLObj = null
	// try {
	// 	baseURLObj = new URL(baseURL)
	// 	currentURLObj = new URL(currentURL)
	// 	if (baseURLObj.hostname != currentURLObj.hostname) {
	// 		return pages
	// 	}
	// } catch (err) {
	// 	console.log(`base: ${baseURLObj.toString} -- current: ${currentURLObj.toString}`)
	// 	console.log(`failed to parse URL ${err.message}`)
	// 	return pages
	// }
	if (!currentURL.startsWith(baseURL)) {
		return pages
	}
	const url = normalizeURL(currentURL)
	if (pages[url]) {
		pages[url]++
		return pages
	} else {
		console.log(`first visit to ${url}`)
		pages[url] = 1
	}

	const html = await fetchAndParseHTML(currentURL)
	const urls = getURLsFromHTML(html, baseURL)
	for (let next of urls) {
		pages = await crawlPage(baseURL, next, pages)
	}
	return pages
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

export { crawlPage, normalizeURL, getURLsFromHTML }
