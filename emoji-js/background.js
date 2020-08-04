chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.sendMessage(tab.id, "Action");
});

window.onload = function(){
  var script=document.createElement('script');
  script.src = "./node_modules/emoji-js/lib/emoji.js"
  document.body.appendChild(script)
}