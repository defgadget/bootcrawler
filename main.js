import { crawlPage } from "./crawl.js"
import { printReport } from "./report.js"
import { argv } from "node:process"
async function main() {
	if (argv.length > 3) {
		console.log("command only take 1 argument BASE_URL.")
		return
	} else if (argv.length < 3) {
		console.log("require argument BASE_URL to crawl")
		return
	}
	const baseURL = argv[2]
	console.log(`Crawling ${baseURL}`)
	const pages = await crawlPage(baseURL)
	printReport(pages)
}


await main()
