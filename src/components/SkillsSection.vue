<template>
  <section id="skills" class="section skills-section">
    <div class="dot-grid" aria-hidden="true"></div>
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title" ref="titleEl">Skills & Expertise</h2>
        <div class="section-line"></div>
        <p class="section-desc">
          A battle-tested toolkit spanning security engineering, full-stack
          development, and low-level systems.
        </p>
      </div>

      <div class="skills-bars reveal" ref="barsEl">
        <div
          class="skills-group"
          v-for="(group, gi) in skillGroups"
          :key="group.label"
          :style="{ transitionDelay: gi * 0.12 + 's' }"
        >
          <h3 class="group-label">
            <span class="group-icon" v-html="group.icon"></span>
            {{ group.label }}
          </h3>
          <div class="skill-bar-list">
            <span
              class="skill-name"
              v-for="(skill, si) in group.skills"
              :key="skill.name"
              :style="{ animationDelay: (gi * 5 + si) * 0.28 + 's' }"
              >{{ skill.name }}</span
            >
          </div>
        </div>
      </div>

      <div class="skills-cards-grid">
        <div
          class="skills-card gold-card spotlight reveal-left"
          v-for="(card, ci) in cards"
          :key="card.title"
          :class="'card-' + card.type"
          :style="{ transitionDelay: ci * 0.1 + 's' }"
          @mousemove="spotCard"
          @mouseleave="
            (e) => {
              e.currentTarget.style.removeProperty('--sx')
              e.currentTarget.style.removeProperty('--sy')
            }
          "
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
                <svg
                  class="sec-check"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ s }}
              </div>
            </div>
            <!-- Languages -->
            <div v-else-if="card.type === 'lang'" class="lang-list">
              <div class="lang-item" v-for="l in languages" :key="l.name">
                <div class="lang-flag-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path
                      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="lang-name">{{ l.name }}</div>
                  <div class="lang-level mono">{{ l.level }}</div>
                </div>
              </div>
            </div>
            <!-- Codewars -->
            <div v-else-if="card.type === 'codewars'" class="codewars-flex">
              <!-- Left Side: Unified Codewars Profile Card -->
              <div class="codewars-badge-wrapper-left">
                <!-- <h4 class="sub-section-title mono">// CODEWARS PROFILE</h4> -->
                <a
                  href="https://www.codewars.com/users/PrmWiny"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="custom-codewars-badge-card"
                >
                  <!-- Card Header -->
                  <div class="custom-badge-header">
                    <div class="custom-badge-avatar-wrap">
                      <img
                        src="https://github.com/PrmWiny.png"
                        alt="Profile Picture"
                        class="custom-badge-avatar"
                      />
                    </div>
                    <div class="custom-badge-title-block">
                      <span class="custom-badge-title mono"
                        >CODEWARS PROFILE</span
                      >
                      <span class="custom-badge-user mono">@PRMWINY</span>
                    </div>
                    <div class="custom-badge-logo-wrap">
                      <img
                        src="https://images.icon-icons.com/2389/PNG/512/codewars_logo_icon_145389.png"
                        alt="Codewars Logo"
                        class="custom-badge-logo-img"
                      />
                    </div>
                  </div>

                  <!-- Main Kyu Rank Display -->
                  <div class="custom-badge-body">
                    <div class="custom-badge-rank-hero">
                      <div class="rank-badge-pill mono rank-yellow">
                        <span class="rank-kyu-val">{{
                          codewarsStats.rank.toUpperCase()
                        }}</span>
                      </div>
                      <div class="rank-level-info">
                        <h3 class="rank-level-title mono">
                          {{ codewarsStats.levelName }}
                        </h3>
                        <span class="rank-level-sub mono">{{
                          codewarsStats.tierName
                        }}</span>
                      </div>
                    </div>

                    <!-- Next Rank Target Milestone -->
                    <div class="kyu-next-milestone mono">
                      <div class="milestone-header">
                        <span>NEXT RANK TARGET</span>
                        <span class="milestone-target">{{
                          codewarsStats.targetRankName
                        }}</span>
                      </div>
                      <div class="milestone-progress-bar">
                        <div
                          class="milestone-progress-fill"
                          :style="{
                            width: codewarsStats.nextRankProgress + '%',
                          }"
                        ></div>
                      </div>
                      <div class="milestone-footer">
                        <span>Score: {{ codewarsStats.targetScoreText }}</span>
                        <span class="text-gold"
                          >{{ codewarsStats.nextRankProgress }}% Progress</span
                        >
                      </div>
                    </div>

                    <!-- Core Competencies Badges (Symmetrical 3-Column Grid) -->
                    <div class="kyu-competencies mono">
                      <div class="competencies-header">
                        <span>CORE COMPETENCIES</span>
                        <span class="text-gold">5 KYU VALIDATED</span>
                      </div>
                      <div class="competencies-tags">
                        <div class="comp-tag">
                          <span class="comp-icon">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polygon
                                points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                              />
                            </svg>
                          </span>
                          <span class="comp-name">Algorithms</span>
                        </div>
                        <div class="comp-tag">
                          <span class="comp-icon">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <polygon points="12 2 2 7 12 12 22 7 12 2" />
                              <polyline points="2 17 12 22 22 17" />
                              <polyline points="2 12 12 17 22 12" />
                            </svg>
                          </span>
                          <span class="comp-name">Data Struct</span>
                        </div>
                        <div class="comp-tag">
                          <span class="comp-icon">
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <rect
                                x="4"
                                y="4"
                                width="16"
                                height="16"
                                rx="2"
                                ry="2"
                              />
                              <rect x="9" y="9" width="6" height="6" />
                              <line x1="9" y1="1" x2="9" y2="4" />
                              <line x1="15" y1="1" x2="15" y2="4" />
                              <line x1="9" y1="20" x2="9" y2="23" />
                              <line x1="15" y1="20" x2="15" y2="23" />
                              <line x1="20" y1="9" x2="23" y2="9" />
                              <line x1="20" y1="15" x2="23" y2="15" />
                              <line x1="1" y1="9" x2="4" y2="9" />
                              <line x1="1" y1="15" x2="4" y2="15" />
                            </svg>
                          </span>
                          <span class="comp-name">Optimization</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Card Metrics Footer (Grid Symmetrical 3-Column Alignment) -->
                  <div class="custom-badge-footer">
                    <div class="custom-badge-metric">
                      <span class="metric-lbl mono">HONOR SCORE</span>
                      <span class="metric-val mono">{{
                        codewarsStats.honor
                      }}</span>
                    </div>
                    <div class="custom-badge-divider"></div>
                    <div class="custom-badge-metric">
                      <span class="metric-lbl mono">KATAS SOLVED</span>
                      <span class="metric-val mono">{{
                        codewarsStats.completed
                      }}</span>
                    </div>
                    <div class="custom-badge-divider"></div>
                    <div class="custom-badge-metric">
                      <span class="metric-lbl mono">GLOBAL RANK</span>
                      <span class="metric-val mono">{{
                        codewarsStats.leaderboard
                      }}</span>
                    </div>
                  </div>
                </a>
              </div>

              <!-- Right Side: Completed Languages & Ranks -->
              <div class="kata-languages-section">
                <!-- <h4 class="sub-section-title mono">// COMPLETED LANGUAGES</h4> -->
                <div class="kata-lang-grid">
                  <div
                    class="kata-lang-card"
                    v-for="lang in kataLanguages"
                    :key="lang.name"
                  >
                    <div class="kata-lang-header">
                      <span class="kata-lang-name mono">{{ lang.name }}</span>
                      <span
                        class="kata-lang-rank-badge mono"
                        :class="'rank-' + lang.color"
                        >{{ lang.rank }}</span
                      >
                    </div>
                    <div class="kata-lang-progress-lbl mono">
                      <span>NEXT RANK PROGRESS</span>
                      <span>{{ lang.progress }}%</span>
                    </div>
                    <div class="kata-lang-progress-bar">
                      <div
                        class="kata-lang-progress-fill"
                        :style="{
                          width: lang.progress + '%',
                          backgroundColor: lang.colorHex,
                        }"
                      ></div>
                    </div>
                    <div class="kata-lang-footer mono">
                      <span>Score: {{ lang.score }}</span>
                      <span class="text-dim">{{ lang.solved }} resolved</span>
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
  {
    icon: codeIcon,
    label: 'Languages',
    skills: [
      { name: 'Python', pct: 88 },
      { name: 'JavaScript / TypeScript', pct: 85 },
      { name: 'C++ (C Plus Plus)', pct: 75 },
      { name: 'C# (C Sharp)', pct: 75 },
    ],
  },
  {
    icon: layersIcon,
    label: 'Frameworks & Frontend',
    skills: [
      { name: 'Vue.js 3 / Nuxt', pct: 90 },
      { name: 'Tailwind CSS', pct: 88 },
      { name: 'NestJS', pct: 80 },
      { name: 'Tauri (Rust)', pct: 72 },
    ],
  },
  {
    icon: shieldIcon,
    label: 'Security',
    skills: [
      { name: 'Vulnerability Assessment', pct: 92 },
      { name: 'Penetration Testing', pct: 85 },
      { name: 'Low-Level Memory Analysis', pct: 87 },
      { name: 'Reverse Engineering', pct: 80 },
    ],
  },
  {
    icon: targetIcon,
    label: 'Architecture & System',
    skills: [
      { name: 'Database Architecture', pct: 88 },
      { name: 'PostgreSQL / MongoDB', pct: 85 },
      { name: 'System Design', pct: 82 },
    ],
  },
  {
    icon: wrenchIcon,
    label: 'DevOps & Tooling',
    skills: [
      { name: 'Docker / Kubernetes', pct: 82 },
      { name: 'CI/CD Pipelines', pct: 85 },
      { name: 'Linux Administration', pct: 88 },
      { name: 'Git & Workflows', pct: 92 },
    ],
  },
]

