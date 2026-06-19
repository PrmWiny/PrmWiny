<template>
  <section id="skills" class="section skills-section">
    <div class="dot-grid" aria-hidden="true"></div>
    <div class="container">
      <div class="section-header reveal">

        <h2 class="section-title" ref="titleEl">Skills & Expertise</h2>
        <div class="section-line"></div>
        <p class="section-desc">A battle-tested toolkit spanning security engineering, full-stack development, and low-level systems.</p>
      </div>

      <div class="skills-bars reveal" ref="barsEl">
        <div class="skills-group" v-for="(group, gi) in skillGroups" :key="group.label" :style="{ transitionDelay: (gi * 0.12) + 's' }">
          <h3 class="group-label">
            <span class="group-icon" v-html="group.icon"></span>
            {{ group.label }}
          </h3>
          <div class="skill-bar-list">
            <span
              class="skill-name"
              v-for="(skill, si) in group.skills"
              :key="skill.name"
              :style="{ animationDelay: ((gi * 5 + si) * 0.28) + 's' }"
            >{{ skill.name }}</span>
          </div>
        </div>
      </div>

      <div class="skills-cards-grid">
        <div
          class="skills-card gold-card spotlight reveal-left"
          v-for="(card, ci) in cards"
          :key="card.title"
          :style="{ transitionDelay: (ci * 0.1) + 's' }"
          @mousemove="spotCard"
          @mouseleave="e => { e.currentTarget.style.removeProperty('--sx'); e.currentTarget.style.removeProperty('--sy') }"
        >
          <h3 class="card-title">
            <span class="card-icon" v-html="card.icon"></span>
            {{ card.title }}
          </h3>
          <slot>
            <!-- Professional Skills -->
            <ul v-if="card.type === 'pro'" class="pro-skill-list">
              <li v-for="s in proSkills" :key="s.name" class="pro-skill-item">
                <span class="pro-dot"></span>
                <span class="pro-name">{{ s.name }}</span>
                <span class="pro-tag mono">{{ s.tag }}</span>
              </li>
            </ul>
            <!-- Tools -->
            <div v-else-if="card.type === 'tools'" class="tool-tags">
              <span class="tool-tag" v-for="t in tools" :key="t">{{ t }}</span>
            </div>
            <!-- Security -->
            <div v-else-if="card.type === 'sec'" class="sec-list">
              <div class="sec-item" v-for="s in secSkills" :key="s">
                <svg class="sec-check" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {{ s }}
              </div>
            </div>
            <!-- Languages -->
            <div v-else-if="card.type === 'lang'" class="lang-list">
              <div class="lang-item" v-for="l in languages" :key="l.name">
                <div class="lang-flag-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <div class="lang-name">{{ l.name }}</div>
                  <div class="lang-level mono">{{ l.level }}</div>
                </div>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { scrambleText } from '../composables/useScramble.js'

const titleEl = ref(null)
const barsEl = ref(null)
const barsVisible = ref(false)
const barsGlowing = ref(false)

const codeIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`
const layersIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
const shieldIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`
const targetIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`
const wrenchIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`
const lockIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
const globeIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`

const skillGroups = [
  { icon: codeIcon, label: 'Languages', skills: [{ name: 'Python', pct: 88 }, { name: 'JavaScript / TypeScript', pct: 85 }, { name: 'C++', pct: 75 }] },
  { icon: layersIcon, label: 'Frameworks & Frontend', skills: [{ name: 'Vue.js 3 / Nuxt', pct: 90 }, { name: 'Tailwind CSS', pct: 88 }, { name: 'NestJS', pct: 80 }, { name: 'Tauri (Rust)', pct: 72 }] },
  { icon: shieldIcon, label: 'Security', skills: [{ name: 'Vulnerability Assessment', pct: 92 }, { name: 'Penetration Testing', pct: 85 }, { name: 'Low-Level Memory Analysis', pct: 87 }, { name: 'SIEM / SOC Operations', pct: 82 }] },
]

const cards = [
  { title: 'Professional Skills', icon: targetIcon, type: 'pro' },
  { title: 'Tools & Platforms',   icon: wrenchIcon, type: 'tools' },
  { title: 'Security Specs',      icon: lockIcon,   type: 'sec' },
  { title: 'Languages',           icon: globeIcon,  type: 'lang' },
]

const proSkills = [
  { name: 'Full-Stack Software Development',     tag: 'core' },
  { name: 'Low-Level Memory Analysis',           tag: 'expert' },
  { name: 'Vulnerability Assessment & Mitigation', tag: 'core' },
  { name: 'Anti-Cheat Logic Design',             tag: 'niche' },
  { name: 'Systems & Database Architecture',     tag: 'core' },
]
const tools = ['Docker Compose','Nginx','Supabase','REST APIs','SIEM','PostgreSQL','VMProtect SDK','LINE LIFF']
const secSkills = ['Vulnerability Assessment & Mitigation','Vulnerability Management','Penetration Testing','Low-Level Memory Analysis','Defensive Anti-Cheat Logic','Security Controls & Policies','Binary Virtualization (VMProtect)','DMA/FPGA Threat Mitigation']
const languages = [
  { name: 'Thai',    level: 'Native' },
  { name: 'English', level: 'Professional Working — TETET Certified' },
]

function spotCard(e) {
  const el = e.currentTarget, r = el.getBoundingClientRect()
  el.style.setProperty('--sx', (e.clientX - r.left) + 'px')
  el.style.setProperty('--sy', (e.clientY - r.top) + 'px')
}

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (titleEl.value) scrambleText(titleEl.value, 'Skills & Expertise', { duration: 750 })
      obs.disconnect()
    }
  }, { threshold: 0.2 })
  const sec = document.getElementById('skills')
  if (sec) obs.observe(sec)

  if (barsEl.value) {
    const bObs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        barsVisible.value = true
        setTimeout(() => { barsGlowing.value = true }, 1400)
        bObs.disconnect()
      }
    }, { threshold: 0.2 })
    bObs.observe(barsEl.value)
  }
})
</script>

<style scoped>
.skills-section { background: var(--bg); }
.mono { font-family: 'JetBrains Mono', monospace; }
.section-label { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; letter-spacing: 0.2em; color: var(--gold); opacity: 0.75; margin-bottom: 10px; }
.section-title {
  font-size: clamp(1.9rem, 4vw, 2.8rem); font-weight: 700;
  background: var(--gradient-gold); background-size: 300% 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer-text 6s ease infinite; min-height: 1.2em;
}
.section-line { width: 44px; height: 2px; background: var(--gradient-gold); margin: 16px 0 18px; border-radius: 2px; }
.section-desc { color: var(--text-2); font-size: 0.96rem; margin-bottom: 50px; max-width: 600px; }

.skills-bars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 38px; margin-bottom: 44px; }
.skills-group { display: flex; flex-direction: column; }
.group-label {
  display: flex; align-items: center; gap: 8px;
  font-size: 0.88rem; font-weight: 600; color: var(--text);
  margin-bottom: 14px; padding-bottom: 10px;
  border-bottom: 1px solid rgba(255,107,26,0.12);
  color: var(--gold-light);
}
.group-icon { display: flex; color: var(--gold); }
.skill-bar-list { display: flex; flex-direction: column; gap: 8px; }
.skill-name {
  display: flex; align-items: center; gap: 6px;
  padding: 9px 14px;
  border-radius: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem; letter-spacing: 0.03em;
  color: var(--text);
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.25s ease, text-shadow 0.25s ease;
  cursor: default;
}
.skill-name::before {
  /* content: '//'; */
  font-size: 0.65em; color: var(--gold-dark); opacity: 0.7; flex-shrink: 0;
}
.skill-name:hover {
  transform: translateY(-2px);
}
@keyframes skill-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(255,107,26,0.1), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04); }
  50%       { box-shadow: 0 0 18px rgba(255,107,26,0.25), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06); }
}


.skills-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.skills-card { padding: 26px 22px; }
.card-title { display: flex; align-items: center; gap: 9px; font-size: 0.95rem; font-weight: 600; color: var(--text); margin-bottom: 18px; padding-bottom: 13px; border-bottom: 1px solid var(--gold-border); }
.card-icon { display: flex; color: var(--gold); }

.pro-skill-list { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.pro-skill-item { display: flex; align-items: center; gap: 10px; }
.pro-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 7px rgba(255,107,26,0.5); flex-shrink: 0; animation: glow-pulse 2.5s ease infinite; }
@keyframes glow-pulse { 0%, 100% { box-shadow: 0 0 4px rgba(255,107,26,0.3); } 50% { box-shadow: 0 0 12px rgba(255,107,26,0.7); } }
.pro-name { font-size: 0.85rem; color: var(--text-2); flex: 1; }
.pro-tag { padding: 1px 7px; border: 1px solid var(--gold-border); border-radius: 100px; font-size: 0.62rem; color: var(--gold-dark); }

.tool-tags { display: flex; flex-wrap: wrap; gap: 7px; }
.tool-tag { padding: 5px 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 5px; font-size: 0.78rem; color: var(--text-2); transition: border-color 0.2s, color 0.2s; }
.tool-tag:hover { border-color: var(--gold-border); color: var(--gold); }

.sec-list { display: flex; flex-direction: column; gap: 9px; }
.sec-item { display: flex; align-items: center; gap: 9px; font-size: 0.82rem; color: var(--text-2); }
.sec-check { color: var(--gold); flex-shrink: 0; }

.lang-list { display: flex; flex-direction: column; gap: 16px; }
.lang-item { display: flex; align-items: center; gap: 12px; }
.lang-flag-icon { color: var(--gold); flex-shrink: 0; }
.lang-name { font-size: 0.92rem; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.lang-level { font-size: 0.7rem; color: var(--gold-dark); }

@keyframes shimmer-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

@media (max-width: 1024px) { .skills-bars { grid-template-columns: 1fr 1fr; } }
@media (max-width: 768px) { .skills-bars { grid-template-columns: 1fr; } .skills-cards-grid { grid-template-columns: 1fr; } }
</style>
