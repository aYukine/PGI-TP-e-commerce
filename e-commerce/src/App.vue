<script>
import axios from 'axios'
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import {useProductStore} from './stores/productStore'
import {mapState} from 'pinia'

export default {
  components: {
    CategoryComponent,
    PromotionComponent,
    ButtonComponent
  },
  data() {
    return {
      currentGroupName: 'Milks & Diaries'
    }
  },
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  methods: {
    shopNow(promotion) {
      alert("Let's shop: " + promotion.title);
    },
  },
  mounted() {
    this.productStore.fetchCategories();
    this.productStore.fetchPromotions();
    this.productStore.fetchGroups();
    this.productStore.fetchProducts();
  },
  computed: {
    ...mapState(useProductStore, {
      popularProducts: 'getPopularProducts',
      
      categories(store) {
        const result = store.getCategoriesByGroup(this.currentGroupName)
        console.log('Categories for group', this.currentGroupName, ':', result)
        return result
      },
      
      products(store) {
        const result = store.getProductsByGroup(this.currentGroupName)
        console.log('Products for group', this.currentGroupName, ':', result)
        return result
      }
    })
  },
  watch: {
    popularProducts(newVal) {
      console.log('Popular Products:', newVal)
    },
    currentGroupName(newVal) {
      console.log('Group changed to:', newVal)
    }
  }
}
</script>

<template>
  <div id="app-root">

    <!-- Category Row -->
    <div class="category-row">
      <CategoryComponent
        v-for="(cate, i) in productStore.categories"
        :key="cate.title + i"
        v-bind="cate"
        :bgColor="cate.bgColor"
      />
    </div>

    <!-- Promotions Row -->
    <div class="promotions-row">
      <PromotionComponent
        v-for="(promo, i) in productStore.promotions"
        :key="promo.title + i"
        :title="promo.title"
        desc=""
        :imgSrc="promo.imgSrc"
        :bgColor="promo.bgColor"
      >
        <template #button>
          <ButtonComponent :bgColor="promo.buttonColor" textColor="#fff" @click="shopNow(promo)">Shop Now →</ButtonComponent>
        </template>
      </PromotionComponent>
    </div>

  </div>
</template>

<style scoped>

.category-row {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 0 16px 24px 16px;
  margin-bottom: 24px;
}
.promotions-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 18px;
  padding: 0 16px;
}
@media (max-width: 900px) {
  .promotions-row {
    flex-direction: column;
    gap: 18px;
    align-items: center;
  }
}
</style>
