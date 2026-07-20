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
          :class="'card-' + card.type"
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
            <!-- Codewars -->
            <div v-else-if="card.type === 'codewars'" class="codewars-flex">
              <div class="codewars-badge-wrapper-left">
                <!-- Wrapper for 3D perspective -->
                <div ref="badgeWrapRef" class="pc-card-wrapper">
                  <!-- Behind Glow -->
                  <div class="pc-behind"></div>

                  <div ref="badgeShellRef" class="pc-card-shell">
                    <a href="https://www.codewars.com/users/PrmWiny" target="_blank" rel="noopener noreferrer" class="custom-codewars-badge-card beam-card pc-card" title="View Codewars Profile">
                      <div class="pc-inside">
                        <!-- Holographic Shine and Glass Glare -->
                        <div class="pc-shine"></div>
                        <div class="pc-glare"></div>

                        <!-- Card Contents (Z-indexed above shine/glare) -->
                        <div class="pc-card-content-overlay">
                          <div class="custom-badge-header">
                            <div class="custom-badge-avatar-wrap">
                              <img src="https://github.com/PrmWiny.png" alt="Profile Picture" class="custom-badge-avatar" />
                            </div>
                            <div class="custom-badge-title-block">
                              <span class="custom-badge-title mono">CODEWARS NODE</span>
                              <span class="custom-badge-user mono">PRMWINY // SECURE</span>
                            </div>
                            <div class="custom-badge-logo-wrap">
                              <img src="https://images.icon-icons.com/2389/PNG/512/codewars_logo_icon_145389.png" alt="Codewars Logo" class="custom-badge-logo-img" />
                            </div>
                          </div>

                          <div class="custom-badge-body">
                            <span class="custom-badge-lbl mono">STATUS // SECURITY LEVEL</span>
                            <h3 class="custom-badge-rank mono" :class="{'rank-yellow': codewarsStats.rank.includes('5')}">
                              {{ codewarsStats.rank.toUpperCase() }}
                            </h3>
                          </div>

                          <div class="custom-badge-footer">
                            <div class="custom-badge-metric">
                              <span class="metric-lbl mono">HONOR</span>
                              <span class="metric-val mono">{{ codewarsStats.honor }}</span>
                            </div>
                            <div class="custom-badge-metric">
                              <span class="metric-lbl mono">COMPLETED</span>
                              <span class="metric-val mono">{{ codewarsStats.completed }}</span>
                            </div>
                          </div>

                          <div class="custom-badge-scanline"></div>
                          <div class="custom-badge-corner top-left"></div>
                          <div class="custom-badge-corner top-right"></div>
                          <div class="custom-badge-corner bottom-left"></div>
                          <div class="custom-badge-corner bottom-right"></div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="kata-languages-section">
                <h4 class="sub-section-title mono">// COMPLETED LANGUAGES &amp; RANKS</h4>
                <div class="kata-lang-layout-grid">
                  <!-- Languages List -->
                  <div class="kata-lang-grid">
                    <div class="kata-lang-card" v-for="lang in kataLanguages" :key="lang.name">
                      <div class="kata-lang-header">
                        <span class="kata-lang-name mono">{{ lang.name }}</span>
                        <span class="kata-lang-rank-badge mono" :class="'rank-' + lang.color">{{ lang.rank }}</span>
                      </div>
                      <div class="kata-lang-progress-lbl mono">
                        <span>NEXT RANK PROGRESS</span>
                        <span>{{ lang.progress }}%</span>
                      </div>
                      <div class="kata-lang-progress-bar">
                        <div class="kata-lang-progress-fill" :style="{ width: lang.progress + '%', backgroundColor: lang.colorHex }"></div>
                      </div>
                      <div class="kata-lang-footer mono">
                        <span>Score: {{ lang.score }}</span>
                        <span class="text-dim">{{ lang.solved }} resolved</span>
                      </div>
                    </div>
                  </div>

                  <!-- Telemetry Console -->
                  <div class="kata-console-card">
                    <div class="console-header mono">
                      <span class="console-dot green"></span>
                      <span>SYSTEM MONITOR // STATUS_OK</span>
                    </div>
                    <div class="console-body mono">
                      <div class="console-line"><span class="console-time">[03:47:11]</span> SECURE LINK ESTABLISHED</div>
                      <div class="console-line"><span class="console-time">[03:47:12]</span> API TELEMETRY SYNC: OK</div>
                      <div class="console-line"><span class="console-time">[03:47:12]</span> JS ENGINE kyu_level: 5</div>
                      <div class="console-line"><span class="console-time">[03:47:13]</span> C# SIGNATURE SCAN: STABLE</div>
                      <div class="console-line"><span class="console-time">[03:47:15]</span> C COMPILER STATUS: verified</div>
                      <div class="console-line"><span class="console-time">[03:47:16]</span> THREAD COUNT: 3 ACTIVE</div>
                      <div class="console-line blink-line"><span class="console-time">[LIVE]</span> MONITORING USER OPERATIONS...</div>
                    </div>
                  </div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { scrambleText } from '../composables/useScramble.js'

