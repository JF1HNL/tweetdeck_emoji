document.addEventListener('keydown', event => {
  const textarea = document.querySelector('.js-compose-text')
  if (textarea.setteinged) {
    return
  }
  textarea.setteinged = true

  textarea.addEventListener('input', event => {
    const { target } = event;
    (target.value.replace(/:/g, '::').match(/:([^:]+?):/g) || [])
      .map(matched => {
        fetchEmoji(matched.slice(1, -1))
          .then(emoji => {
            if (emoji) {
              target.value = target.value.replace(matched, emoji)
            }
          })
      })
  })
})

function fetchEmoji(code) {
  return fetch('https://www.emojidex.com/api/v1/emoji/' + code)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        return undefined
      }
    })
    .then(response => response.moji)
    .catch(error => console.error('Error:', error))
    )
}