const cards = [
  { title: 'Professional Skills', icon: targetIcon, type: 'pro' },
  { title: 'Tools & Platforms', icon: wrenchIcon, type: 'tools' },
  { title: 'Security Specs', icon: lockIcon, type: 'sec' },
  { title: 'Languages', icon: globeIcon, type: 'lang' },
  { title: 'Codewars & Katas', icon: codeIcon, type: 'codewars' },
]

const proSkills = [
  { name: 'Full-Stack Software Development', tag: 'core' },
  { name: 'Low-Level Memory Analysis', tag: 'expert' },
  { name: 'Vulnerability Assessment & Mitigation', tag: 'core' },
  { name: 'Anti-Cheat Logic Design', tag: 'niche' },
  { name: 'Systems & Database Architecture', tag: 'core' },
]

const tools = [
  'Docker Compose',
  'Nginx',
  'Supabase',
  'REST APIs',
  'SIEM',
  'PostgreSQL',
  'VMProtect SDK',
  'LINE LIFF',
]

const secSkills = [
  'Vulnerability Assessment & Mitigation',
  'Vulnerability Management',
  'Penetration Testing',
  'Low-Level Memory Analysis',
  'Defensive Anti-Cheat Logic',
  'Security Controls & Policies',
  'Binary Virtualization (VMProtect)',
  'DMA/FPGA Threat Mitigation',
]

