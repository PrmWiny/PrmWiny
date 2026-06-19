export function useMagnetic(strength = 0.4) {
  function onMove(el, e) {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) - rect.width / 2) * strength
    const y = ((e.clientY - rect.top) - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px) scale(1.02)`
    el.style.transition = 'transform 0.15s ease'
  }
  function onLeave(el) {
    if (!el) return
    el.style.transform = 'translate(0, 0) scale(1)'
    el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
  }
  return { onMove, onLeave }
}
