<template>
  <section id="experience" class="section exp-section">
    <div class="exp-bg-grid" aria-hidden="true"></div>
    <div class="container">
      <div class="section-header reveal">

        <h2 class="section-statement">
          Field-tested across <span class="accent">offense,<br>defense, and engineering.</span>
        </h2>
      </div>

      <div class="timeline" :class="{ animated: lineVisible }" ref="timelineEl">
        <div
          class="timeline-item reveal"
          v-for="(job, i) in jobs"
          :key="job.company"
          :style="{ transitionDelay: (i * 0.15 + 0.2) + 's' }"
        >
          <div class="tl-node">
            <div class="node-dot" :class="{ pulse: job.current, appear: lineVisible }"
                 :style="{ animationDelay: (0.4 + i * 0.2) + 's' }"></div>
          </div>

          <div class="exp-card" :class="{ 'beam-card': job.current }">
            <div class="card-head">
              <div class="head-left">
                <span class="type-badge mono">{{ job.type }}</span>
                <span class="period mono">{{ job.period }}</span>
              </div>
              <div class="stat-chips">
                <span class="chip mono" v-for="c in job.chips" :key="c">{{ c }}</span>
              </div>
            </div>

            <div class="company-block">
              <h3 class="company-name">{{ job.company }}</h3>
              <p class="job-role mono">{{ job.role }} &mdash; {{ job.location }}</p>
            </div>

            <div class="star-grid">
              <div class="star-item">
                <span class="star-label mono">[ SITUATION ]</span>
                <p class="star-text">{{ job.star.situation }}</p>
              </div>
              <div class="star-item">
                <span class="star-label mono">[ TASK ]</span>
                <p class="star-text">{{ job.star.task }}</p>
              </div>
              <div class="star-item">
                <span class="star-label mono">[ ACTION ]</span>
                <p class="star-text">{{ job.star.action }}</p>
              </div>
              <div class="star-item">
                <span class="star-label mono">[ RESULT ]</span>
                <p class="star-text">{{ job.star.result }}</p>
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

const timelineEl = ref(null)
const lineVisible = ref(false)

const jobs = [
  {
    company: 'LUV TEAM CO., LTD.',
    role: 'Game Security Analyst',
    location: 'Retainer Contract',
    type: 'ACTIVE',
    period: 'May 2026 — Present',
    current: true,
    chips: ['50+ exploits neutralized', '67k+ players protected', '-90% bypasses'],
    star: {
      situation: 'Live multiplayer ecosystem under sustained cheating pressure — 67,000+ active players exposed to memory-tampering, DMA exploits and FPGA-based driver injections.',
      task: 'Engineer hardware-level countermeasures, neutralize active threat actors, and harden the anti-cheat surface end-to-end.',
      action: 'Neutralized 50+ malicious executions through low-level memory analysis & reverse engineering. Designed hardware-level mitigations against DMA / FPGA driver injection. Refactored server-side anti-cheat logic and shipped architectural patches.',
      result: 'Protected 67,000+ active players. Cut client-side bypasses by 90%. Reduced cross-team incident response time by 30%.',
    },
  },
  {
    company: 'Cybertron Co., LTD.',
    role: 'Cyber Security Analyst',
    location: 'Bangkok, Thailand',
    type: 'SOC',
    period: 'Jan 2025 — June 2025',
    current: false,
    chips: ['100+ daily threats', '10+ major incidents led', '600 intel reports'],
    star: {
      situation: 'Enterprise-grade SOC fielding hundreds of real-time security events daily across multiple client environments.',
      task: 'Triage threats with SIEM tooling, lead root-cause forensics on critical incidents, and produce intelligence to harden client defenses.',
      action: 'Monitored and analyzed 100+ daily threat alerts using Wazuh and Elastic SIEM. Led post-incident analysis for 10+ major threat events, identifying root causes. Conducted vulnerability assessments and generated 600 comprehensive security intelligence reports.',
      result: 'Produced 600 intel reports. Led 10+ major security incident investigations. Strengthened client defense posture across multiple environments.',
    },
  },
]

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { lineVisible.value = true; obs.disconnect() }
  }, { threshold: 0.1 })
  const sec = document.getElementById('experience')
  if (sec) obs.observe(sec)
})
</script>

<style scoped>
.mono { font-family: 'JetBrains Mono', monospace; }
.exp-section { background: var(--bg); }

.exp-bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,107,26,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,107,26,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent);
}

.section-eyebrow {
  font-size: 0.7rem; letter-spacing: 0.2em;
  color: var(--gold); opacity: 0.65; margin-bottom: 18px;
  display: flex; align-items: center; gap: 10px;
}

.section-statement {
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 800; line-height: 1.12;
  color: var(--text); margin-bottom: 64px;
  letter-spacing: -0.02em;
}
.section-statement .accent { color: var(--gold); }

.timeline { display: flex; flex-direction: column; gap: 24px; position: relative; }
.timeline::before {
  content: ''; position: absolute; left: 16px; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--gold-dark), rgba(255,107,26,0.06));
  transform: scaleY(0); transform-origin: top; transition: none;
}
.timeline.animated::before {
  transform: scaleY(1);
  transition: transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
}

.timeline-item { display: flex; gap: 28px; }
.tl-node { flex-shrink: 0; width: 32px; display: flex; justify-content: center; padding-top: 26px; }
.node-dot {
  width: 13px; height: 13px; border-radius: 50%;
  border: 2px solid var(--gold-dark); background: var(--bg-2);
  position: relative; opacity: 0;
}
.node-dot.appear { animation: node-appear 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
@keyframes node-appear { from { opacity: 0; transform: scale(0) rotate(-45deg); } to { opacity: 1; transform: scale(1) rotate(0); } }

.node-dot.pulse::after {
  content: ''; position: absolute; inset: -5px; border-radius: 50%;
  border: 1px solid var(--gold); animation: ripple 2.2s ease infinite;
}
@keyframes ripple { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 0; transform: scale(2.4); } }

.exp-card {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid rgba(255,107,26,0.14);
  border-radius: 10px;
  padding: 28px 30px;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.exp-card:hover {
  border-color: rgba(255,107,26,0.3);
  box-shadow: 0 8px 40px rgba(255,107,26,0.07);
}

.card-head {
  display: flex; justify-content: space-between; align-items: flex-start;
  flex-wrap: wrap; gap: 10px; margin-bottom: 20px;
}
.head-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.type-badge {
  font-size: 0.68rem; letter-spacing: 0.1em;
  padding: 4px 10px; border: 1px solid rgba(255,107,26,0.45);
  border-radius: 4px; color: var(--gold);
}
.period { font-size: 0.75rem; color: var(--text-3); }

.stat-chips { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
.chip {
  font-size: 0.7rem; padding: 4px 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px; color: var(--text-3);
}

.company-block { margin-bottom: 24px; }
.company-name { font-size: 1.65rem; font-weight: 800; color: var(--text); margin-bottom: 5px; }
.job-role { font-size: 0.82rem; color: var(--gold); letter-spacing: 0.02em; }

.star-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 28px; }
.star-item {}
.star-label {
  display: block; font-size: 0.65rem;
  letter-spacing: 0.14em; color: var(--gold);
  opacity: 0.7; margin-bottom: 8px;
}
.star-text { font-size: 0.86rem; color: var(--text-2); line-height: 1.7; }

@media (max-width: 720px) {
  .star-grid { grid-template-columns: 1fr; }
  .stat-chips { justify-content: flex-start; }
  .exp-card { padding: 20px 18px; }
}
</style>