const languages = [
  { name: 'Thai', level: 'Native' },
  { name: 'English', level: 'Professional Working — TETET Certified' },
]

const kataLanguages = ref([
  {
    name: 'JavaScript',
    rank: '5 kyu',
    color: 'yellow',
    colorHex: '#ECB939',
    score: 336,
    progress: 75,
    solved: '80+',
  },
  {
    name: 'C#',
    rank: '6 kyu',
    color: 'yellow',
    colorHex: '#E6E6E6',
    score: 82,
    progress: 45,
    solved: '10+',
  },
  {
    name: 'C',
    rank: '8 kyu',
    color: 'white',
    colorHex: '#9B9B9B',
    score: 3,
    progress: 10,
    solved: '1+',
  },
])

const codewarsStats = ref({
  rank: '5 kyu',
  rankNumber: 5,
  levelName: 'Intermediate Developer',
  tierName: 'Yellow Belt (Algorithms & Logic)',
  honor: 434,
  completed: 97,
  leaderboard: '#163,172',
  targetRankName: '4 KYU (PROFICIENT)',
  targetScoreText: '418 / 500 pts',
  nextRankProgress: 66,
})

async function fetchCodewarsStats() {
  try {
    const res = await fetch('/api/codewars')
    if (!res.ok) return
    const data = await res.json()

    if (data.ranks && data.ranks.overall) {
      const overall = data.ranks.overall
      const rNum = Math.abs(overall.rank || 5)
      const currentScore = overall.score || 418

      codewarsStats.value.rank = overall.name || '5 kyu'
      codewarsStats.value.rankNumber = rNum
      codewarsStats.value.honor = data.honor || 434
      codewarsStats.value.completed = data.codeChallenges
        ? data.codeChallenges.totalCompleted
        : 97
      codewarsStats.value.leaderboard = data.leaderboardPosition
        ? `#${data.leaderboardPosition.toLocaleString()}`
        : '#163,172'

      // Dynamic next rank score target calculation
      if (rNum === 5) {
        codewarsStats.value.targetRankName = '4 KYU (PROFICIENT)'
        codewarsStats.value.targetScoreText = `${currentScore} / 500 pts`
        const pct = Math.min(
          100,
          Math.max(10, Math.round(((currentScore - 260) / (500 - 260)) * 100)),
        )
        codewarsStats.value.nextRankProgress = pct
      } else if (rNum === 6) {
        codewarsStats.value.targetRankName = '5 KYU (INTERMEDIATE)'
        codewarsStats.value.targetScoreText = `${currentScore} / 260 pts`
        const pct = Math.min(
          100,
          Math.max(10, Math.round(((currentScore - 140) / (260 - 140)) * 100)),
        )
        codewarsStats.value.nextRankProgress = pct
      }

      if (rNum >= 7) {
        codewarsStats.value.levelName = 'Novice Developer'
        codewarsStats.value.tierName = 'White Belt (Fundamentals)'
      } else if (rNum >= 5) {
        codewarsStats.value.levelName = 'Intermediate Developer'
        codewarsStats.value.tierName = 'Yellow Belt (Algorithms & Logic)'
      } else if (rNum >= 3) {
        codewarsStats.value.levelName = 'Proficient Engineer'
        codewarsStats.value.tierName = 'Blue Belt (Advanced Katas)'
      } else {
        codewarsStats.value.levelName = 'Master Engineer'
        codewarsStats.value.tierName = 'Black/Red Belt (Expert CS)'
      }

      const langs = data.ranks.languages || {}
      const updatedLangs = []
      const langMapping = {
        javascript: { name: 'JavaScript', colorHex: '#ECB939', maxScore: 400 },
        csharp: { name: 'C#', colorHex: '#E6E6E6', maxScore: 100 },
        c: { name: 'C', colorHex: '#9B9B9B', maxScore: 10 },
      }

      Object.keys(langs).forEach((key) => {
        const info = langs[key]
        const mapping = langMapping[key.toLowerCase()] || {
          name: key,
          colorHex: '#E6E6E6',
          maxScore: 100,
        }
        const progress = Math.min(
          100,
          Math.max(10, Math.round((info.score / mapping.maxScore) * 100)),
        )

        updatedLangs.push({
          name: mapping.name,
          rank: info.name || `${Math.abs(info.rank)} kyu`,
          color: info.color || 'white',
          colorHex: mapping.colorHex,
          score: info.score || 0,
          progress: progress,
          solved: info.score > 100 ? '80+' : info.score > 20 ? '10+' : '1+',
        })
      })

      updatedLangs.sort((a, b) => b.score - a.score)
      if (updatedLangs.length > 0) kataLanguages.value = updatedLangs
    }
  } catch (err) {
    console.warn('Failed to fetch Codewars stats', err)
  }
}