const titleEl = ref(null)
const barsEl = ref(null)
const barsVisible = ref(false)
const barsGlowing = ref(false)

const badgeWrapRef = ref(null)
const badgeShellRef = ref(null)
const enterTimerRef = ref(null)
const leaveRafRef = ref(null)

const getShell = () => {
  const val = badgeShellRef.value
  return Array.isArray(val) ? val[0] : val
}

const getWrap = () => {
  const val = badgeWrapRef.value
  return Array.isArray(val) ? val[0] : val
}

let tiltEngine = null

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  ENTER_TRANSITION_MS: 180
}

function createTiltEngine() {
  let rafId = null
  let running = false
  let lastTs = 0

  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0

  const DEFAULT_TAU = 0.14
  const INITIAL_TAU = 0.6
  let initialUntil = 0

  const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max)
  const round = (v, precision = 3) => parseFloat(v.toFixed(precision))
  const adjust = (v, fMin, fMax, tMin, tMax) =>
    round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin))

  const setVarsFromXY = (x, y) => {
    const shell = getShell()
    const wrap = getWrap()
    if (!shell || !wrap) return

    const width = shell.clientWidth || 1
    const height = shell.clientHeight || 1

    const percentX = clamp((100 / width) * x)
    const percentY = clamp((100 / height) * y)

    const centerX = percentX - 50
    const centerY = percentY - 50

    const properties = {
      '--pointer-x': `${percentX}%`,
      '--pointer-y': `${percentY}%`,
      '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
      '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
      '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
      '--pointer-from-top': `${percentY / 100}`,
      '--pointer-from-left': `${percentX / 100}`,
      '--rotate-x': `${round(-(centerX / 5))}deg`,
      '--rotate-y': `${round(centerY / 4)}deg`
    }

    for (const [k, v] of Object.entries(properties)) {
      wrap.style.setProperty(k, v)
    }
  }

  const step = (ts) => {
    if (!running) return
    if (lastTs === 0) lastTs = ts
    const dt = (ts - lastTs) / 1000
    lastTs = ts

    const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU
    const k = 1 - Math.exp(-dt / tau)

    currentX += (targetX - currentX) * k
    currentY += (targetY - currentY) * k

    setVarsFromXY(currentX, currentY)

    const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05

    if (stillFar || document.hasFocus()) {
      rafId = requestAnimationFrame(step)
    } else {
      running = false
      lastTs = 0
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }

  const start = () => {
    if (running) return
    running = true
    lastTs = 0
    rafId = requestAnimationFrame(step)
  }

  return {
    setImmediate(x, y) {
      currentX = x
      currentY = y
      setVarsFromXY(currentX, currentY)
    },
    setTarget(x, y) {
      targetX = x
      targetY = y
      start()
    },
    toCenter() {
      const shell = getShell()
      if (!shell) return
      this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2)
    },
    beginInitial(durationMs) {
      initialUntil = performance.now() + durationMs
      start()
    },
    getCurrent() {
      return { x: currentX, y: currentY, tx: targetX, ty: targetY }
    },
    cancel() {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = null
      running = false
      lastTs = 0
    }
  }
}

