<template>
  <section id="hero" class="hero">
    <canvas ref="canvas" class="hero-canvas"></canvas>

    <div class="hero-glow" aria-hidden="true"></div>

    <div class="hex-grid" aria-hidden="true">
      <div v-for="n in 16" :key="n" class="hex" :style="hexStyle(n)"></div>
    </div>
    <div class="scan-line" aria-hidden="true"></div>

    <div class="hero-inner container">
      <div class="hero-text" ref="heroTextEl">
        <div class="hero-eyebrow reveal">
          <!-- <span class="eyebrow-dash"></span> -->
          <!-- <span>APPLICATION SECURITY // DEVSECOPS</span> -->
        </div>

        <h1 class="hero-name reveal">
          <span class="name-1">PORAMADE <span class="nick">March</span></span>
          <span class="name-2">WINYUNAWAN</span>
          <span class="name-3">from bytecode to <span class="hl">production.</span></span>
        </h1>

        <div class="hero-sub reveal">
          <span class="sub-pre">// </span>
          <span class="sub-ty">{{ displayedTitle }}</span>
          <span class="sub-cur">|</span>
        </div>

        <p class="hero-desc reveal">
          Bridging secure <strong>Full-Stack DevSecOps</strong> and
          <strong>low-level system security</strong> — from memory analysis to application architecture.
          <span class="hl">Shift-Left</span> commitment: defects neutralized before they ship, not after they breach.
        </p>

        <div class="hero-actions reveal">
          <a href="#projects" class="btn btn-primary">&rarr; VIEW PROJECTS</a>
          <a href="#contact" class="btn btn-outline">&#x2299; GET IN TOUCH</a>
          <a href="#" @click.prevent="openEmailModal" class="btn btn-outline btn-icon" title="Email / Contact Terminal">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
          </a>
        </div>

        <div class="hero-stats reveal">
          <div class="stat-item" v-for="stat in stats" :key="stat.label">
            <span class="stat-num mono">{{ stat.value }}</span>
            <span class="stat-lbl">{{ stat.label }}</span>
          </div>
        </div>
      </div>

      <div class="hero-terminal reveal" ref="terminalEl">
        <div class="term-bar">
          <div class="term-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="term-title mono">ssh://march@{{ termHost }}</span>
          <div style="width:42px"></div>
        </div>
        <div class="term-body mono">
          <div
            v-for="(line, i) in termLines"
            :key="i"
            class="tline"
            :class="[line.cls, { show: line.visible }]"
          >
            <span>{{ line.displayed }}</span><span v-if="i === activeLine" class="tcaret">&#9607;</span>
          </div>
          <div class="tprompt" v-if="termDone">
            <span class="gold-text">$ </span><span class="tcaret blink">&#9607;</span>
          </div>
        </div>
      </div>
    </div>

    <a href="#about" class="scroll-indicator" aria-label="Scroll down">
      <span class="scroll-mouse"><span class="scroll-dot"></span></span>
      <span class="scroll-label mono">SCROLL</span>
    </a>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvas     = ref(null)
const terminalEl = ref(null)
const heroTextEl = ref(null)
const displayedTitle = ref('')
const termHost = ref('')

const titles = [
  'Application Security Engineer',
  'Full-Stack Developer',
  'Game Security Analyst',
  'Penetration Tester',
  'DevSecOps Practitioner',
]

const stats = [
  { value: '50+',  label: 'Vulnerabilities Mitigated' },
  { value: '67K+', label: 'Players Protected' },
  { value: '600+', label: 'Security Reports' },
  { value: '45%',  label: 'Bypass Reduction' },
]

function openEmailModal() {
  window.dispatchEvent(new CustomEvent('open-email-modal'))
}

