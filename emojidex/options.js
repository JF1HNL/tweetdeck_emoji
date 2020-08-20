function emojiStoreDisplay (){
  const emojiStore =  localStorage.getItem('tweetdeck_emoji-emojiStore')
  document.querySelector('#emojiStore').value = emojiStore ? emojiStore.replace("{", "{\n").replace("}", "\n}").replace(/,/g, ",\n") : ""
}
emojiStoreDisplay()
document.querySelector('#refresh').addEventListener("click", () => {
  emojiStoreDisplay()
})
document.querySelector('#emojiRegister').addEventListener("click", () => {
  const str = document.querySelector('#emojiStore').value
  try {
    if(str === ""){
      localStorage.removeItem('tweetdeck_emoji-emojiStore')
    }else{
      localStorage.setItem('tweetdeck_emoji-emojiStore', JSON.stringify(JSON.parse(str)))
    }
    document.querySelector('#msg').innerText = "success"
  }
  catch(e){
    document.querySelector('#msg').innerText = `エラー：${e}`
  }
})