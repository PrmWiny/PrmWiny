<template>
  <section id="projects" class="section projects-section">
    <div class="proj-bg-grid" aria-hidden="true"></div>

    <div class="container">
      <div class="section-header reveal">

        <h2 class="section-statement">
          Deep-dive case studies where <span class="accent">security was the product.</span>
        </h2>
      </div>

      <div class="projects-list">
        <div
          class="project-row reveal"
          v-for="(project, i) in projects"
          :key="project.title"
          :style="{ transitionDelay: (i * 0.15 + 0.2) + 's' }"
        >
          <div class="project-left">
            <div class="proj-num mono">{{ project.num }}</div>
            <h3 class="proj-name">{{ project.title }}</h3>
            <p class="proj-cat mono">{{ project.category }}</p>
            <div class="proj-links" v-if="project.links.length">
              <a
                v-for="link in project.links" :key="link.label"
                :href="link.url" target="_blank" rel="noopener noreferrer"
                class="plink mono"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                {{ link.label }}
              </a>
            </div>
            <span class="role-lbl mono">ROLE</span>
            <span class="role-val">{{ project.role }}</span>
            <div class="tech-tags">
              <span class="ttag mono" v-for="t in project.tech" :key="t">{{ t }}</span>
            </div>
          </div>

          <div class="project-right">
            <ul class="proj-bullets">
              <li v-for="b in project.bullets" :key="b">
                <span class="barrow">&#9658;</span>
                <span>{{ b }}</span>
              </li>
            </ul>
            <div class="proj-stats">
              <div class="pstat" v-for="s in project.stats" :key="s.label">
                <span class="pstat-val mono">{{ s.val }}</span>
                <span class="pstat-lbl mono">{{ s.label }}</span>
              </div>
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

const projects = [
  {
    num: '01',
    title: 'MX DMA TOOL',
    category: 'Hardware-Level Memory Security & Vulnerability Research',
    role: 'Lead Engineer & Technical Advisor',
    tech: ['Tauri', 'Rust', 'Nuxt', 'VMProtect SDK'],
    links: [],
    bullets: [
      'Engineered a cross-platform desktop suite (Tauri + Rust + Nuxt) to simulate, profile and analyze 20+ memory-level exploit variants in a controlled lab.',
      'Acted as technical advisor — delivered strategic guidance to counter DMA / FPGA driver injections and patched 8+ critical architectural vulnerabilities.',
      'Integrated VMProtect SDK after deep research into binary virtualization & anti-reverse engineering, hardening 5 core software products.',
      'Automated a cryptographically signed distribution pipeline using advanced encryption — guaranteeing 100% integrity during release & benchmarking.',
    ],
    stats: [
      { val: '20+',  label: 'EXPLOIT VARIANTS' },
      { val: '8+',   label: 'CRITICAL PATCHES' },
      { val: '5',    label: 'HARDENED PRODUCTS' },
      { val: '100%', label: 'BUILD INTEGRITY' },
    ],
  },
  {
    num: '02',
    title: 'Huangyai',
    category: 'Family Activity & Emergency SOS — Full-Stack & Infra',
    role: 'Full-Stack & Infrastructure Engineer',
    tech: ['Docker Compose', 'Supabase', 'PostgreSQL', 'LINE LIFF'],
    links: [
      { label: 'Live App',   url: 'https://bscit.sit.kmutt.ac.th/capstone25/cp25kp3' },
      { label: 'Backoffice', url: 'https://bscit.sit.kmutt.ac.th/capstone25/cp25kp3/backoffice/' },
      { label: 'Monitor',    url: 'https://bscit.sit.kmutt.ac.th/capstone25/cp25kp3/backoffice/monitor/login' },
    ],
    bullets: [
      'Designed secure deployment architecture via Docker Compose containerization — decreased incident response time by 40% while staying compliant with industry security standards across all servers.',
      'Built backend on Supabase (PostgreSQL) with real-time data sync under 200ms latency — guaranteeing instantaneous SOS alert propagation.',
      'Integrated LINE LIFF for seamless authentication, achieving 100% success rate during internal deployment and end-user onboarding.',
    ],
    stats: [
      { val: '-40%',   label: 'INCIDENT RESPONSE' },
      { val: '<200ms', label: 'SOS LATENCY' },
      { val: '100%',   label: 'ONBOARDING RATE' },
    ],
  },
]

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (titleEl.value) scrambleText(titleEl.value, 'Featured Projects', { duration: 700 })
      obs.disconnect()
    }
  }, { threshold: 0.1 })
  const sec = document.getElementById('projects')
  if (sec) obs.observe(sec)
})
</script>

