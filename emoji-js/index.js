chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request == "Action") {
		replace();
	}
});

function replace() {
  const textarea = document.querySelector('.js-compose-text')
  if(textarea === null){
    console.log('入力画面開いてないやんけ')
    return
  }
  var emoji = new EmojiConvertor();
  textarea.value =  emoji.replace_colons(textarea.value);
  textarea.dispatchEvent(new Event('change'));
}