const getOffsets = (evt, el) => {
  const rect = el.getBoundingClientRect()
  return { x: evt.clientX - rect.left, y: evt.clientY - rect.top }
}

const handlePointerMove = (event) => {
  const shell = getShell()
  if (!shell || !tiltEngine) return
  const { x, y } = getOffsets(event, shell)
  tiltEngine.setTarget(x, y)
}

const handlePointerEnter = (event) => {
  const shell = getShell()
  if (!shell || !tiltEngine) return

  shell.classList.add('active')
  shell.classList.add('entering')
  if (enterTimerRef.value) window.clearTimeout(enterTimerRef.value)
  enterTimerRef.value = window.setTimeout(() => {
    shell.classList.remove('entering')
  }, ANIMATION_CONFIG.ENTER_TRANSITION_MS)

  const { x, y } = getOffsets(event, shell)
  tiltEngine.setTarget(x, y)
}

const handlePointerLeave = () => {
  const shell = getShell()
  if (!shell || !tiltEngine) return

  tiltEngine.toCenter()

  const checkSettle = () => {
    const { x, y, tx, ty } = tiltEngine.getCurrent()
    const settled = Math.hypot(tx - x, ty - y) < 0.6
    if (settled) {
      shell.classList.remove('active')
      leaveRafRef.value = null
    } else {
      leaveRafRef.value = requestAnimationFrame(checkSettle)
    }
  }
  if (leaveRafRef.value) cancelAnimationFrame(leaveRafRef.value)
  leaveRafRef.value = requestAnimationFrame(checkSettle)
}

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
  { title: 'Codewars & Katas',     icon: codeIcon,   type: 'codewars' },
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
const kataLanguages = ref([
  { name: 'JavaScript', rank: '5 kyu', color: 'yellow', colorHex: '#ECB939', score: 336, progress: 75, solved: '80+' },
  { name: 'C#', rank: '7 kyu', color: 'white', colorHex: '#E6E6E6', score: 45, progress: 35, solved: '10+' },
  { name: 'C', rank: '8 kyu', color: 'white', colorHex: '#9B9B9B', score: 3, progress: 10, solved: '1+' },
])

const codewarsStats = ref({
  rank: '5 kyu',
  honor: 410,
  completed: 94
})

async function fetchCodewarsStats() {
  try {
    const res = await fetch('/api/codewars')
    if (!res.ok) return
    const data = await res.json()
    
    if (data.ranks && data.ranks.overall) {
      codewarsStats.value.rank = data.ranks.overall.name || '5 kyu'
      codewarsStats.value.honor = data.honor || 410
      codewarsStats.value.completed = data.codeChallenges ? data.codeChallenges.totalCompleted : 94
      
      const langs = data.ranks.languages || {}
      const updatedLangs = []
      
      const langMapping = {
        javascript: { name: 'JavaScript', colorHex: '#ECB939', maxScore: 400 },
        csharp: { name: 'C#', colorHex: '#E6E6E6', maxScore: 100 },
        c: { name: 'C', colorHex: '#9B9B9B', maxScore: 10 }
      }
      
      Object.keys(langs).forEach(key => {
        const info = langs[key]
        const mapping = langMapping[key.toLowerCase()] || { name: key, colorHex: '#E6E6E6', maxScore: 100 }
        const progress = Math.min(100, Math.max(10, Math.round((info.score / mapping.maxScore) * 100)))
        
        updatedLangs.push({
          name: mapping.name,
          rank: info.name || `${Math.abs(info.rank)} kyu`,
          color: info.color || 'white',
          colorHex: mapping.colorHex,
          score: info.score || 0,
          progress: progress,
          solved: info.score > 100 ? '80+' : (info.score > 20 ? '10+' : '1+')
        })
      })
      
      updatedLangs.sort((a, b) => b.score - a.score)
      if (updatedLangs.length > 0) {
        kataLanguages.value = updatedLangs
      }
    }
  } catch (err) {
    console.warn('Failed to fetch real-time Codewars stats, using static fallback.', err)
  }
}

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

  fetchCodewarsStats()

  // Initialize 3D Tilt Engine for Codewars status card
  tiltEngine = createTiltEngine()
  const shell = getShell()
  if (shell) {
    shell.addEventListener('pointerenter', handlePointerEnter)
    shell.addEventListener('pointermove', handlePointerMove)
    shell.addEventListener('pointerleave', handlePointerLeave)

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET
    tiltEngine.setImmediate(initialX, initialY)
    tiltEngine.toCenter()
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION)
  }
})

