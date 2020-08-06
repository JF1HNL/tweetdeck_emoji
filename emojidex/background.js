const map = new Map();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { code } = message;
    if (map.has(code)) {
        sendResponse(map.get(code))
        return true;
    }
    fetch('https://www.emojidex.com/api/v1/emoji/' + code)
        .then(async response => {
            if (response.ok) {
                const data = await response.json()
                sendResponse(data.moji)
                map.set(code, data.moji)
                return;
            }
            sendResponse(false)
        })

    return true;
})