<style scoped>
.mono { font-family: 'JetBrains Mono', monospace; }
.projects-section { background: var(--bg); }

.proj-bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(rgba(255,107,26,0.12) 1px, transparent 1px);
  background-size: 40px 40px;
  animation: grid-pulse 6s ease infinite;
  mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent);
  -webkit-mask-image: radial-gradient(ellipse 70% 50% at 50% 50%, black, transparent);
}
@keyframes grid-pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }

.section-eyebrow {
  font-size: 0.7rem; letter-spacing: 0.2em;
  color: var(--gold); opacity: 0.65; margin-bottom: 18px;
}
.section-statement {
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 800; line-height: 1.12;
  color: var(--text); margin-bottom: 64px;
  letter-spacing: -0.02em;
}
.section-statement .accent { color: var(--gold); }

.projects-list { display: flex; flex-direction: column; gap: 20px; }

.project-row {
  display: grid;
  grid-template-columns: 320px 1fr;
  border: 1px solid rgba(255,107,26,0.14);
  border-radius: 10px;
  background: var(--bg-card);
  overflow: hidden;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.project-row:hover {
  border-color: rgba(255,107,26,0.32);
  box-shadow: 0 0 50px rgba(255,107,26,0.07);
}

.project-left {
  padding: 40px 30px;
  border-right: 1px solid rgba(255,107,26,0.08);
  position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 0;
}
.proj-num {
  position: absolute; top: 16px; left: 20px;
  font-size: 7rem; font-weight: 900;
  color: rgba(255,107,26,0.15); line-height: 1;
  letter-spacing: -0.04em; user-select: none;
  pointer-events: none;
}
.proj-name {
  font-size: 1.75rem; font-weight: 800;
  color: var(--text); margin-bottom: 8px;
  position: relative; line-height: 1.1;
}
.proj-cat {
  font-size: 0.77rem; color: var(--gold);
  line-height: 1.55; margin-bottom: 16px;
  position: relative;
}
.proj-links {
  display: flex; flex-wrap: wrap; gap: 6px;
  margin-bottom: 16px; position: relative;
}
.plink {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 0.68rem; color: var(--text-3); text-decoration: none;
  padding: 3px 9px; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 4px; transition: all 0.2s;
  color: rgb(160, 160, 160);
}
.plink:hover { border-color: var(--gold-border); color: var(--gold); }

.role-lbl {
  display: block; font-size: 0.6rem; letter-spacing: 0.14em;
  color: var(--text-3); text-transform: uppercase; margin-bottom: 4px; position: relative;
}
.role-val {
  display: block; font-size: 0.9rem; font-weight: 600;
  color: var(--text); margin-bottom: 20px; position: relative;
}
.tech-tags { display: flex; flex-wrap: wrap; gap: 6px; position: relative; }
.ttag {
  font-size: 0.7rem; padding: 4px 10px;
  border: 1px solid rgba(254, 115, 39, 0.2);
  border-radius: 100px; color: var(--text-3);
  transition: border-color 0.2s, color 0.2s;
  color: rgb(160, 160, 160);
}
.ttag:hover { border-color: var(--gold); color: var(--gold); }

.project-right {
  padding: 40px 36px;
  display: flex; flex-direction: column;
}
.proj-bullets {
  list-style: none; flex: 1;
  display: flex; flex-direction: column; gap: 16px;
  margin-bottom: 32px;
}
.proj-bullets li {
  display: flex; gap: 12px;
  font-size: 0.87rem; color: var(--text-2); line-height: 1.65;
}
.barrow { color: var(--gold); flex-shrink: 0; margin-top: 2px; font-size: 0.7rem; }

.proj-stats {
  display: flex; gap: 28px; flex-wrap: wrap;
  padding-top: 22px;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.pstat { display: flex; flex-direction: column; gap: 4px; }
.pstat-val {
  font-size: 1.55rem; font-weight: 800;
  background: var(--gradient-gold); background-size: 200%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  animation: shimmer-text 4s ease infinite;
}
.pstat-lbl { font-size: 0.6rem; color: var(--text-3); letter-spacing: 0.1em; }
@keyframes shimmer-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

@media (max-width: 900px) {
  .project-row { grid-template-columns: 1fr; }
  .project-left { border-right: none; border-bottom: 1px solid rgba(255,107,26,0.08); padding: 28px 22px; }
  .project-right { padding: 28px 22px; }
}
</style>
