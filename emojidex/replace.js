
window.addEventListener('load', main, false);

function main(e) {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);
  function jsLoaded() {
    if (document.querySelector('.js-compose-text') != null) {
      clearInterval(jsInitCheckTimer);
      $('.js-compose-text').bind('input propertychanged', emoji_replace);
    }
  }
}

function emoji_replace(){
  let val = this.value.split(":")
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
              this.value = this.value
                .replace(':' + code + ':', response.data.moji)
              this.dispatchEvent(new Event('change'));
            }
          })
      }
    }
  }
}
