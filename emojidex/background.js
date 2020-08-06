const emojiStore = new Map();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { code } = message
    if (emojiStore.has(code)) {
        sendResponse(emojiStore.get(code))
        return true
    }
    fetch('https://www.emojidex.com/api/v1/emoji/' + code)
        .then(async response => {
            if (response.ok) {
                const data = await response.json()
                sendResponse(data.moji)
                emojiStore.set(code, data.moji)
                return
            }
            sendResponse(false)
        })

    return true
})
