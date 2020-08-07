const ZWSP = "​" // ゼロ幅スペース U+200B
const ZWSP2 = "‌" // ゼロ幅スペース U+2009


document.addEventListener('keydown', event => {
  const textarea = document.querySelector('.js-compose-text')
  if (textarea.isConfigured) {
    return
  }
  textarea.isConfigured = true

  textarea.addEventListener('input', event => {
    const { target } = event

    const candidates = new Set()
    target.value = target.value.replace(new RegExp(`:([^: ${ZWSP}${ZWSP2}]+?):`, 'g'), (match, p1) => {
      candidates.add(p1)
      return `:${ZWSP}${p1}:${ZWSP2}`
    })


    candidates.forEach(candidate => {
      chrome.runtime.sendMessage({ code: candidate }, emoji => {
        target.value = target.value.replace(new RegExp(`:${ZWSP}${candidate}:${ZWSP2}`, 'g'), emoji || `:${candidate}:`)
      })
    })
  })
})
