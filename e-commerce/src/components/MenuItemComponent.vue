<template>
  <div
    class="menu-item"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <router-link
      v-if="to"
      :to="to"
      class="menu-link"
      @click.native="hover = false"
    >
      <span>{{ label }}</span>
      <span v-if="hasDropdown" class="arrow">&#9662;</span>
    </router-link>
    <template v-else>
      <span>{{ label }}</span>
      <span v-if="hasDropdown" class="arrow">&#9662;</span>
    </template>
    <div v-if="hasDropdown && hover" class="dropdown">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItemComponent",
  props: {
    label: { type: String, required: true },
    hasDropdown: { type: Boolean, default: false },
    to: { type: [String, Object], default: null }
  },
  data() {
    return { hover: false };
  }
};
</script>

<style scoped>
.menu-item {
  padding: 0 16px;
  font-size: 16px;
  color: #3a4d39;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
}
.menu-link {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
.menu-item:hover {
  background: #f6fff7;
}
.arrow {
  margin-left: 6px;
  font-size: 12px;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #d4e9d7;
  border-radius: 4px;
  min-width: 120px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>