onMounted(() => {
  const obs = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        if (titleEl.value)
          scrambleText(titleEl.value, 'Skills & Expertise', { duration: 750 })
        obs.disconnect()
      }
    },
    { threshold: 0.2 },
  )
  const sec = document.getElementById('skills')
  if (sec) obs.observe(sec)

  if (barsEl.value) {
    const bObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          barsVisible.value = true
          setTimeout(() => {
            barsGlowing.value = true
          }, 1400)
          bObs.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    bObs.observe(barsEl.value)
  }

  fetchCodewarsStats()
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
.mono {
  font-family: 'JetBrains Mono', monospace;
}
.section-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: var(--gold);
  opacity: 0.75;
  margin-bottom: 10px;
}
.section-title {
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  font-weight: 700;
  background: var(--gradient-gold);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-text 6s ease infinite;
  min-height: 1.2em;
}
.section-line {
  width: 44px;
  height: 2px;
  background: var(--gradient-gold);
  margin: 16px 0 18px;
  border-radius: 2px;
}
.section-desc {
  color: var(--text-2);
  font-size: 0.96rem;
  margin-bottom: 50px;
  max-width: 600px;
}

.skills-bars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 38px;
  margin-bottom: 44px;
}
.skills-group {
  display: flex;
  flex-direction: column;
}
.group-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 107, 26, 0.12);
  color: var(--gold-light);
}
.group-icon {
  display: flex;
  color: var(--gold);
}
.skill-bar-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.skill-name {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 14px;
  border-radius: 5px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
  color: var(--text);
  transition:
    transform 0.2s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    text-shadow 0.25s ease;
  cursor: default;
}
.skill-name::before {
  /* content: '//'; */
  font-size: 0.65em;
  color: var(--gold-dark);
  opacity: 0.7;
  flex-shrink: 0;
}
.skill-name:hover {
  transform: translateY(-2px);
}
@keyframes skill-glow {
  0%,
  100% {
    box-shadow:
      0 0 8px rgba(255, 107, 26, 0.1),
      0 2px 6px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }
  50% {
    box-shadow:
      0 0 18px rgba(255, 107, 26, 0.25),
      0 2px 6px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
}

.skills-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.skills-card {
  padding: 26px 22px;
}
.card-title {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 18px;
  padding-bottom: 13px;
  border-bottom: 1px solid var(--gold-border);
}
.card-icon {
  display: flex;
  color: var(--gold);
}

/* Codewars card customizations */
.card-codewars {
  grid-column: span 2;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.codewars-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  align-items: stretch;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.codewars-badge-wrapper-left {
  flex: 1 1 340px;
  max-width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  perspective: 1000px;
  box-sizing: border-box;
}

/* Custom Cyber Codewars Badge (GPU Accelerated - Zero Lag) */
.custom-codewars-badge-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: rgba(17, 17, 16, 0.92);
  border: 1px solid rgba(174, 170, 160, 0.15);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 15px rgba(236, 185, 57, 0.08);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 18px;
  gap: 14px;
  /* Hover OUT transition duration (0.45s smooth easing) */
  transition:
    transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.45s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
  will-change: transform, box-shadow, border-color;
}

.custom-codewars-badge-card:hover {
  /* Hover IN transition duration (0.35s snappy responsive easing) */
  transition:
    transform 0.7s cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 2s cubic-bezier(0.25, 1, 0.5, 1),
    border-color 5s cubic-bezier(0.25, 1, 0.5, 1),
    background-color 2s cubic-bezier(0.25, 1, 0.5, 1);
  transform: translateY(-2px) rotateX(2deg) rotateY(2deg);
  border-color: rgba(236, 138, 57, 0.8);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.6),
    0 0 25px rgba(236, 185, 57, 0.2);
}

