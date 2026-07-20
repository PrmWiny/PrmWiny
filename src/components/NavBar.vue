<template>
  <nav class="navbar" :class="{ scrolled: scrolled, open: menuOpen }">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo" @click="menuOpen = false">
        <span class="logo-bracket">[</span>
        <span class="logo-name">PrmWiny</span>
        <span class="logo-bracket">]</span>
      </a>

      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="link in links" :key="link.id">
          <a
            :href="'#' + link.id"
            class="nav-link"
            :class="{ active: activeSection === link.id }"
            @click="menuOpen = false"
          >
            
            {{ link.label }}
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="openEmailModal" class="btn btn-outline nav-cta" title="Open contact terminal">Hire Me</a>
        </li>
      </ul>

      <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ activeSection: String })

const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { id: 'about', label: 'About', num: '01.' },
  { id: 'skills', label: 'Skills', num: '02.' },
  { id: 'experience', label: 'Experience', num: '03.' },
  { id: 'projects', label: 'Projects', num: '04.' },
  { id: 'education', label: 'Education', num: '05.' },
  { id: 'contact', label: 'Contact', num: '06.' },
]

function openEmailModal() {
  menuOpen.value = false
  window.dispatchEvent(new CustomEvent('open-email-modal'))
}

function onScroll() { scrolled.value = window.scrollY > 60 }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 900;
  padding: 20px 0;
  transition: background 0.4s ease, padding 0.4s ease, border-color 0.4s ease;
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  padding: 12px 0;
  background: rgba(9, 9, 8, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: rgba(255, 107, 26, 0.14);
}
.nav-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.nav-logo {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1px;
  transition: filter 0.3s;
}
.nav-logo:hover { filter: drop-shadow(0 0 12px var(--gold)); }
.logo-bracket { color: var(--gold-dark); }
.logo-name { color: var(--gold); }
.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-2);
  text-decoration: none;
  border-radius: 4px;
  transition: color 0.25s ease;
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 2px; left: 12px; right: 12px;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.nav-link:hover { color: var(--text); }
.nav-link:hover::after,
.nav-link.active::after { transform: scaleX(1); }
.nav-link.active { color: var(--gold); }
.nav-num {
  color: var(--gold-dark);
  font-size: 0.72rem;
  font-weight: 400;
}
.mono { font-family: 'JetBrains Mono', monospace; }
.nav-cta {
  margin-left: 10px;
  padding: 8px 20px;
  font-size: 0.84rem;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 6px;
  cursor: none;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--gold);
  border-radius: 2px;
  transition: all 0.3s ease;
  transform-origin: center;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links {
    position: fixed;
    top: 0; right: 0;
    height: 100vh;
    width: min(300px, 80vw);
    background: var(--bg-2);
    border-left: 1px solid var(--gold-border);
    flex-direction: column;
    align-items: flex-start;
    padding: 100px 32px 40px;
    gap: 8px;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .nav-links.open { transform: translateX(0); }
  .nav-cta { margin-left: 0; margin-top: 16px; }
}
</style>
