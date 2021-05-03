const mapToObject = map =>
	[...map].reduce((l,[k,v]) => Object.assign(l, {[k]:v}), {})
const objectToMap = object =>
	new Map(Object.entries(object))
const nullToStr = (emoji) => emoji === null ? "🙅‍♂️" : emoji
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	const localStorageData = localStorage.getItem('tweetdeck_emoji-emojiStore')
	const emojiStore = localStorageData ? objectToMap(JSON.parse(localStorageData)) : new Map()
	const { code } = message
	if (emojiStore.has(code)) {
		sendResponse(nullToStr(emojiStore.get(code)))
		return true
	}
	fetch('https://www.emojidex.com/api/v1/emoji/' + code)
		.then(async response => {
			if (response.ok) {
				const data = await response.json()
				sendResponse(nullToStr(data.moji))
				emojiStore.set(code, data.moji)
				localStorage.setItem('tweetdeck_emoji-emojiStore',　JSON.stringify(mapToObject(emojiStore)))
				return
			}
			sendResponse("🙅‍♀️")
		})

	return true
})