.custom-badge-header {
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
}

.custom-badge-avatar-wrap {
  width: 38px;
  height: 38px;
  background: var(--gradient-gold-v);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(236, 185, 57, 0.4);
  animation: avatar-pulse 4s ease-in-out infinite;
}

@keyframes avatar-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 4px rgba(236, 185, 57, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 10px rgba(236, 185, 57, 0.7));
  }
}

.custom-badge-avatar {
  width: 34px;
  height: 34px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  object-fit: cover;
}

.custom-badge-title-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.custom-badge-title {
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--text-2);
  font-weight: 700;
}

.custom-badge-user {
  font-size: 0.58rem;
  color: #ecb939;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.custom-badge-logo-wrap {
  width: 26px;
  height: 26px;
  border-radius: 5px;
  background: rgba(236, 185, 57, 0.15);
  border: 1px solid rgba(236, 185, 57, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  box-shadow: 0 0 8px rgba(236, 185, 57, 0.25);
  transition:
    background 0.25s,
    border-color 0.25s;
}

.custom-codewars-badge-card:hover .custom-badge-logo-wrap {
  background: rgba(236, 185, 57, 0.3);
  border-color: rgba(236, 185, 57, 0.8);
}

.custom-badge-logo-img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  filter: invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg)
    brightness(98%) contrast(101%);
}

