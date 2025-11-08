<template>
  <div class="full-page" :style="background">
    <slot />
  </div>
</template>

<script setup>

const props = defineProps({
  background: { type: String, required: true },
})

const background = {
    backgroundImage: `url(${props.background})`
}

</script>

<style>
.full-page {
    @apply w-screen;
    @apply h-screen;
    overflow-x: hidden;

    background-image: url();
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
</style>