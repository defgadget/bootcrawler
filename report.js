function printReport(pages) {
	console.log("..... Printing report .....")
	const sorted = sortPages(pages)
	for (const [page, count] of sorted) {
		console.log(`Found ${count} internal links to ${page}`)
	}
	console.log("..... End of Report .....")
}

function sortPages(pages) {
	const pagesArrOfArrays = Object.entries(pages)
	const sorted = pagesArrOfArrays.sort((a, b) => {
		return b[1] - a[1]
	})
	return sorted

}

export { printReport, sortPages }