.custom-badge-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;
  flex: 1;
  z-index: 1;
}

.custom-badge-rank-hero {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  background: rgba(228, 160, 2, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  animation: rank-glow-loop 3.5s ease-in-out infinite;
}

.rank-badge-pill {
  padding: 4px 10px;
  border-radius: 5px;
  font-weight: 800;
  font-size: 1.05rem;
  letter-spacing: 0.05em;
  background: rgba(236, 185, 57, 0.15);
  /* border: 1px solid rgba(236, 185, 57, 0.5); */
  color: #ecb939;
  text-shadow: 0 0 10px rgba(236, 185, 57, 0.4);
  white-space: nowrap;
}

@keyframes rank-glow-loop {
  0%,
  100% {
    box-shadow: 0 0 6px rgba(236, 185, 57, 0.1);
    border-color: rgba(236, 185, 57, 0.4);
  }
  50% {
    box-shadow: 0 0 14px rgba(236, 185, 57, 0.5);
    border-color: rgba(236, 185, 57, 0.8);
  }
}

.rank-level-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.rank-level-title {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
  letter-spacing: 0.02em;
}

.rank-level-sub {
  font-size: 0.6rem;
  color: var(--text-2);
}

/* Next Milestone Progress */
.kyu-next-milestone {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(236, 185, 57, 0.04);
  border: 1px solid rgba(236, 185, 57, 0.18);
  border-radius: 6px;
  padding: 9px 11px;
}

.milestone-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
  color: var(--text-2);
  letter-spacing: 0.06em;
  font-weight: 600;
}

.milestone-target {
  color: var(--text);
  font-weight: 700;
}

.milestone-progress-bar {
  height: 5px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  overflow: hidden;
}

.milestone-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ecb939 0%, #fff0a8 50%, #ecb939 100%);
  background-size: 200% 100%;
  box-shadow: 0 0 8px rgba(236, 185, 57, 0.6);
  border-radius: 100px;
  animation: progress-flow 3s linear infinite;
}

@keyframes progress-flow {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 200% 0%;
  }
}

.milestone-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
  color: var(--text-3);
}

/* Core Competencies Badges */
.kyu-competencies {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-top: 7px;
}

.competencies-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.55rem;
  color: var(--text-2);
  letter-spacing: 0.08em;
  font-weight: 600;
}

.competencies-tags {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  width: 100%;
}

.comp-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(236, 185, 57, 0.22);
  border-radius: 5px;
  padding: 5px 2px;
  font-size: 0.58rem;
  color: var(--text-2);
  transition: all 0.25s ease;
  width: 100%;
  box-sizing: border-box;
}

.comp-tag:hover {
  background: rgba(236, 185, 57, 0.1);
  border-color: rgba(236, 185, 57, 0.6);
  color: var(--text);
  transform: translateY(-1px);
}

.comp-icon {
  display: flex;
  align-items: center;
  color: var(--gold);
  flex-shrink: 0;
}

.comp-name {
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Footer Metrics - Symmetrical 3-Column Grid */
.custom-badge-footer {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;
  z-index: 1;
}

.custom-badge-metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  text-align: center;
  width: 100%;
}

.metric-lbl {
  font-size: 0.52rem;
  color: var(--text-2);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.metric-val {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text);
  white-space: nowrap;
}

