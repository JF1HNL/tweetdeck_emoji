chrome.extension.getBackgroundPage().console.log(document.querySelector('#push'));
localStorage.setItem('test', 0)
document.querySelector('#inc').addEventListener("click", () => localStorage.setItem('test', 1))
document.querySelector('#dec').addEventListener("click", () => localStorage.setItem('test', -1))
document.querySelector('#emoji').value = localStorage.getItem('tweetdeck_emoji-emojiStore')