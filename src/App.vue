<script setup lang="ts">
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()

onMounted(async () => {
  await todoStore.fetchTodos()
})
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif; text-align: center;">
    <h2>Database Connection Check</h2>
    
    <div v-if="todoStore.loading" style="color: orange; font-weight: bold;">
      Connecting to Hasura...
    </div>

    <div v-else-if="todoStore.error" style="color: red; font-weight: bold;">
      ❌ Connection Failed: {{ todoStore.error }}
    </div>

    <div v-else style="color: green; font-weight: bold;">
      ✅ Connected! Loaded {{ todoStore.todos.length }} rows from Neon.
    </div>
  </div>
</template>