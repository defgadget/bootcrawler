function normalizeURL(url) {
	const urlObj = new URL(url)
	const hostname = urlObj.hostname
	let path = urlObj.pathname
	if (path.endsWith("/")) {
		path = path.slice(0, path.length - 1)
	}
	return `${hostname}${path}`

}

export { normalizeURL }
