chrome.extension.getBackgroundPage().console.log(document.querySelector('#emojiStore'));
localStorage.setItem('test', 0)
document.querySelector('#inc').addEventListener("click", () => localStorage.setItem('test', 1))
document.querySelector('#dec').addEventListener("click", () => localStorage.setItem('test', -1))
const emojiStore =  localStorage.getItem('tweetdeck_emoji-emojiStore')
document.querySelector('#emojiStore').value = emojiStore ? emojiStore.replace("{", "{\n").replace("}", "\n}").replace(/,/g, ",\n") : ""
document.querySelector('#emojiRegister').addEventListener("click", () => {
  const str = document.querySelector('#emojiStore').value
  chrome.extension.getBackgroundPage().console.log(JSON.parse(str));
})