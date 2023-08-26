<script setup lang="ts">
useHead({
  title: 'Lovebox',
  meta: [{ name: 'description', content: 'Welcome to lovebox' }],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ]
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