function hexStyle(n) {
  const positions = [
    { top: '10%', left: '5%' }, { top: '25%', left: '88%' },
    { top: '60%', left: '92%' }, { top: '75%', left: '3%' },
    { top: '40%', left: '96%' }, { top: '15%', left: '75%' },
    { top: '85%', left: '70%' }, { top: '50%', left: '8%' },
    { top: '5%', left: '40%' }, { top: '90%', left: '45%' },
    { top: '30%', left: '50%' }, { top: '70%', left: '55%' },
    { top: '20%', left: '18%' }, { top: '65%', left: '22%' },
    { top: '45%', left: '72%' }, { top: '55%', left: '35%' },
  ]
  const p = positions[(n - 1) % positions.length]
  const size = 20 + (n % 5) * 12
  return {
    top: p.top, left: p.left,
    width: size + 'px', height: size + 'px',
    animationDelay: (n * 0.4) + 's',
    animationDuration: (8 + n % 4) + 's',
    opacity: 0.025 + (n % 4) * 0.008,
  }
}

// ── Typewriter title ─────────────────────────────────────────
let titleIndex = 0, charIndex = 0, deleting = false, typeTimer = null

function typeTitle() {
  const current = titles[titleIndex]
  if (!deleting) {
    displayedTitle.value = current.slice(0, charIndex + 1)
    charIndex++
    if (charIndex === current.length) { deleting = true; typeTimer = setTimeout(typeTitle, 2200); return }
  } else {
    displayedTitle.value = current.slice(0, charIndex - 1)
    charIndex--
    if (charIndex === 0) { deleting = false; titleIndex = (titleIndex + 1) % titles.length; typeTimer = setTimeout(typeTitle, 400); return }
  }
  typeTimer = setTimeout(typeTitle, deleting ? 38 : 68)
}

// ── Terminal typewriter ──────────────────────────────────────
const termLines = reactive([
  { text: '$ ssh march@secure --role=appsec_engineer',  cls: 'gold-line',  displayed: '', visible: false },
  { text: '> auth: verified ✓  location: bangkok, th',       cls: 'white-line', displayed: '', visible: false },
  { text: '[OK] threat surface minimized.',   cls: 'green-line', displayed: '', visible: false },
  { text: '└─ ready to harden your stack.',                   cls: 'bold-line',  displayed: '', visible: false },
])
const activeLine = ref(-1)
const termDone   = ref(false)
const termTimers = []

function typeTermLine(idx, cb) {
  const line = termLines[idx]
  line.visible = true
  activeLine.value = idx
  let i = 0
  function tick() {
    line.displayed = line.text.slice(0, i + 1)
    i++
    if (i < line.text.length) { termTimers.push(setTimeout(tick, 28)) }
    else { activeLine.value = -1; termTimers.push(setTimeout(cb, 240)) }
  }
  tick()
}

function startTerminal() {
  let idx = 0
  function next() {
    if (idx < termLines.length) { typeTermLine(idx, () => { idx++; next() }) }
    else { termDone.value = true }
  }
  termTimers.push(setTimeout(next, 500))
}

// ── Scroll transition ────────────────────────────────────────
let scrollTl = null

