<template>
  <div id="app-root">
    <div class="page-curtain" :class="{ lifted: pageLoaded }" aria-hidden="true"></div>
    <div class="scroll-bar" :style="{ transform: `scaleX(${scrollPct})` }" aria-hidden="true"></div>

   <div id="cursor-dot" ref="cursorDot"></div>
    <div id="cursor-ring" ref="cursorRing"></div>

    <NavBar :active-section="activeSection" />

    <main>
      <HeroSection id="hero" />
      <AboutSection id="about" />
      <SkillsSection id="skills" />
      <ExperienceSection id="experience" />
      <ProjectsSection id="projects" />
      <EducationSection id="education" />
      <ContactSection id="contact" />
    </main>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-inner">
          <span class="mono text-dim">Poramade Winyunawan &copy; {{ new Date().getFullYear() }}</span>
          <span class="mono text-dim footer-tag">AppSec Engineer &amp; Full-Stack Dev</span>
        </div>
      </div>
    </footer>
    <EmailModal />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import EmailModal from './components/EmailModal.vue'

const activeSection = ref('hero')
const cursorDot = ref(null)
const cursorRing = ref(null)
const pageLoaded = ref(false)
const scrollPct = ref(0)

let dotX = 0, dotY = 0, ringX = 0, ringY = 0, raf = null

function moveCursor(e) { dotX = e.clientX; dotY = e.clientY }

function animateCursor() {
  ringX += (dotX - ringX) * 0.12
  ringY += (dotY - ringY) * 0.12
  if (cursorDot.value) { cursorDot.value.style.left = dotX + 'px'; cursorDot.value.style.top = dotY + 'px' }
  if (cursorRing.value) { cursorRing.value.style.left = ringX + 'px'; cursorRing.value.style.top = ringY + 'px' }
  raf = requestAnimationFrame(animateCursor)
}

function updateScrollProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight
  scrollPct.value = total > 0 ? window.scrollY / total : 0
}

function handleAnchorClick(e) {
  const anchor = e.target.closest('a[href^="#"]')
  if (!anchor) return
  const id = anchor.getAttribute('href').slice(1)
  if (!id) return
  const target = document.getElementById(id)
  if (!target) return
  e.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact']
let sectionObs = null

onMounted(() => {
  requestAnimationFrame(() => { setTimeout(() => { pageLoaded.value = true }, 80) })

  window.addEventListener('mousemove', moveCursor, { passive: true })
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  document.addEventListener('click', handleAnchorClick)
  raf = requestAnimationFrame(animateCursor)

  sectionObs = new IntersectionObserver(
    (entries) => { entries.forEach(e => { if (e.isIntersecting) activeSection.value = e.target.id }) },
    { threshold: 0.35 }
  )
  sections.forEach(id => { const el = document.getElementById(id); if (el) sectionObs.observe(el) })

  const revealObs = new IntersectionObserver(
    (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObs.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveCursor)
  window.removeEventListener('scroll', updateScrollProgress)
  document.removeEventListener('click', handleAnchorClick)
  cancelAnimationFrame(raf)
  sectionObs?.disconnect()
})
</script>

<style>
.page-curtain {
  position: fixed; inset: 0;
  background: #090908;
  z-index: 99998;
  pointer-events: none;
  transition: opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  opacity: 1;
}
.page-curtain.lifted { opacity: 0; }

.scroll-bar {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #CC4400, #FF6B1A, #FF8C00, #FFAD33, #FFD700);
  z-index: 9999;
  transform-origin: left;
  transform: scaleX(0);
  will-change: transform;
}

.site-footer {
  border-top: 1px solid rgba(255, 107, 26, 0.1);
  padding: 28px 0;
  background: var(--bg-2);
}
.footer-inner {
  display: flex; justify-content: space-between;
  align-items: center; flex-wrap: wrap; gap: 8px;
}
.text-dim { color: var(--text-3); font-size: 0.78rem; }
.footer-tag { color: var(--gold-dark); }
.mono { font-family: 'JetBrains Mono', monospace; }
</style>
