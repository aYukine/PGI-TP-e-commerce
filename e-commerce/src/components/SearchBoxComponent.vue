<template>
  <div class="search-box">
    <select v-model="selectedCategory" class="category-select">
      <option value="all">All Categories</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="books">Books</option>
      <!-- Add more categories as needed -->
    </select>
    <input
      v-model="searchQuery"
      type="text"
      class="search-input"
      placeholder="Search for items"
    />
    <button class="search-btn" @click="onSearch">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" stroke="#888" stroke-width="2"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#888" stroke-width="2"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBoxComponent",
  data() {
    return {
      selectedCategory: "all",
      searchQuery: "",
    };
  },
  methods: {
    onSearch() {
      // Emit search event with query and category
      this.$emit("search", {
        query: this.searchQuery,
        category: this.selectedCategory,
      });
    },
  },
};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  border: 2px solid #D4E9D7;
  border-radius: 6px;
  padding: 4px 8px;
  background: #fff;
  width: 1000px;
  max-width: 500px;
  box-sizing: border-box;
}

.category-select {
  border: none;
  background: transparent;
  font-size: 14px;
  color: #3a4d39;
  padding: 6px 8px;
  outline: none;
  min-width: 120px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #3a4d39;
  padding: 6px 8px;
  outline: none;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 8px;
  display: flex;
  align-items: center;
}

.search-btn svg {
  display: block;
}
</style>
