<template>
  <button class="custom-btn" :style="{ background: bgColor, color: textColor }" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  bgColor?: string
  textColor?: string
  url?: string
}>()

defineEmits(['click'])
</script>

<style scoped>
.custom-btn {
  padding: 8px 18px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
}
</style>
