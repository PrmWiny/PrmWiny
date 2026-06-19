<template>
  <section id="education" class="section edu-section">
    <!-- Animated aurora background -->
    <div class="aurora" aria-hidden="true">
      <div class="aurora-blob a1"></div>
      <div class="aurora-blob a2"></div>
      <div class="aurora-blob a3"></div>
    </div>

    <div class="container">
      <div class="section-header reveal">

        <h2 class="section-title" ref="titleEl">Education</h2>
        <div class="section-line"></div>
      </div>

      <div class="edu-grid">
        <div
          class="edu-main gold-card spotlight beam-card reveal-left"
          @mousemove="spotCard"
          @mouseleave="e => { e.currentTarget.style.removeProperty('--sx'); e.currentTarget.style.removeProperty('--sy') }"
        >
          <div class="edu-card-inner">
            <div class="edu-header">
              <div class="edu-icon-wrap">
                <!-- <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> -->
              <image src="https://www.kmutt.ac.th/wp-content/uploads/2020/09/KMUTT_CI_Semi_Logo-normal-full-1061x1200.png" width="55" height="55" alt="Education Icon" />
              </div>
              <span class="badge">Aug 2022 – May 2026</span>
            </div>
            <div class="edu-degree mono">B.Sc. Information Technology</div>
            <h3 class="edu-university">King Mongkut's University of Technology Thonburi</h3>
            <div class="edu-meta">
              <span class="edu-faculty">School of Information Technology (SIT)</span>
              <span class="edu-sep">·</span>
              <span class="edu-loc mono">Bangkok, Thailand</span>
            </div>
            <div class="edu-divider"></div>
            <div class="edu-highlights">
              <div class="highlight-item" v-for="(h, i) in highlights" :key="h.label" :style="{ transitionDelay: (i * 0.08) + 's' }">
                <span class="h-icon" v-html="h.icon"></span>
                <div>
                  <div class="h-label mono">{{ h.label }}</div>
                  <div class="h-val">{{ h.val }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="edu-right">
          <div
            class="edu-cert gold-card spotlight reveal-right"
            @mousemove="spotCard"
            @mouseleave="e => { e.currentTarget.style.removeProperty('--sx'); e.currentTarget.style.removeProperty('--sy') }"
          >
            <h4 class="cert-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              Certifications & Achievements
            </h4>
            <div class="cert-list">
              <div class="cert-item" v-for="cert in certs" :key="cert.name">
                <span class="cert-dot"></span>
                <div>
                  <div class="cert-name">{{ cert.name }}</div>
                  <div class="cert-sub mono">{{ cert.sub }}</div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="edu-philosophy gold-card spotlight reveal-right"
            style="transition-delay: 0.12s"
            @mousemove="spotCard"
            @mouseleave="e => { e.currentTarget.style.removeProperty('--sx'); e.currentTarget.style.removeProperty('--sy') }"
          >
            <h4 class="phi-title">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Core Philosophy
            </h4>
            <blockquote class="philosophy-quote">
              "Bridging the gap between secure Full-Stack development (DevSecOps) and low-level
              system security — identifying and mitigating vulnerabilities
              <span class="text-gold">early in the SDLC</span>."
            </blockquote>
            <div class="phi-tags">
              <span class="phi-tag" v-for="t in philoTags" :key="t">{{ t }}</span>
            </div>
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

const bookIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/></svg>`
const buildingIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`
const pinIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`
const targetIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`

const highlights = [
  { icon: bookIcon,     label: 'Degree',   val: 'Bachelor of Science in Information Technology' },
  { icon: buildingIcon, label: 'Faculty',  val: 'School of Information Technology (SIT)' },
  { icon: pinIcon,      label: 'Location', val: 'Bangkok, Thailand' },
  { icon: targetIcon,   label: 'Focus',    val: 'Application Security & Full-Stack Development' },
]
const certs = [
  { name: 'TETET English Certification', sub: 'Professional Working Proficiency' },
  { name: 'KMUTT Capstone Project', sub: 'Huangyai – Family SOS App (cp25kp3)' },
  { name: 'SOC Internship', sub: 'Cybertron Co., Ltd. — Jan–June 2025' },
]
const philoTags = ['Shift-Left Security','DevSecOps','SDLC','Proactive Defense']

function spotCard(e) {
  const el = e.currentTarget, r = el.getBoundingClientRect()
  el.style.setProperty('--sx', (e.clientX - r.left) + 'px')
  el.style.setProperty('--sy', (e.clientY - r.top) + 'px')
}

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (titleEl.value) scrambleText(titleEl.value, 'Education', { duration: 600 })
      obs.disconnect()
    }
  }, { threshold: 0.2 })
  const sec = document.getElementById('education')
  if (sec) obs.observe(sec)
})
</script>

