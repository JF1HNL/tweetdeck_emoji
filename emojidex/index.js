chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
		emoji_replace();
	}
});
function emoji_replace(){
  const textarea = document.querySelector('.js-compose-text')
  if(textarea === null){
    console.log('入力画面開いてないやんけ')
    return
  }
  let val = textarea.value.split(":")
  console.log(val)
  for(i in val){
    if(i % 2){
      if(i == (val.length - 1)){
        val[i] = `:${val[i]}`
        continue;
      }
      code = val[i].split(':').join('')
      if (code != '') {
        axios
          .get('https://www.emojidex.com/api/v1/emoji/' + code)
          .then(response => {
            if (response.data.moji != null) {
              textarea.value = textarea.value
                .replace(':' + code + ':', response.data.moji)
            }
          })
          .then(response =>{
            alert(document.querySelector('.js-compose-text').value) // 時間を稼ぐため(?)
          })
      }
    }
  }
  textarea.dispatchEvent(new Event('change'));
}