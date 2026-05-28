import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apolloClient } from '@/apollo/client'
import { GET_TODOS, ADD_TODO, TOGGLE_TODO, DELETE_TODO, TODOS_SUB } from '@/graphql/todos'

export type Todo = {
  id: string
  title: string
  is_done: boolean
  created_at: string
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const activeTodos = computed(() => todos.value.filter((t) => !t.is_done))
  const doneTodos = computed(() => todos.value.filter((t) => t.is_done))

  async function fetchTodos() {
    loading.value = true
    error.value = null
    try {
      const { data } = await apolloClient.query<{ todos: Todo[] }>({
        query: GET_TODOS,
        fetchPolicy: 'network-only', 
      })
      todos.value = data.todos
    } catch (e: any) {
      error.value = e.message ?? 'Failed to load todos'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title: string) {
    const clean = title.trim()
    if (!clean) return

    await apolloClient.mutate({
      mutation: ADD_TODO,
      variables: { title: clean },
      update: (cache, { data }) => {
        const newTodo = data?.insert_todos_one
        if (!newTodo) return
        
        try {
          const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS })
          if (existing) {
            const updatedTodos = [newTodo, ...existing.todos]
            cache.writeQuery({ query: GET_TODOS, data: { todos: updatedTodos } })
            // Keep Pinia state in sync with cache
            todos.value = updatedTodos
          }
        } catch (e) {
          // GET_TODOS might not be in cache yet
        }
      }
    })
  }

  async function toggleTodo(todo: Todo) {
    await apolloClient.mutate({
      mutation: TOGGLE_TODO,
      variables: { id: todo.id, done: !todo.is_done },
      update: (cache, { data }) => {
        const updatedTodo = data?.update_todos_by_pk
        if (!updatedTodo) return
        
        try {
          const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS })
          if (existing) {
            const updatedTodos = existing.todos.map(t => 
              t.id === updatedTodo.id ? { ...t, is_done: updatedTodo.is_done } : t
            )
            cache.writeQuery({ query: GET_TODOS, data: { todos: updatedTodos } })
            todos.value = updatedTodos
          }
        } catch (e) {}
      }
    })
  }

  async function deleteTodo(id: string) {
    await apolloClient.mutate({
      mutation: DELETE_TODO,
      variables: { id },
      update: (cache) => {
        try {
          const existing = cache.readQuery<{ todos: Todo[] }>({ query: GET_TODOS })
          if (existing) {
            const updatedTodos = existing.todos.filter(t => t.id !== id)
            cache.writeQuery({ query: GET_TODOS, data: { todos: updatedTodos } })
            todos.value = updatedTodos
          }
        } catch (e) {}
      }
    })
  }

  function startRealtime() {
    const obs = apolloClient.subscribe<{ todos: Todo[] }>({
      query: TODOS_SUB,
    })

    const sub = obs.subscribe({
      next: ({ data }) => {
        if (data?.todos) todos.value = data.todos
      },
      error: (e) => {
        // keep app running even if WS fails
        console.error('Subscription error', e)
      },
    })

    return () => sub.unsubscribe()
  }

  return {
    todos,
    activeTodos,
    doneTodos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    startRealtime,
  }
})