function setupScrollAnimation() {
  if (window.innerWidth < 900) return

  const hero  = document.getElementById('hero')
  const about = document.getElementById('about')
  if (!hero || !about || !terminalEl.value || !heroTextEl.value) return

  const overlay = document.createElement('div')
  overlay.style.cssText = 'position:fixed;inset:0;background:#090908;opacity:0;z-index:500;pointer-events:none;'
  document.body.appendChild(overlay)

  let active = false
  let savedR = null
  let revWheelHandler = null
  let reversing = false
  let fwdTl = null

  function runTransition(scrollTarget = about) {
    if (active) return
    active = true
    document.body.style.overflow = 'hidden'
    hero.style.overflow = 'visible'   // let border-radius render without being clipped

    const term     = terminalEl.value
    const heroKids = Array.from(heroTextEl.value.children)
    const r  = term.getBoundingClientRect()
    const vw = window.innerWidth, vh = window.innerHeight

    savedR = { left: r.left, top: r.top, width: r.width, height: r.height, vw, vh }

    term.style.animation  = 'none'
    term.style.transition = 'none'
    heroKids.forEach(el => { el.style.transition = 'none' })

    gsap.set(term, {
      position: 'fixed',
      left: r.left, top: r.top,
      width: r.width, height: r.height,
      margin: 0, zIndex: 200,
    })

    const cx = (vw - r.width)  / 2
    const cy = (vh - r.height) / 2

    fwdTl = gsap.timeline()
      .to(['.hero-canvas', '.hex-grid', '.scan-line', '.hero-glow', '.scroll-indicator'],
        { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0)
      .to(heroKids,
        { opacity: 0, y: -16, stagger: 0.025, duration: 0.3, ease: 'power2.in' }, 0)
      .to(term, { left: cx, top: cy, duration: 0.3, ease: 'power2.out' }, 0.05)
      // Fade terminal content out during the slide — terminal is a clean box before it expands
      .to(['.term-bar', '.term-body'], { opacity: 0, duration: 0.18, ease: 'power2.in' }, 0.12)
      .to(term, { left: 0, top: 0, width: vw, height: vh, boxShadow: 'none', duration: 0.48, ease: 'power2.inOut' }, 0.32)
      .to(term, { borderColor: 'transparent', duration: 0.16 }, 0.42)
      .to(overlay, { opacity: 1, duration: 0.14, ease: 'none' }, 0.72)
      .call(() => {
        fwdTl = null
        scrollTarget.scrollIntoView({ behavior: 'instant' })
        // Clip terminal back to hero bounds so it can't bleed over the About viewport
        hero.style.overflow = 'hidden'
        document.body.style.overflow = ''
        gsap.to(overlay, { opacity: 0, duration: 0.5, delay: 0.05, ease: 'power2.out', onComplete: setupReverseListener })
      })
  }

  function setupReverseListener() {
    const snapY = window.scrollY
    revWheelHandler = (e) => {
      if (e.deltaY >= 0) return
      const delta = window.scrollY - snapY
      // User scrolled far below About — abandon listener so normal scroll works
      if (delta > 600) {
        window.removeEventListener('wheel', revWheelHandler, { passive: false })
        revWheelHandler = null
        return
      }
      // Any upward scroll at or near the About top triggers reverse
      if (delta <= 80) {
        e.preventDefault()
        window.removeEventListener('wheel', revWheelHandler, { passive: false })
        revWheelHandler = null
        runReverseTransition()
      }
    }
    window.addEventListener('wheel', revWheelHandler, { passive: false })
  }

  function runReverseTransition() {
    if (!savedR || reversing) return
    reversing = true
    const term = terminalEl.value
    const heroKids = Array.from(heroTextEl.value.children)
    const { left, top, width, height, vw, vh } = savedR
    const cx = (vw - width) / 2
    const cy = (vh - height) / 2

    document.body.style.overflow = 'hidden'
    gsap.set(overlay, { opacity: 1 })

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      // Re-open overflow so border-radius is visible during the reverse shrink animation
      hero.style.overflow = 'visible'
      document.body.style.overflow = ''

      gsap.timeline()
        .to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0)
        // Phase 1 — shrink from fullscreen to original size, centered in viewport
        .to(term, {
          left: cx, top: cy, width, height,
          borderRadius: '10px',
          borderColor: 'rgba(255,107,26,0.2)',
          boxShadow: '0 0 40px rgba(255,107,26,0.08), 0 24px 80px rgba(0,0,0,0.6)',
          duration: 0.55, ease: 'expo.out',
        }, 0.08)
        .to(['.term-bar', '.term-body'], { opacity: 1, duration: 0.25 }, 0.25)
        // Phase 2 — slide from center to original position using transform (GPU-accelerated)
        .to(term, { x: left - cx, y: top - cy, duration: 0.55, ease: 'expo.out' }, 0.58)
        .to(['.hero-canvas', '.hex-grid', '.scan-line', '.hero-glow'], { opacity: 1, duration: 0.5 }, 0.28)
        .to(heroKids, { opacity: 1, y: 0, stagger: { each: 0.055, from: 'end' }, duration: 0.5, ease: 'power2.out' }, 0.38)
        .to('.scroll-indicator', { opacity: 1, duration: 0.35 }, 0.75)
        .call(() => {
          hero.style.overflow = 'hidden'
          gsap.set(term, { clearProps: 'position,left,top,width,height,margin,zIndex,borderRadius,boxShadow,borderColor,x,y' })
          active = false
          reversing = false
          savedR = null
          window.addEventListener('wheel', onWheel, { passive: false })
        })
    })
  }

  function resetHero() {
    if (reversing) return
    if (fwdTl) { fwdTl.kill(); fwdTl = null }
    // Fast scroll may have skipped the reverse animation — clean up its state too
    if (revWheelHandler) {
      window.removeEventListener('wheel', revWheelHandler, { passive: false })
      revWheelHandler = null
    }
    gsap.killTweensOf(terminalEl.value)
    active = false
    reversing = false
    savedR = null
    hero.style.overflow = 'hidden'
    document.body.style.overflow = ''
    gsap.set(overlay, { opacity: 0 })
    const term     = terminalEl.value
    const heroKids = Array.from(heroTextEl.value.children)
    gsap.set(term, { clearProps: 'position,left,top,width,height,margin,zIndex,borderRadius,boxShadow,borderColor,x,y' })
    gsap.set(['.hero-canvas', '.hex-grid', '.scan-line', '.hero-glow', '.scroll-indicator'], { clearProps: 'opacity' })
    gsap.set(heroKids, { clearProps: 'opacity,y' })
    gsap.set(['.term-bar', '.term-body'], { clearProps: 'opacity' })
    term.style.animation  = 'none'
    term.style.transition = 'none'
    window.addEventListener('wheel', onWheel, { passive: false })
  }

  const onWheel = (e) => {
    if (window.scrollY >= 80) return
    if (e.deltaY <= 0) return
    e.preventDefault()
    window.removeEventListener('wheel', onWheel)
    runTransition()
  }
  window.addEventListener('wheel', onWheel, { passive: false })

  const heroObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && active) resetHero()
  }, { threshold: 0.4 })
  heroObs.observe(hero)

  scrollTl = {
    kill() {
      window.removeEventListener('wheel', onWheel)
      if (revWheelHandler) window.removeEventListener('wheel', revWheelHandler)
      heroObs.disconnect()
      if (overlay.parentNode) overlay.remove()
      document.body.style.overflow = ''
    }
  }
}

