<template>
  <div class="category-view">
    <NavBarComponent />
    <main class="category-main">
      <PageHeaderComponent
        :title="categoryTitle"
        :breadcrumb="['Home', 'Categories', categoryTitle]"
      />
      <!-- Add category products/content here -->
    </main>
  </div>
</template>

<script>
import NavBarComponent from '@/components/NavBarComponent.vue'
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import { useRoute } from 'vue-router'

export default {
  name: 'CategoryView',
  components: { NavBarComponent, PageHeaderComponent },
  setup() {
    const route = useRoute()
    const categoryTitle = route.params.category || 'Coke & Milk'
    return { categoryTitle }
  }
}
</script>

<style scoped>
.category-view {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0; /* Remove all padding */
  width: 100%;
}

.category-main {
  box-sizing: border-box;
  padding-top: 0; /* Ensure no top padding */
  margin-top: 0;  /* Ensure no top margin */
}

/* Remove margin from first child if any */
.category-main > *:first-child {
  margin-top: 0;
}
</style>