.custom-badge-divider {
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
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
.custom-badge-corner.top-left {
  top: 6px;
  left: 6px;
  border-width: 1px 0 0 1px;
}
.custom-badge-corner.top-right {
  top: 6px;
  right: 6px;
  border-width: 1px 1px 0 0;
}
.custom-badge-corner.bottom-left {
  bottom: 6px;
  left: 6px;
  border-width: 0 0 1px 1px;
}
.custom-badge-corner.bottom-right {
  bottom: 6px;
  right: 6px;
  border-width: 0 1px 1px 0;
}
.custom-badge-corner.top-left {
  top: 6px;
  left: 6px;
  border-width: 1px 0 0 1px;
}
.custom-badge-corner.top-right {
  top: 6px;
  right: 6px;
  border-width: 1px 1px 0 0;
}
.custom-badge-corner.bottom-left {
  bottom: 6px;
  left: 6px;
  border-width: 0 0 1px 1px;
}
.custom-badge-corner.bottom-right {
  bottom: 6px;
  right: 6px;
  border-width: 0 1px 1px 0;
}
.kata-languages-section {
  flex: 1 1 340px;
  max-width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
}
.sub-section-title {
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: var(--gold-light);
  margin-bottom: 16px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  gap: 8px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
@media (max-width: 960px) {
  .card-codewars {
    grid-column: span 1;
  }
  .codewars-flex {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 20px;
  }
  .codewars-badge-wrapper-left,
  .kata-languages-section {
    flex: none;
    width: 100%;
    max-width: 100%;
  }
}
@media (max-width: 1024px) {
  .skills-bars {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 768px) {
  .skills-bars {
    grid-template-columns: 1fr;
  }
  .skills-cards-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .codewars-flex {
    gap: 16px;
  }
  .custom-codewars-badge-card {
    padding: 14px 12px;
    gap: 10px;
  }
  .custom-badge-title {
    font-size: 0.6rem;
  }
  .custom-badge-user {
    font-size: 0.68rem;
  }
  .metric-lbl {
    font-size: 0.48rem;
  }
  .metric-val {
    font-size: 0.72rem;
  }
  .scale-step {
    padding: 4px 1px;
  }
  .step-kyu {
    font-size: 0.52rem;
  }
  .step-name {
    font-size: 0.42rem;
  }
}
.kata-lang-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition:
    border-color 0.25s,
    background 0.25s;
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
  color: #ecb939;
  border: 1px solid rgba(236, 185, 57, 0.3);
}
.kata-lang-rank-badge.rank-white {
  background: rgba(255, 255, 255, 0.1);
  color: #e6e6e6;
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

.pro-skill-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.pro-skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pro-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 7px rgba(255, 107, 26, 0.5);
  flex-shrink: 0;
  animation: glow-pulse 2.5s ease infinite;
}
@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 4px rgba(255, 107, 26, 0.3);
  }
  50% {
    box-shadow: 0 0 12px rgba(255, 107, 26, 0.7);
  }
}
.pro-name {
  font-size: 0.85rem;
  color: var(--text-2);
  flex: 1;
}
.pro-tag {
  padding: 1px 7px;
  border: 1px solid var(--gold-border);
  border-radius: 100px;
  font-size: 0.62rem;
  color: var(--gold-dark);
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.tool-tag {
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 5px;
  font-size: 0.78rem;
  color: var(--text-2);
  transition:
    border-color 0.2s,
    color 0.2s;
}
.tool-tag:hover {
  border-color: var(--gold-border);
  color: var(--gold);
}

.sec-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.sec-item {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.82rem;
  color: var(--text-2);
}
.sec-check {
  color: var(--gold);
  flex-shrink: 0;
}

.lang-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.lang-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.lang-flag-icon {
  color: var(--gold);
  flex-shrink: 0;
}
.lang-name {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 3px;
}
.lang-level {
  font-size: 0.7rem;
  color: var(--gold-dark);
}

@keyframes shimmer-text {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (max-width: 1024px) {
  .skills-bars {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 768px) {
  .skills-bars {
    grid-template-columns: 1fr;
  }
  .skills-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
