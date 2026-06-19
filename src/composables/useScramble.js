const CHARS = '!<>-_\\/[]{}—=+*^?#$%@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function scrambleText(el, finalText, { duration = 900, delay = 0 } = {}) {
  return new Promise(resolve => {
    if (!el) { resolve(); return }
    const timeout = setTimeout(() => {
      const totalFrames = Math.ceil(duration / 16)
      let frame = 0
      function tick() {
        const progress = Math.min(frame / totalFrames, 1)
        const revealed = Math.floor(progress * finalText.length)
        let out = ''
        for (let i = 0; i < finalText.length; i++) {
          if (finalText[i] === ' ' || finalText[i] === '&' || finalText[i] === '\n') {
            out += finalText[i]
          } else if (i < revealed) {
            out += finalText[i]
          } else {
            out += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        el.textContent = out
        frame++
        if (frame <= totalFrames) requestAnimationFrame(tick)
        else { el.textContent = finalText; resolve() }
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timeout)
  })
}