// ── Particle canvas ──────────────────────────────────────────
let animFrame = null, particles = [], mouse = { x: -9999, y: -9999 }

class Particle {
  constructor(w, h) { this.w = w; this.h = h; this.reset() }
  reset() {
    this.x = Math.random() * this.w; this.y = Math.random() * this.h
    this.vx = (Math.random() - 0.5) * 0.6; this.vy = (Math.random() - 0.5) * 0.6
    this.r = Math.random() * 1.8 + 0.4
    this.alpha = Math.random() * 0.45 + 0.1; this.baseAlpha = this.alpha
  }
  update() {
    this.x += this.vx; this.y += this.vy
    if (this.x < 0 || this.x > this.w) this.vx *= -1
    if (this.y < 0 || this.y > this.h) this.vy *= -1
    const dx = mouse.x - this.x, dy = mouse.y - this.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 120) {
      const force = (120 - dist) / 120
      this.x -= dx * force * 0.025; this.y -= dy * force * 0.025
      this.alpha = Math.min(0.9, this.baseAlpha + force * 0.5)
    } else { this.alpha += (this.baseAlpha - this.alpha) * 0.05 }
  }
  draw(ctx) {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,107,26,${this.alpha})`; ctx.fill()
  }
}

function initCanvas() {
  const cv = canvas.value; if (!cv) return
  const ctx = cv.getContext('2d')
  const resize = () => {
    cv.width = cv.offsetWidth; cv.height = cv.offsetHeight
    particles = Array.from({ length: 80 }, () => new Particle(cv.width, cv.height))
  }
  resize()
  window.addEventListener('resize', resize, { passive: true })
  const draw = () => {
    ctx.clearRect(0, 0, cv.width, cv.height)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 130) {
          ctx.strokeStyle = `rgba(255,107,26,${(1 - d / 130) * 0.2})`
          ctx.lineWidth = 0.5; ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(ctx) })
    animFrame = requestAnimationFrame(draw)
  }
  draw()
  cv.addEventListener('mousemove', e => {
    const rect = cv.getBoundingClientRect()
    mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top
  }, { passive: true })
}

onMounted(async () => {
  termHost.value = window.location.host
  initCanvas()
  startTerminal()
  setTimeout(typeTitle, 800)
  // Wait for reveal animations to complete before measuring terminal rect
  await nextTick()
  setTimeout(setupScrollAnimation, 1400)
})

onUnmounted(() => {
  clearTimeout(typeTimer)
  termTimers.forEach(id => clearTimeout(id))
  cancelAnimationFrame(animFrame)
  if (scrollTl) { scrollTl.scrollTrigger?.kill(); scrollTl.kill() }
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<style scoped>
.mono { font-family: 'JetBrains Mono', monospace; }

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  will-change: transform;
  background:
    radial-gradient(ellipse 100% 80% at 15% 85%, rgba(255,107,26,0.24) 0%, rgba(255,107,26,0.06) 40%, transparent 65%),
    radial-gradient(ellipse 60% 50% at 75% 10%, rgba(255,180,0,0.07) 0%, transparent 55%),
    var(--bg);
}

.hero::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 220px;
  background: linear-gradient(to bottom, transparent 0%, var(--bg) 100%);
  pointer-events: none;
  z-index: 1;
}

.hero-canvas {
  position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none;
}

.hero-glow {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,107,26,0.03) 0%, transparent 70%);
}

.hex-grid { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.hex {
  position: absolute;
  border: 1px solid var(--gold);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: hex-drift linear infinite;
}
@keyframes hex-drift {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

.scan-line {
  position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,107,26,0.15), transparent);
  animation: scan 10s linear infinite; pointer-events: none; z-index: 1;
}
@keyframes scan { 0% { top: -2px; } 100% { top: 100%; } }

.hero-inner {
  position: relative; z-index: 2;
  padding: 120px 28px 80px;
  display: flex;
  align-items: center;
  gap: 64px;
  width: 100%;
}

.hero-text { flex: 1; min-width: 0; }

.hero-eyebrow {
  display: flex; align-items: center; gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem; letter-spacing: 0.18em;
  color: var(--gold); opacity: 0.75;
  margin-bottom: 28px; text-transform: uppercase;
}
.eyebrow-dash { display: inline-block; width: 24px; height: 1px; background: var(--gold); opacity: 0.6; }

.hero-name { font-weight: 800; line-height: 1; margin-bottom: 18px; letter-spacing: -0.02em; }
.name-1 { display: block; font-size: clamp(2.2rem, 4.5vw, 3.8rem); color: var(--text); margin-bottom: 2px; }
.nick { font-size: 0.75em; color: var(--text-2); font-weight: 500; }
.name-2 {
  display: block; font-size: clamp(3.2rem, 7.5vw, 6.1rem);
  background: var(--gradient-gold); background-size: 300% 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer-text 5s ease infinite; line-height: 0.88; margin-bottom: 10px;
}
.name-3 { display: block; font-size: clamp(1rem, 2vw, 1.55rem); color: var(--text-2); font-weight: 500; letter-spacing: -0.01em; }
.name-3 .hl { color: var(--gold); }

@keyframes shimmer-text {
  0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; }
}

.hero-sub {
  display: flex; align-items: center; gap: 4px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.88rem; color: var(--text-3);
  margin-bottom: 22px; min-height: 1.4em;
}
.sub-pre { color: var(--gold-dark); }
.sub-ty  { color: var(--text-2); }
.sub-cur { color: var(--gold); animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.hero-desc { max-width: 520px; color: var(--text-2); font-size: 1rem; line-height: 1.75; margin-bottom: 32px; }
.hero-desc strong { color: var(--text); font-weight: 600; }
.hero-desc .hl { color: var(--gold); }

.hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 52px; align-items: center; }
.btn-icon { padding: 12px 14px; }

.hero-stats { display: flex; flex-wrap: wrap; gap: 36px; }
.stat-item { display: flex; flex-direction: column; gap: 3px; }
.stat-num {
  font-size: 1.7rem; font-weight: 800; font-family: 'JetBrains Mono', monospace;
  background: var(--gradient-gold); background-size: 200%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer-text 4s ease infinite;
}
.stat-lbl { font-size: 0.7rem; color: var(--text-3); letter-spacing: 0.06em; text-transform: uppercase; }

.hero-terminal {
  flex: 0 0 400px; width: 400px;
  background: var(--bg);
  border: 1px solid rgba(255,107,26,0.2);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(255,107,26,0.1), 0 24px 80px rgba(0,0,0,0.6);
  animation: term-glow 4s ease infinite;
  transition-delay: 0.5s;
}
@keyframes term-glow {
  0%, 100% { box-shadow: 0 0 40px rgba(255,107,26,0.08), 0 24px 80px rgba(0,0,0,0.6); }
  50%       { box-shadow: 0 0 60px rgba(255,107,26,0.18), 0 24px 80px rgba(0,0,0,0.6); }
}

.term-bar {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px;
  background: #1a1a1b;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.term-dots  { display: flex; gap: 6px; }
.dot        { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
.dot.red    { background: #FF5F57; box-shadow: 0 0 4px #FF5F5788; }
.dot.yellow { background: #FEBC2E; box-shadow: 0 0 4px #FEBC2E88; }
.dot.green  { background: #28C840; box-shadow: 0 0 4px #28C84088; }
.term-title { flex: 1; text-align: center; font-size: 0.74rem; color: #555; letter-spacing: 0.04em; }

.term-body {
  padding: 20px; min-height: 195px;
  font-size: 0.82rem; line-height: 1.85; position: relative;
}
.term-body::before {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px);
}

.tline {
  display: flex; align-items: center;
  opacity: 0; transform: translateY(4px);
  transition: opacity 0.15s, transform 0.15s;
  white-space: pre-wrap; word-break: break-word;
}
.tline.show   { opacity: 1; transform: none; }
.tline.gold-line  { color: #FF6B1A; }
.tline.white-line { color: #d0d0d0; }
.tline.green-line { color: #3fb950; }
.tline.bold-line  { color: #e6e6e6; font-weight: 700; }
.tline.dim-line   { color: #666; }
.gold-text { color: #FF6B1A; }
.tcaret     { color: #FF6B1A; margin-left: 1px; }
.tcaret.blink { animation: blink 1s step-end infinite; }
.tprompt    { display: flex; align-items: center; }

.scroll-indicator {
  position: absolute; bottom: 36px; left: 50%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 10px;
  text-decoration: none; animation: float-y 3s ease infinite; z-index: 2;
}
@keyframes float-y {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(-10px); }
}
.scroll-mouse {
  width: 24px; height: 38px; border: 1.5px solid var(--gold-border);
  border-radius: 12px; display: flex; justify-content: center; padding-top: 6px;
}
.scroll-dot {
  width: 4px; height: 8px; background: var(--gold); border-radius: 2px;
  animation: dot-scroll 1.8s ease infinite;
}
@keyframes dot-scroll { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(10px); opacity: 0.4; } }
.scroll-label { font-size: 0.6rem; letter-spacing: 0.18em; color: var(--text-3); font-family: 'JetBrains Mono', monospace; }

.hero-eyebrow.reveal  { transition-delay: 0.10s; }
.hero-name.reveal     { transition-delay: 0.20s; }
.hero-sub.reveal      { transition-delay: 0.35s; }
.hero-desc.reveal     { transition-delay: 0.50s; }
.hero-actions.reveal  { transition-delay: 0.65s; }
.hero-stats.reveal    { transition-delay: 0.80s; }
.hero-terminal.reveal { transition-delay: 0.55s; }

@media (max-width: 1060px) {
  .hero-inner { flex-direction: column; align-items: flex-start; gap: 44px; padding-top: 130px; padding-bottom: 60px; }
  .hero-terminal { flex: none; width: 100%; max-width: 480px; }
}
@media (max-width: 768px) {
  .hero-terminal { display: none; }
  .btn-icon { display: none; }
  .hero-actions { gap: 10px; }
  .hero-actions .btn { flex: 1; justify-content: center; min-width: 0; }
}
@media (max-width: 600px) {
  .hero-inner { padding-top: 96px; padding-bottom: 52px; }
  .name-1 { font-size: clamp(1.6rem, 6.5vw, 2.2rem); }
  .name-2 { font-size: clamp(2.4rem, 11vw, 3.2rem); }
  .name-3 { font-size: 0.95rem; }
  .hero-desc { font-size: 0.9rem; margin-bottom: 24px; }
  .hero-actions { margin-bottom: 36px; }
  .hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 24px; width: 100%; }
  .stat-num { font-size: 1.4rem; }
  .stat-lbl { font-size: 0.65rem; }
}
</style>