<style scoped>
.edu-section { background: var(--bg); position: relative; overflow: hidden; }

/* Aurora background */
.aurora { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.aurora-blob {
  position: absolute; border-radius: 50%; filter: blur(80px);
  animation: aurora-drift linear infinite;
}
.a1 { width: 500px; height: 400px; top: -200px; left: -100px; background: radial-gradient(circle, rgba(255,107,26,0.1), transparent); animation-duration: 18s; }
.a2 { width: 400px; height: 300px; top: 50%; right: -100px; background: radial-gradient(circle, rgba(204,68,0,0.07), transparent); animation-duration: 22s; animation-delay: -6s; }
.a3 { width: 350px; height: 350px; bottom: -150px; left: 40%; background: radial-gradient(circle, rgba(255,215,0,0.05), transparent); animation-duration: 26s; animation-delay: -12s; }
@keyframes aurora-drift {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(40px, -30px) scale(1.05); }
  66%  { transform: translate(-30px, 20px) scale(0.95); }
  100% { transform: translate(0, 0) scale(1); }
}

.mono { font-family: 'JetBrains Mono', monospace; }
.section-label { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.2em; color: var(--gold); opacity: 0.75; margin-bottom: 10px; }
.section-title {
  font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 700;
  background: var(--gradient-gold); background-size: 300% 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer-text 6s ease infinite; min-height: 1.2em;
}
.section-line { width: 44px; height: 2px; background: var(--gradient-gold); margin: 16px 0 50px; border-radius: 2px; }

.edu-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 22px; align-items: start; }
.edu-main { height: fit-content; }
.edu-card-inner { padding: 34px 30px; }
.edu-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px; }
.edu-icon-wrap {
  width: 58px; height: 58px; border: 1px solid var(--gold-border); border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  background: var(--gold-bg); color: var(--gold);
}
.edu-degree { font-size: 0.76rem; color: var(--gold); letter-spacing: 0.06em; margin-bottom: 8px; text-transform: uppercase; }
.edu-university { font-size: 1.38rem; font-weight: 700; color: var(--text); margin-bottom: 8px; line-height: 1.3; }
.edu-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.edu-faculty { font-size: 0.86rem; color: var(--text-2); }
.edu-sep { color: var(--text-3); }
.edu-loc { font-size: 0.75rem; color: var(--text-3); }
.edu-divider { width: 100%; height: 1px; background: var(--gold-border); margin: 22px 0; opacity: 0.4; }
.edu-highlights { display: flex; flex-direction: column; gap: 15px; }
.highlight-item {
  display: flex; align-items: flex-start; gap: 13px;
  transition: transform 0.25s ease;
}
.highlight-item:hover { transform: translateX(5px); }
.h-icon { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
.h-label { font-size: 0.68rem; color: var(--text-3); margin-bottom: 2px; text-transform: uppercase; letter-spacing: 0.07em; }
.h-val { font-size: 0.88rem; color: var(--text-2); }

.edu-right { display: flex; flex-direction: column; gap: 18px; }
.edu-cert { padding: 22px 20px; }
.cert-title {
  display: flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 600;
  color: var(--gold); margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--gold-border);
}
.cert-list { display: flex; flex-direction: column; gap: 14px; }
.cert-item { display: flex; align-items: flex-start; gap: 11px; }
.cert-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--gold-dark); flex-shrink: 0; margin-top: 4px; }
.cert-name { font-size: 0.86rem; color: var(--text); font-weight: 500; margin-bottom: 2px; }
.cert-sub { font-size: 0.7rem; color: var(--text-3); }

.edu-philosophy { padding: 22px 20px; }
.phi-title {
  display: flex; align-items: center; gap: 8px; font-size: 0.88rem; font-weight: 600;
  color: var(--gold); margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--gold-border);
}
.philosophy-quote {
  font-size: 0.86rem; color: var(--text-2); line-height: 1.75; font-style: italic;
  border-left: 2px solid var(--gold-dark); padding-left: 13px; margin-bottom: 14px;
}
.text-gold { color: var(--gold); font-style: normal; font-weight: 600; }
.phi-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.phi-tag { padding: 3px 10px; border: 1px solid var(--gold-border); border-radius: 100px; font-size: 0.68rem; font-family: 'JetBrains Mono', monospace; color: var(--gold-dark); background: var(--gold-bg); }

@keyframes shimmer-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

@media (max-width: 900px) { .edu-grid { grid-template-columns: 1fr; } .edu-card-inner { padding: 22px 18px; } }
</style>
