chrome.webNavigation.onCompleted.addListener(function() {
  chrome.tabs.executeScript({file: 'replace.js'});
});

