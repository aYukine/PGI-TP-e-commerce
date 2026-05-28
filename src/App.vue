<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useTodoStore } from '@/stores/todo.store'

const todoStore = useTodoStore()
const title = ref('')
const currentFilter = ref<'all' | 'active' | 'done'>('all')
let stopRealtime: null | (() => void) = null

const displayedTodos = computed(() => {
  if (currentFilter.value === 'active') return todoStore.activeTodos
  if (currentFilter.value === 'done') return todoStore.doneTodos
  return todoStore.todos
})

onMounted(async () => {
  await todoStore.fetchTodos()
  stopRealtime = todoStore.startRealtime()
})

onBeforeUnmount(() => {
  if (stopRealtime) stopRealtime()
})

function onAdd() {
  const cleanTitle = title.value.trim()
  if (!cleanTitle) return
  
  todoStore.addTodo(cleanTitle)
  title.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
      
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Neon + Hasura Tasks</h1>
        <p class="mt-2 text-sm font-medium text-slate-500">Vue 3 • Pinia • Apollo GraphQL</p>
      </header>

      <div v-if="todoStore.loading && todoStore.todos.length === 0" class="mb-4 p-4 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium text-center animate-pulse">
        Syncing data from Neon database...
      </div>
      <div v-if="todoStore.error" class="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium text-center">
        ⚠️ Engine Error: {{ todoStore.error }}
      </div>

      <form @submit.prevent="onAdd" class="flex gap-2 mb-6">
        <input
          v-model="title"
          type="text"
          placeholder="What needs to be done today?"
          :disabled="todoStore.loading"
          class="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 transition duration-150"
        />
        <button 
          type="submit" 
          :disabled="!title.trim()"
          class="px-5 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:cursor-not-allowed transition duration-150"
        >
          Add
        </button>
      </form>

      <!-- Filter Tabs -->
      <div class="flex justify-center gap-4 mb-6 border-b border-slate-200 pb-4">
        <button 
          @click="currentFilter = 'all'" 
          :class="['px-4 py-2 font-medium text-sm rounded-lg transition-colors', currentFilter === 'all' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50']"
        >
          All ({{ todoStore.todos.length }})
        </button>
        <button 
          @click="currentFilter = 'active'" 
          :class="['px-4 py-2 font-medium text-sm rounded-lg transition-colors', currentFilter === 'active' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50']"
        >
          Active ({{ todoStore.activeTodos.length }})
        </button>
        <button 
          @click="currentFilter = 'done'" 
          :class="['px-4 py-2 font-medium text-sm rounded-lg transition-colors', currentFilter === 'done' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50']"
        >
          Done ({{ todoStore.doneTodos.length }})
        </button>
      </div>

      <main>
        <ul v-if="displayedTodos.length > 0" class="space-y-3">
          <li 
            v-for="todo in displayedTodos" 
            :key="todo.id" 
            class="flex items-center justify-between p-4 bg-slate-50 border-l-4 rounded-r-lg shadow-sm transition duration-150 hover:bg-slate-100"
            :class="todo.is_done ? 'border-emerald-500' : 'border-slate-300'"
          >
            <label class="flex items-center gap-3 cursor-pointer flex-1 group">
              <input
                type="checkbox"
                :checked="todo.is_done"
                @change="todoStore.toggleTodo(todo)"
                class="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 accent-emerald-500 cursor-pointer"
              />
              <span 
                class="text-base font-medium transition duration-150 break-all pr-4"
                :class="todo.is_done ? 'line-through text-slate-400' : 'text-slate-700 group-hover:text-slate-900'"
              >
                {{ todo.title }}
              </span>
            </label>
            
            <button 
              @click="todoStore.deleteTodo(todo.id)"
              class="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg text-xl font-bold leading-none transition duration-150"
              title="Remove item"
            >
              &times;
            </button>
          </li>
        </ul>

        <div v-else-if="!todoStore.loading" class="text-center py-10 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
          <span class="text-3xl">🎉</span>
          <p class="mt-2 text-sm font-medium text-slate-500">All caught up! No tasks left in your cloud database.</p>
        </div>
      </main>

    </div>
  </div>
</template>