<template>
  <div class="confirm-page">
    <div class="confirm-container">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <h2 class="loading-title">Bestätigung wird verarbeitet...</h2>
        <p class="loading-text">Bitte warten Sie einen Moment.</p>
      </div>

      <!-- Success State -->
      <div v-else-if="isSuccess" class="success-state">
        <div class="success-icon"></div>
        <h2 class="success-title">Erfolgreich bestätigt!</h2>
        <p class="success-text">
          Vielen Dank! Ihre E-Mail-Adresse wurde erfolgreich bestätigt.
          Sie erhalten ab sofort unseren Newsletter.
        </p>
        <NuxtLink to="/" class="back-button">
          Zurück zu Maluhia
        </NuxtLink>
      </div>

      <!-- Error State -->
      <div v-else class="error-state">
        <div class="error-icon"></div>
        <h2 class="error-title">Bestätigung fehlgeschlagen</h2>
        <p class="error-text">
          {{ errorMessage || 'Der Bestätigungslink ist ungültig oder abgelaufen. Bitte versuchen Sie sich erneut anzumelden.' }}
        </p>
        <NuxtLink to="/" class="back-button">
          Zurück zu Maluhia
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const route = useRoute()
const isLoading = ref(true)
const isSuccess = ref(false)
const errorMessage = ref('')

const confirmSubscription = async () => {
  try {
    const code = route.params.code as string

    if (!code) {
      throw new Error('Kein Bestätigungscode gefunden')
    }

    const result = await $fetch('/api/newsletter/confirm', {
      method: 'POST',
      body: {
        confirmationCode: code
      }
    })

    if (result) {
      isSuccess.value = true
    } else {
      throw new Error('Bestätigung fehlgeschlagen')
    }
  } catch (error) {
    console.error('Fehler bei der Bestätigung:', error)
    isSuccess.value = false

    if (error.statusCode === 400) {
      errorMessage.value = 'Der Bestätigungscode ist ungültig.'
    } else {
      errorMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  confirmSubscription()
})
</script>

<style scoped>
.confirm-page {
  @apply min-h-screen flex items-center justify-center;
  @apply bg-gradient-to-br from-blue-50 to-purple-50;
  @apply p-4;
}

.confirm-container {
  @apply bg-white rounded-2xl shadow-2xl;
  @apply max-w-md w-full p-8;
  @apply text-center;
}

/* Loading State */
.loading-state {
  @apply py-8;
}

.spinner {
  @apply w-16 h-16 mx-auto mb-6;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-title {
  @apply text-2xl font-bold text-gray-800 mb-2;
}

.loading-text {
  @apply text-gray-600;
}

/* Success State */
.success-state {
  @apply py-8;
}

.success-icon {
  @apply w-20 h-20 mx-auto mb-6;
  @apply bg-green-100 rounded-full;
  @apply flex items-center justify-center;
  @apply text-4xl text-green-600 font-bold;
}

.success-title {
  @apply text-2xl font-bold text-green-600 mb-4;
}

.success-text {
  @apply text-gray-700 mb-8 leading-relaxed;
}

/* Error State */
.error-state {
  @apply py-8;
}

.error-icon {
  @apply w-20 h-20 mx-auto mb-6;
  @apply bg-red-100 rounded-full;
  @apply flex items-center justify-center;
  @apply text-4xl text-red-600 font-bold;
}

.error-title {
  @apply text-2xl font-bold text-red-600 mb-4;
}

.error-text {
  @apply text-gray-700 mb-8 leading-relaxed;
}

/* Back Button */
.back-button {
  @apply inline-block;
  @apply bg-blue-600 text-white font-semibold;
  @apply py-3 px-8 rounded-lg;
  @apply hover:bg-blue-700 transition-colors duration-200;
  @apply shadow-md hover:shadow-lg;
}
</style>
