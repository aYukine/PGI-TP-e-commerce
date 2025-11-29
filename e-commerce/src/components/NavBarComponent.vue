<template>
  <nav class="navbar">
    <div class="navbar-top">
        <div class="navbar-left">
            <div class="logo">
            <img src="/logo.png" alt="Melon" />
        </div>
        <SearchBoxComponent class="searchbox" />
      </div>
      <div class="navbar-icons">
        <div class="icon-item">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" stroke="#3a4d39" stroke-width="2"/>
            <path d="M4 20c0-3.333 3.333-6 8-6s8 2.667 8 6" stroke="#3a4d39" stroke-width="2"/>
          </svg>
          <span>Account</span>
        </div>
        <div class="icon-item"><span>Compare</span></div>
        <div class="icon-item"><span>Wishlist</span></div>
        <div class="icon-item"><span>Cart</span></div>
      </div>
    </div>
    <div class="navbar-bottom">
      <button class="browse-btn">Browse All Categories</button>
      <MenuItemComponent label="Hot Deals" />
      <MenuItemComponent label="Home" />
      <MenuItemComponent label="Food" hasDropdown>
        <div>Fruits</div>
        <div>Vegetables</div>
        <div>Meat & Seafood</div>
      </MenuItemComponent>
      <MenuItemComponent label="Vegetables" hasDropdown>
        <div>Leafy</div>
        <div>Root</div>
      </MenuItemComponent>
      <MenuItemComponent label="Drink" />
      <MenuItemComponent label="Cookies" />
      <MenuItemComponent label="Meat & Seafood" />
      <MenuItemComponent label="Bakery" />
      <div class="support">
        <div class="support-phone">1900 - 8888</div>
        <div class="support-desc">24/7 Support Center</div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchBoxComponent from './SearchBoxComponent.vue';
import MenuItemComponent from './MenuItemComponent.vue';

export default {
  name: "NavBarComponent",
  components: {
    SearchBoxComponent,
    MenuItemComponent
  }
};
</script>

<style scoped>
.navbar {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d4e9d7;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.navbar-top {
  display: flex;
  justify-content: space-between;
  padding: 12px 32px;
  gap: 32px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logo img {
  width: auto;
  height: 48px;
}
.logo-text .brand {
  font-size: 22px;
  font-weight: bold;
  color: #3a4d39;
}
.logo-text .desc {
  font-size: 12px;
  color: #3a4d39;
}
.searchbox {
  flex: 1;
  margin: 0 32px;
}
.navbar-icons {
  display: flex;
  align-items: right;
  gap: 24px;
}
.icon-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  color: #3a4d39;
  cursor: pointer;
}
.navbar-bottom {
  display: flex;
  align-items: center;
  padding: 8px 32px;
  gap: 8px;
  border-top: 1px solid #d4e9d7;
}
.browse-btn {
  background: #3BB77E;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 15px;
  cursor: pointer;
  margin-right: 8px;
}
.support {
  margin-left: auto;
  text-align: right;
  color: #3a4d39;
}
.support-phone {
  font-size: 18px;
  font-weight: bold;
  color: #1fa463;
}
.support-desc {
  font-size: 12px;
}
</style>
