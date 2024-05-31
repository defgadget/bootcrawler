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
	const dom = new JSDOM(htmlBody)
	const anchor_tags = dom.window.document.querySelectorAll("a")
	let urls = []
	for (let a of anchor_tags) {

		if (!URL.canParse(a.href) && !a.href.includes(baseURL)) {
			urls.push(`${baseURL}${a.href}`)
		} else {
			urls.push(a.href)
		}
	}
	return urls
}


export { normalizeURL, getURLsFromHTML }
