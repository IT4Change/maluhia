<!-- eslint-disable-next-line vue/multi-word-component-names -->
<template>
    <div class="subscribe-form-container">
      <form @submit.prevent="handleSubscribe" class="subscribe-form">
        <h2 class="form-title">Newsletter abonnieren</h2>

        <div class="form-group">
          <input
            v-model="email"
            type="email"
            placeholder="Ihre E-Mail-Adresse"
            class="email-input"
            :class="{ 'invalid': email && !isValidEmail }"
          />
          <p v-if="email && !isValidEmail" class="error-message">
            Bitte geben Sie eine gültige E-Mail-Adresse ein
          </p>
        </div>

        <button
          type="submit"
          :disabled="!isValidEmail || isSubmitting"
          class="subscribe-button"
        >
          {{ isSubmitting ? 'Wird gesendet...' : 'Abonnieren' }}
        </button>

        <p v-if="successMessage" class="success-message">
          {{ successMessage }}
        </p>
      </form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Form state
const email = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')

// E-Mail-Validierung
const isValidEmail = computed(() => {
  if (!email.value) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

// API Call zum Backend
const handleSubscribe = async () => {
  if (!isValidEmail.value) return

  isSubmitting.value = true
  successMessage.value = ''

  try {
    await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: {
        email: email.value
      }
    })

    successMessage.value = 'Vielen Dank! Bitte bestätigen Sie Ihre E-Mail-Adresse über den Link, den wir Ihnen gesendet haben.'
    email.value = ''
  } catch (error) {
    console.error('Fehler beim Abonnieren:', error)

    if (error.statusCode === 400) {
      successMessage.value = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    } else {
      successMessage.value = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
    }
  } finally {
    isSubmitting.value = false
  }
}

</script>

<style scoped>
.subscribe-form-container {
    @apply absolute inset-0 flex items-center justify-center;
    @apply p-4;
}

.subscribe-form {
    @apply bg-white rounded-lg shadow-xl p-8;
    @apply max-w-md w-full;
    @apply backdrop-blur-sm bg-opacity-95;
}

.form-title {
    @apply text-2xl font-bold text-gray-800 mb-6 text-center;
}

.form-group {
    @apply mb-4;
}

.email-input {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
    @apply transition-all duration-200;
}

.email-input.invalid {
    @apply border-red-500;
}

.error-message {
    @apply text-red-500 text-sm mt-2;
}

.subscribe-button {
    @apply w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg;
    @apply hover:bg-blue-700 transition-colors duration-200;
    @apply disabled:bg-gray-400 disabled:cursor-not-allowed;
}

.success-message {
    @apply text-green-600 text-center mt-4 font-medium;
}
</style>