onUnmounted(() => {
  const shell = getShell()
  if (shell) {
    shell.removeEventListener('pointerenter', handlePointerEnter)
    shell.removeEventListener('pointermove', handlePointerMove)
    shell.removeEventListener('pointerleave', handlePointerLeave)
    shell.classList.remove('entering')
  }
  if (enterTimerRef.value) window.clearTimeout(enterTimerRef.value)
  if (leaveRafRef.value) cancelAnimationFrame(leaveRafRef.value)
  tiltEngine?.cancel()
})
</script>

<style scoped>
.skills-section {
  background: var(--bg);
  padding-bottom: 20px !important;
}
.skills-section::after {
  height: 40px !important;
}
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

/* Codewars card customizations */
.card-codewars {
  grid-column: span 2;
}
.codewars-flex {
  display: flex;
  gap: 32px;
  align-items: stretch;
  width: 100%;
}
.codewars-badge-wrapper-left {
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  border-right: 1px solid var(--gold-border);
  padding-right: 32px;
}
/* Custom Cyber Codewars Badge */
/* 3D ProfileCard styles for Codewars Badge */
.pc-card-wrapper {
  --pointer-x: 50%;
  --pointer-y: 50%;
  --pointer-from-center: 0;
  --pointer-from-top: 0.5;
  --pointer-from-left: 0.5;
  --card-opacity: 0;
  --rotate-x: 0deg;
  --rotate-y: 0deg;
  --background-x: 50%;
  --background-y: 50%;
  --behind-glow-color: rgba(255, 107, 26, 0.35);
  --behind-glow-size: 60%;
  --sunpillar-1: hsl(15, 100%, 70%);
  --sunpillar-2: hsl(35, 100%, 65%);
  --sunpillar-3: hsl(50, 100%, 60%);
  --sunpillar-4: hsl(15, 100%, 75%);
  --sunpillar-5: hsl(35, 100%, 70%);
  --sunpillar-6: hsl(50, 100%, 65%);
  --sunpillar-clr-1: var(--sunpillar-1);
  --sunpillar-clr-2: var(--sunpillar-2);
  --sunpillar-clr-3: var(--sunpillar-3);
  --sunpillar-clr-4: var(--sunpillar-4);
  --sunpillar-clr-5: var(--sunpillar-5);
  --sunpillar-clr-6: var(--sunpillar-6);
  --card-radius: 6px;

  perspective: 600px;
  transform: translate3d(0, 0, 0.1px);
  position: relative;
  touch-action: none;
  width: 100%;
  height: 100%;
}
.pc-behind {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at var(--pointer-x) var(--pointer-y),
    var(--behind-glow-color) 0%,
    transparent var(--behind-glow-size)
  );
  filter: blur(40px) saturate(1.2);
  opacity: calc(0.85 * var(--card-opacity));
  transition: opacity 250ms ease;
}
.pc-card-wrapper:hover,
.pc-card-wrapper.active {
  --card-opacity: 1;
}
.pc-card-shell {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.pc-card {
  box-shadow: rgba(0, 0, 0, 0.6) calc((var(--pointer-from-left) * 8px) - 3px)
    calc((var(--pointer-from-top) * 16px) - 6px) 16px -4px;
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transform: translateZ(0) rotateX(0deg) rotateY(0deg);
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  display: block;
}
.pc-card:hover,
.pc-card.active {
  transition: none;
  transform: translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x));
}
.pc-card-shell.entering .pc-card {
  transition: transform 180ms ease-out;
}
.pc-inside {
  position: absolute;
  inset: 0;
  background: rgba(17, 17, 16, 0.88);
  border-radius: var(--card-radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.pc-card-content-overlay {
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
}
.pc-card-content-overlay * {
  pointer-events: auto;
}
.pc-shine {
  position: absolute;
  inset: 0;
  transition: filter 0.8s ease;
  filter: brightness(0.66) contrast(1.33) saturate(0.33) opacity(0.35);
  animation: holo-bg 18s linear infinite;
  mix-blend-mode: color-dodge;
  z-index: 3;
  pointer-events: none;
  border-radius: var(--card-radius);
}
.pc-shine,
.pc-shine::after {
  --space: 5%;
  --angle: -45deg;
  background: transparent;
  background-image:
    repeating-linear-gradient(
      0deg,
      var(--sunpillar-clr-1) calc(var(--space) * 1),
      var(--sunpillar-clr-2) calc(var(--space) * 2),
      var(--sunpillar-clr-3) calc(var(--space) * 3),
      var(--sunpillar-clr-4) calc(var(--space) * 4),
      var(--sunpillar-clr-5) calc(var(--space) * 5),
      var(--sunpillar-clr-6) calc(var(--space) * 6),
      var(--sunpillar-clr-1) calc(var(--space) * 7)
    ),
    repeating-linear-gradient(
      var(--angle),
      #0e152e 0%,
      hsl(35, 10%, 60%) 3.8%,
      hsl(35, 29%, 66%) 4.5%,
      hsl(35, 10%, 60%) 5.2%,
      #0e152e 10%,
      #0e152e 12%
    ),
    radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsla(0, 0%, 0%, 0.1) 12%,
      hsla(0, 0%, 0%, 0.15) 20%,
      hsla(0, 0%, 0%, 0.25) 120%
    );
  background-position:
    0 var(--background-y),
    var(--background-x) var(--background-y),
    center;
  background-blend-mode: color, hard-light;
  background-size:
    500% 500%,
    300% 300%,
    200% 200%;
  background-repeat: repeat;
}
.pc-shine::before,
.pc-shine::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;
  border-radius: var(--card-radius);
}
.pc-card:hover .pc-shine,
.pc-card.active .pc-shine {
  filter: brightness(0.85) contrast(1.5) saturate(0.5);
  animation-play-state: paused;
}
.pc-card:hover .pc-shine::before,
.pc-card.active .pc-shine::before,
.pc-card:hover .pc-shine::after,
.pc-card.active .pc-shine::after {
  opacity: 1;
}
.pc-shine::before {
  background-image:
    linear-gradient(
      45deg,
      var(--sunpillar-4),
      var(--sunpillar-5),
      var(--sunpillar-6),
      var(--sunpillar-1),
      var(--sunpillar-2),
      var(--sunpillar-3)
    ),
    radial-gradient(circle at var(--pointer-x) var(--pointer-y), hsl(0, 0%, 70%) 0%, hsla(0, 0%, 30%, 0.2) 90%);
  background-size:
    250% 250%,
    100% 100%;
  background-position:
    var(--pointer-x) var(--pointer-y),
    center;
  background-blend-mode: color-dodge;
  filter: brightness(calc(2 - var(--pointer-from-center))) contrast(calc(var(--pointer-from-center) + 2))
    saturate(calc(0.5 + var(--pointer-from-center)));
  mix-blend-mode: luminosity;
}
.pc-shine::after {
  background-position:
    0 var(--background-y),
    calc(var(--background-x) * 0.4) calc(var(--background-y) * 0.5),
    center;
  background-size:
    200% 300%,
    700% 700%,
    100% 100%;
  mix-blend-mode: difference;
  filter: brightness(0.8) contrast(1.5);
}
.pc-glare {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    farthest-corner circle at var(--pointer-x) var(--pointer-y),
    hsl(35, 25%, 80%) 12%,
    hsla(20, 40%, 15%, 0.8) 90%
  );
  mix-blend-mode: overlay;
  filter: brightness(0.8) contrast(1.2);
  z-index: 4;
  pointer-events: none;
  border-radius: var(--card-radius);
}
@keyframes holo-bg {
  0% {
    background-position:
      0 var(--background-y),
      0 0,
      center;
  }
  100% {
    background-position:
      0 var(--background-y),
      100% 100%,
      center;
  }
}

