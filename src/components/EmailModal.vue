<template>
  <Transition name="fade">
    <div v-if="isOpen" class="email-modal-overlay" @click.self="closeModal">
      <div class="email-modal-container mono">
        <div class="email-modal-header">
          <span class="header-tag">[ COMMS_TERMINAL ]</span>
          <button class="close-btn" @click="closeModal" aria-label="Close modal">&times;</button>
        </div>
        <div class="email-modal-body">
          <p class="modal-title">CHOOSE EMAIL METHOD</p>
          <div class="modal-email-preview">
            <span class="preview-lbl">TARGET:</span>
            <span class="preview-val">poramade.winy@gmail.com</span>
          </div>
          <div class="email-options">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=poramade.winy@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="email-option-btn gmail"
              @click="closeModal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="option-icon">
                <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 5.72-9-5.72V21H1.5C.65 21 0 20.35 0 19.5v-15c0-.85.65-1.5 1.5-1.5H3l9 5.73L21 3h1.5c.85 0 1.5.65 1.5 1.5z"/>
              </svg>
              <span>Compose in Gmail</span>
            </a>
            <a 
              href="https://outlook.live.com/mail/0/deeplink/compose?to=poramade.winy@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="email-option-btn outlook"
              @click="closeModal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="option-icon">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 17.5h-1v-11h1v11zm4.5 0h-3v-1.5h1.2v-8h-1.2v-1.5h3v11zm4.5-5.5h-2.5v1.5h1v4.5h-1v1h2.5v-7z"/>
              </svg>
              <span>Compose in Outlook</span>
            </a>
            <a 
              href="mailto:poramade.winy@gmail.com" 
              class="email-option-btn default-client"
              @click="closeModal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="option-icon">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span>Use Default App</span>
            </a>
            <button 
              type="button"
              class="email-option-btn copy-btn"
              :class="{ copied: isCopied }"
              @click="copyEmail"
            >
              <svg v-if="!isCopied" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="option-icon">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="option-icon">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ isCopied ? 'Email Copied!' : 'Copy to Clipboard' }}</span>
            </button>
          </div>
        </div>
        <div class="email-modal-footer">
          <button class="footer-btn" @click="closeModal">CANCEL</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);
const isCopied = ref(false);

function openModal() {
  isOpen.value = true;
  isCopied.value = false;
}

function closeModal() {
  isOpen.value = false;
}

function copyEmail() {
  navigator.clipboard.writeText('poramade.winy@gmail.com')
    .then(() => {
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
        closeModal();
      }, 1000);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
}

function handleOpenEvent() {
  openModal();
}

onMounted(() => {
  window.addEventListener('open-email-modal', handleOpenEvent);
});

onUnmounted(() => {
  window.removeEventListener('open-email-modal', handleOpenEvent);
});
</script>

<style scoped>
.email-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(9, 9, 8, 0.75);
  backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.email-modal-container {
  background: rgba(17, 17, 16, 0.95);
  border: 1px solid var(--gold-border);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 35px rgba(255, 107, 26, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modal-slide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modal-slide {
  from {
    transform: translateY(12px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.email-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 107, 26, 0.12);
}

.header-tag {
  font-size: 0.65rem;
  color: var(--gold-dark);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-3);
  font-size: 1.4rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
}

.close-btn:hover {
  color: var(--text);
}

.email-modal-body {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-title {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--text);
  margin: 0;
}

.modal-email-preview {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 10px 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 0.72rem;
}

.preview-lbl {
  color: var(--gold-dark);
}

.preview-val {
  color: var(--text-2);
}

.email-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.email-option-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  color: var(--text-2);
  text-decoration: none;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  width: 100%;
  text-align: left;
}

.email-option-btn:hover {
  background: rgba(255, 107, 26, 0.08);
  border-color: rgba(255, 107, 26, 0.35);
  color: var(--text);
  transform: translateY(-1px);
}

.option-icon {
  flex-shrink: 0;
  opacity: 0.75;
}

.email-option-btn:hover .option-icon {
  opacity: 1;
}

.gmail .option-icon {
  color: #EA4335;
}

.outlook .option-icon {
  color: #0078d4;
}

.copy-btn.copied {
  background: rgba(63, 185, 80, 0.1);
  border-color: rgba(63, 185, 80, 0.35);
  color: #3fb950;
}

.email-modal-footer {
  padding: 12px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: flex-end;
}

.footer-btn {
  background: none;
  border: none;
  color: var(--text-3);
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 4px;
}

.footer-btn:hover {
  color: var(--text-2);
  background: rgba(255, 255, 255, 0.03);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
