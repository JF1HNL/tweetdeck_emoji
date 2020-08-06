const original = ":" // 通常のコロン
const imitation = "ː" // IPA発音記号
// この行以降のコードではミス防止のため、コロンのみ使う


document.addEventListener('keydown', event => {
  const textarea = document.querySelector('.js-compose-text')
  if (textarea.setteinged) {
    return
  }
  textarea.setteinged = true

  textarea.addEventListener('input', event => {
    const { target } = event;

    const candidates = new Set();
    target.value = target.value.replace(/:([^: ]+?):/g, function replacer(match, p1) {
      candidates.add(p1);
      return imitation + p1 + imitation;
    });

    candidates.forEach(async candidate => {
      const emoji = await fetchEmoji(candidate)
      target.value = target.value.replace(new RegExp(imitation + candidate + imitation, 'g'), emoji || `:${candidate}:`)
    })
  })
})


async function fetchEmoji(code) {
  const response = await fetch('https://www.emojidex.com/api/v1/emoji/' + code)
  if (response.ok) {
    const data = await response.json()
    return data.moji
  }
  return undefined
}