.custom-codewars-badge-card {
  display: flex;
  flex-direction: column;
  background: rgba(17, 17, 16, 0.85);
  border: 1px solid var(--gold-border);
  box-shadow: 0 0 24px rgba(255, 107, 26, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  text-decoration: none;
  color: var(--text);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}
.custom-codewars-badge-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 107, 26, 0.08) 1px, transparent 1px);
  background-size: 8px 8px;
  pointer-events: none;
  opacity: 0.55;
  animation: grid-flicker 8s ease-in-out infinite alternate;
  z-index: 0;
}
@keyframes grid-flicker {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.65; }
}
.custom-codewars-badge-card:hover {
  border-color: rgba(255, 107, 26, 0.5);
  box-shadow: 0 0 35px rgba(255, 107, 26, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
.custom-badge-header {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1;
}
.custom-badge-avatar-wrap {
  width: 40px;
  height: 40px;
  background: var(--gradient-gold-v);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(255, 107, 26, 0.4);
}
.custom-badge-avatar {
  width: 36px;
  height: 36px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  object-fit: cover;
}
.custom-badge-title-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.custom-badge-logo-wrap {
  width: 26px;
  height: 26px;
  border-radius: 4px;
  background: rgba(255, 107, 26, 0.2);
  border: 1px solid rgba(255, 107, 26, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  box-shadow: 0 0 8px rgba(255, 107, 26, 0.3);
  transition: background 0.25s, border-color 0.25s, box-shadow 0.25s;
  z-index: 1;
}
.custom-codewars-badge-card:hover .custom-badge-logo-wrap {
  background: rgba(255, 107, 26, 0.32);
  border-color: rgba(255, 107, 26, 0.8);
  box-shadow: 0 0 12px rgba(255, 107, 26, 0.55);
}
.custom-badge-logo-img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  filter: invert(1) brightness(2);
  transition: filter 0.25s ease;
}
.custom-codewars-badge-card:hover .custom-badge-logo-img {
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(98%) contrast(101%) drop-shadow(0 0 4px rgba(255, 107, 26, 0.6));
}
.custom-badge-title {
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  color: var(--text-2);
  font-weight: 700;
}
.custom-badge-user {
  font-size: 0.58rem;
  color: var(--text);
  font-weight: 600;
  letter-spacing: 0.05em;
}
.custom-badge-connection {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.52rem;
  color: #3fb950;
  letter-spacing: 0.08em;
  background: rgba(63, 185, 80, 0.06);
  border: 1px solid rgba(63, 185, 80, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  align-self: flex-start;
  margin-top: -4px;
}
.connection-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3fb950;
  box-shadow: 0 0 8px #3fb950;
  animation: connection-blink 1.5s infinite;
}
@keyframes connection-blink {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
.custom-badge-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
.custom-badge-lbl {
  font-size: 0.55rem;
  color: var(--text-3);
  letter-spacing: 0.12em;
}
.custom-badge-rank {
  font-size: 2rem;
  font-weight: 800;
  background: var(--gradient-gold);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-text 5s ease infinite;
  letter-spacing: -0.01em;
  text-shadow: 0 0 15px rgba(255, 107, 26, 0.15);
  text-align: center;
  width: 100%;
}
.custom-badge-rank.rank-yellow {
  color: #ECB939;
  text-shadow: 0 0 15px rgba(236, 185, 57, 0.35);
}
.custom-badge-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
}
.custom-badge-metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.metric-lbl {
  font-size: 0.58rem;
  color: var(--text-3);
  letter-spacing: 0.08em;
}
.metric-val {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text);
}
.custom-badge-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 107, 26, 0.15);
}
.custom-badge-scanline {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 107, 26, 0) 45%,
    rgba(255, 107, 26, 0.18) 50%,
    rgba(255, 107, 26, 0) 55%,
    transparent 100%
  );
  background-size: 100% 200%;
  animation: badge-scan 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  opacity: 0.6;
  filter: blur(1px);
  z-index: 1;
}
@keyframes badge-scan {
  0% { background-position: 0 -200%; }
  100% { background-position: 0 200%; }
}
/* Cyber corners */
.custom-badge-corner {
  position: absolute;
  width: 5px;
  height: 5px;
  border-color: var(--gold);
  border-style: solid;
  opacity: 0.55;
  pointer-events: none;
}
.custom-badge-corner.top-left { top: 6px; left: 6px; border-width: 1px 0 0 1px; }
.custom-badge-corner.top-right { top: 6px; right: 6px; border-width: 1px 1px 0 0; }
.custom-badge-corner.bottom-left { bottom: 6px; left: 6px; border-width: 0 0 1px 1px; }
.custom-badge-corner.bottom-right { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }
.kata-languages-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.sub-section-title {
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: var(--gold-light);
  margin-bottom: 16px;
}
.kata-lang-layout-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
}
.kata-lang-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.kata-console-card {
  background: rgba(9, 9, 8, 0.6);
  border: 1px solid rgba(255, 107, 26, 0.15);
  border-radius: 6px;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  height: 100%;
  min-height: 220px;
}
.console-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.65rem;
  color: var(--text-2);
  border-bottom: 1px solid rgba(255, 107, 26, 0.1);
  padding-bottom: 8px;
}
.console-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #3fb950;
  box-shadow: 0 0 6px #3fb950;
}
.console-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.65rem;
  color: #a0a0a0;
  line-height: 1.6;
}
.console-time {
  color: var(--gold-dark);
}
.console-line {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.blink-line {
  color: var(--text);
  animation: console-blink 1.5s infinite;
}
@keyframes console-blink {
  50% { opacity: 0.6; }
}
.kata-lang-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.25s, background 0.25s;
}
.kata-lang-card:hover {
  border-color: rgba(255, 107, 26, 0.15);
  background: rgba(255, 107, 26, 0.02);
}
.kata-lang-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.kata-lang-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text);
}
.kata-lang-rank-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}
.kata-lang-rank-badge.rank-yellow {
  background: rgba(236, 185, 57, 0.15);
  color: #ECB939;
  border: 1px solid rgba(236, 185, 57, 0.3);
}
.kata-lang-rank-badge.rank-white {
  background: rgba(255, 255, 255, 0.1);
  color: #E6E6E6;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.kata-lang-progress-lbl {
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
  color: var(--text-3);
  letter-spacing: 0.05em;
  margin-top: 2px;
  margin-bottom: -2px;
}
.kata-lang-progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}
.kata-lang-progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s ease-out;
  background-image: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(9, 9, 8, 0.85) 2px,
    rgba(9, 9, 8, 0.85) 4px
  );
}
.kata-lang-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: var(--text-2);
}

@media (max-width: 900px) {
  .codewars-flex {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
  .codewars-badge-wrapper-left {
    flex: none;
    border-right: none;
    border-bottom: 1px solid var(--gold-border);
    padding-right: 0;
    padding-bottom: 24px;
    align-items: center;
    width: 100%;
  }
}
@media (max-width: 1100px) {
  .kata-lang-layout-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 768px) {
  .card-codewars {
    grid-column: span 1;
  }
}

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
