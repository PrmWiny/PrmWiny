<template>
  <section id="about" class="section about-section">
    <div class="dot-grid" aria-hidden="true"></div>
    <div class="about-bg-orb" aria-hidden="true"></div>
    <div class="container">
      <div class="section-header reveal">

        <h2 class="section-title" ref="titleEl">About Me</h2>
        <div class="section-line"></div>
      </div>
      <div class="about-grid">
        <div class="about-text reveal-left">
          <p class="about-summary blur-reveal">
            Application Security Engineer and IT Graduate from
            <span class="text-gold">KMUTT (SIT)</span> specializing in
            full-stack development and hardware-level game security.
          </p>
          <p class="about-desc">
            Documented success in enterprise network threat monitoring within SOC environments,
            with a demonstrated track record of mitigating
            <span class="text-gold highlight-stat">50+ system vulnerabilities</span> prior to deployment.
          </p>
          <p class="about-desc">
            Core philosophy: <strong class="text-gold">Shift-Left Security</strong> — finding and
            crushing vulnerabilities early in the SDLC, long before attackers get a chance.
          </p>
          <div class="about-pills">
            <span class="badge" v-for="pill in pills" :key="pill">{{ pill }}</span>
          </div>
          <div class="about-links">
            <a href="mailto:poramade.winy@gmail.com" class="contact-link">
              <span class="contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
              </span>
              poramade.winy@gmail.com
            </a>
            <a href="tel:+66918251541" class="contact-link">
              <span class="contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.98 16.9z"/></svg>
              </span>
              +66 91-825-1541
            </a>
            <span class="contact-link no-link">
              <span class="contact-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              Bang Wa, Phasi Charoen, Bangkok
            </span>
          </div>
        </div>
        <div class="about-stats reveal-right">
          <div
            class="stat-card gold-card spotlight"
            v-for="(stat, i) in stats"
            :key="stat.label"
            :style="{ animationDelay: (i * 0.18) + 's', animationDuration: (3.5 + i * 0.3) + 's' }"
            @mousemove="e => spotCard(e)"
            @mouseleave="e => e.currentTarget.style.removeProperty('--sx') || e.currentTarget.style.removeProperty('--sy')"
          >
            <div class="stat-icon">
              <svg v-if="i === 0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <svg v-else-if="i === 1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <svg v-else-if="i === 2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <div class="stat-card-val mono" :ref="el => statEls[i] = el">{{ stat.displayed }}</div>
            <div class="stat-card-label">{{ stat.label }}</div>
            <div class="stat-card-desc">{{ stat.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { scrambleText } from '../composables/useScramble.js'

const titleEl = ref(null)
const statEls = ref([])

const pills = ['DevSecOps','Shift-Left Security','SDLC Security','SOC Analysis','Memory Forensics','Anti-Cheat Logic','Fullstack Dev']
const stats = ref([
  { raw: 50,    displayed: '0+',  label: 'Vulnerabilities Mitigated', desc: 'Pre-deployment security flaws neutralized' },
  { raw: 67000, displayed: '0+',  label: 'Players Protected',          desc: 'Active users secured via anti-cheat systems' },
  { raw: 600,   displayed: '0+',  label: 'Security Reports',           desc: 'Intelligence reports generated at Cybertron' },
  { raw: 30,    displayed: '0%',  label: 'Faster Incident Response',   desc: 'Reduction through hardware countermeasures' },
])

function fmt(raw, i) {
  if (i === 3) return raw + '%'
  if (raw >= 1000) return (raw / 1000).toFixed(0) + 'K+'
  return raw + '+'
}

function spotCard(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--sx', (e.clientX - r.left) + 'px')
  el.style.setProperty('--sy', (e.clientY - r.top) + 'px')
}

function animateCounters() {
  stats.value.forEach((stat, i) => {
    const steps = 60, dur = 1600, iv = dur / steps; let step = 0
    const t = setInterval(() => {
      step++
      const p = step / steps
      const ease = 1 - Math.pow(1 - p, 3)
      const cur = Math.round(stat.raw * ease)
      stat.displayed = fmt(cur, i)
      if (step >= steps) {
        stat.displayed = fmt(stat.raw, i)
        clearInterval(t)
        if (statEls.value[i]) scrambleText(statEls.value[i], stat.displayed, { duration: 400 })
      }
    }, iv)
  })
}

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (titleEl.value) scrambleText(titleEl.value, 'About Me', { duration: 700 })
      animateCounters()
      obs.disconnect()
    }
  }, { threshold: 0.25 })
  const sec = document.getElementById('about')
  if (sec) obs.observe(sec)
})
</script>

<style scoped>
.about-section { background: var(--bg); padding-top: 64px; padding-bottom: 72px; }
.about-bg-orb {
  position: absolute; width: 600px; height: 600px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,107,26,0.06) 0%, transparent 70%);
  top: -200px; right: -200px; pointer-events: none;
}
.mono { font-family: 'JetBrains Mono', monospace; }
.section-label { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.2em; color: var(--gold); opacity: 0.75; margin-bottom: 10px; }
.section-title {
  font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 700;
  background: var(--gradient-gold); background-size: 300% 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer-text 6s ease infinite; min-height: 1.2em;
}
.section-line { width: 44px; height: 2px; background: var(--gradient-gold); margin: 12px 0 32px; border-radius: 2px; }

.blur-reveal { animation: blur-in 1s ease both 0.2s; }
@keyframes blur-in { from { opacity: 0; filter: blur(10px); } to { opacity: 1; filter: blur(0); } }

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.about-summary { font-size: 1.16rem; font-weight: 500; line-height: 1.7; margin-bottom: 18px; color: var(--text); }
.about-desc { color: var(--text-2); margin-bottom: 14px; font-size: 0.96rem; line-height: 1.8; }
.text-gold { color: var(--gold); }
.highlight-stat { font-family: 'JetBrains Mono', monospace; font-weight: 700; }

.about-pills { display: flex; flex-wrap: wrap; gap: 7px; margin: 26px 0; }
.about-links { display: flex; flex-direction: column; gap: 12px; }
.contact-link { display: inline-flex; align-items: center; gap: 10px; color: var(--text-2); text-decoration: none; font-size: 0.88rem; transition: color 0.25s; }
.contact-link:hover { color: var(--gold); }
.no-link { cursor: default; }
.contact-icon { width: 32px; height: 32px; border: 1px solid var(--gold-border); border-radius: 7px; display: flex; align-items: center; justify-content: center; color: var(--gold); flex-shrink: 0; background: var(--gold-bg); transition: background 0.25s, border-color 0.25s; }
.contact-link:hover .contact-icon { background: rgba(255,107,26,0.12); border-color: var(--gold); }

.about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.stat-card {
  padding: 24px 20px;
  animation: float-y var(--dur, 3.5s) ease infinite;
  animation-delay: var(--delay, 0s);
}
.stat-card:hover { transform: translateY(-6px) !important; }
.stat-icon { color: var(--gold); margin-bottom: 14px; opacity: 0.85; }
.stat-card-val {
  font-size: 2rem; font-weight: 700; line-height: 1;
  background: var(--gradient-gold); background-size: 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer-text 5s ease infinite; margin-bottom: 7px;
  min-height: 2.1rem;
}
.stat-card-label { font-size: 0.87rem; font-weight: 600; color: var(--text); margin-bottom: 5px; }
.stat-card-desc { font-size: 0.73rem; color: var(--text-3); line-height: 1.5; }

@keyframes shimmer-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes float-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

@media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }
@media (max-width: 480px) { .about-stats { grid-template-columns: 1fr; } }
</style>
