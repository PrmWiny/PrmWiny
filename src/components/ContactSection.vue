<template>
  <section id="contact" class="contact-section">
    <div class="contact-grid-bg" aria-hidden="true"></div>
    <div class="contact-orb o1" aria-hidden="true"></div>
    <div class="contact-orb o2" aria-hidden="true"></div>

    <div class="container">
      <div class="contact-inner">

        <h2 class="contact-statement reveal">
          Hiring for <span class="accent">AppSec</span> or<br>
          <span class="accent">DevSecOps</span>?<br>
          <span class="dim">Let&#x27;s harden your stack.</span>
        </h2>

        <p class="contact-desc reveal">
          <!-- Available for Tier-1 engineering roles — full-time or specialist retainer.<br> -->
          Response within 24 hours. Based in Bangkok, Thailand.
        </p>

        <div class="contact-btns reveal">
          <a
            href="#"
            @click.prevent="openEmailModal"
            class="btn btn-primary btn-email"
            title="Open contact terminal"
          >
            &rarr; PORAMADE.WINY@GMAIL.COM
          </a>
          <a href="tel:+66918251541" class="btn btn-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.98 16.9z"/></svg>
            +66 91-825-1541
          </a>
        </div>

        <div class="contact-meta reveal">
          <span class="meta-dot"></span>
          <span class="mono">Available for opportunities &bull; Shift-Left AppSec &bull; Bangkok, TH</span>
        </div>

        <div class="open-to reveal">
          <span class="ot-label mono">OPEN TO</span>
          <div class="ot-pills">
            <span class="ot-pill" v-for="r in roles" :key="r">{{ r }}</span>
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

const roles = [
  'Application Security Engineer',
  'Full-Stack Developer',
  'Security Consultant',
  'Game Security Analyst',
  'DevSecOps Engineer',
]

function openEmailModal() {
  window.dispatchEvent(new CustomEvent('open-email-modal'))
}

onMounted(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (titleEl.value) scrambleText(titleEl.value, 'Contact', { duration: 500 })
      obs.disconnect()
    }
  }, { threshold: 0.15 })
  const sec = document.getElementById('contact')
  if (sec) obs.observe(sec)
})
</script>

<style scoped>
.mono { font-family: 'JetBrains Mono', monospace; }

.contact-section {
  background: var(--bg);
  position: relative; overflow: hidden;
  min-height: 100vh;
  display: flex; align-items: center;
}

.contact-grid-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,107,26,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,107,26,0.05) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
}

.contact-orb { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
.o1 { width: 700px; height: 700px; bottom: -350px; left: -200px; background: radial-gradient(circle, rgba(255,107,26,0.07), transparent); animation: orb-drift 22s ease infinite; }
.o2 { width: 500px; height: 500px; top: -200px; right: -150px; background: radial-gradient(circle, rgba(204,68,0,0.05), transparent); animation: orb-drift 28s ease infinite reverse; }
@keyframes orb-drift { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(30px, -20px); } }

.contact-inner {
  position: relative; z-index: 2;
  text-align: center;
  padding: 80px 0;
  width: 100%;
}

.contact-eyebrow {
  font-size: 0.72rem; letter-spacing: 0.2em;
  color: var(--gold); opacity: 0.7; margin-bottom: 36px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
}
.ey-dash { display: inline-block; width: 24px; height: 1px; background: var(--gold); opacity: 0.6; }

.contact-statement {
  font-size: clamp(2.5rem, 6.5vw, 5.5rem);
  font-weight: 800; line-height: 1.08;
  letter-spacing: -0.025em;
  color: var(--text); margin-bottom: 28px;
}
.contact-statement .accent { color: var(--gold); }
.contact-statement .dim { color: var(--text-2); }

.contact-desc {
  font-size: 1.05rem; color: var(--text-2);
  max-width: 480px; margin: 0 auto 52px;
  line-height: 1.72;
}

.contact-btns {
  display: flex; flex-wrap: wrap; gap: 14px;
  justify-content: center; align-items: center;
  margin-bottom: 48px;
}
.btn-email {
  font-size: 0.78rem; letter-spacing: 0.06em;
}

.contact-meta {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-size: 0.72rem; color: var(--text-3);
  font-family: 'JetBrains Mono', monospace; margin-bottom: 48px;
}
.meta-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; flex-shrink: 0; box-shadow: 0 0 8px #4ade80; animation: blink 2s ease infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.open-to { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.ot-label { font-size: 0.65rem; letter-spacing: 0.2em; color: var(--text-3); }
.ot-pills { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.ot-pill {
  font-size: 0.8rem; padding: 6px 16px;
  border: 1px solid rgba(255,107,26,0.2);
  border-radius: 100px; color: var(--text-2);
  transition: all 0.25s;
}
.ot-pill:hover { border-color: var(--gold); color: var(--gold); }

.contact-eyebrow.reveal { transition-delay: 0.1s; }
.contact-statement.reveal { transition-delay: 0.2s; }
.contact-desc.reveal { transition-delay: 0.35s; }
.contact-btns.reveal { transition-delay: 0.5s; }
.contact-meta.reveal { transition-delay: 0.65s; }
.open-to.reveal { transition-delay: 0.8s; }

@media (max-width: 640px) {
  .contact-statement { font-size: 2.2rem; }
  .btn-email { font-size: 0.68rem; padding: 12px 16px; }
}
</style>
