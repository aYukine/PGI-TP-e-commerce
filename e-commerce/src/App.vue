<script>
import axios from 'axios'
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import {useProductStore} from './stores/productStore'

export default {
  components: {
    CategoryComponent,
    PromotionComponent,
    ButtonComponent
  },
  setup() {
    const productStore = useProductStore()
    return { productStore }
  },
  methods: {
    shopNow(promotion) {
      alert("Let's shop: " + promotion.title);
    },
    fetchCategories() {
      axios.get('http://localhost:3000/api/categories')
        .then(response => {
          this.categories = response.data.map(cat => ({
            title: cat.name,
            items: cat.productCount,
            imgSrc: `http://localhost:3000/${cat.image.replace(/\\/g, '/')}`,
            bgColor: cat.color
          }));
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    },
    fetchPromotions() {
      axios.get('http://localhost:3000/api/promotions')
        .then(response => {
          this.promotions = response.data.map(promo => ({
            title: promo.title,
            imgSrc: `http://localhost:3000/${promo.image.replace(/\\/g, '/')}`,
            bgColor: promo.color,
            buttonColor: promo.buttonColor,
            url: promo.url
          }));
        })
        .catch(error => {
          console.error('Error fetching promotions:', error);
        });
    }
  },
  mounted() {
    this.fetchCategories();
    this.fetchPromotions();
  }
}
</script>

<template>
  <div id="app-root">

    <!-- Category Row -->
    <div class="category-row">
      <CategoryComponent
        v-for="(cate, i) in categories"
        :key="cate.title + i"
        v-bind="cate"
        :bgColor="cate.bgColor"
      />
    </div>

    <!-- Promotions Row -->
    <div class="promotions-row">
      <PromotionComponent
        v-for="(promo, i) in promotions"
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
