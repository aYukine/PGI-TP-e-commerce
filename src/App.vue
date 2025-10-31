<script setup lang="ts">
import CategoryComponent from './components/CategoryComponent.vue'
import PromotionComponent from './components/PromotionComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'

const categories = [
  { title: 'Cake & Milk', items: 14, imgSrc: '/imgs/cate/1.png', bgColor: "#F2FCE4"},
  { title: 'Peach', items: 17, imgSrc: '/imgs/cate/2.png', bgColor: "#FEFBE8"},
  { title: 'Organic Kiwi', items: 21, imgSrc: '/imgs/cate/3.png', bgColor: "#EAFEEF"},
  { title: 'Red Apple', items: 68, imgSrc: '/imgs/cate/4.png', bgColor: "#FFF0E9"},
  { title: 'Snack', items: 34, imgSrc: '/imgs/cate/5.png', bgColor: "#FEF4EB"},
  { title: 'Black plum', items: 25, imgSrc: '/imgs/cate/6.png', bgColor: "#FFF4FF"},
  { title: 'Vegetables', items: 65, imgSrc: '/imgs/cate/7.png', bgColor: "#F2FCE4"},
  { title: 'Headphone', items: 33, imgSrc: '/imgs/cate/8.png', bgColor: "#FEFBE8"},
  { title: 'Cake & Milk', items: 54, imgSrc: '/imgs/cate/9.png', bgColor: "#F2FCE4"},
  { title: 'Orange', items: 63, imgSrc: '/imgs/cate/10.png', bgColor: "#FFF3FF"},
]
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
        title="Everyday Fresh & Clean with Our Products"
        desc=""
        imgSrc="/imgs/promo/1.png"
        bgColor="#f0e8d5"
        borderColor="#f8fafb"
      >
        <template #button>
          <ButtonComponent bgColor="#27ae60" textColor="#fff">Shop Now →</ButtonComponent>
        </template>
      </PromotionComponent>

      <PromotionComponent
        title="Make your Breakfast Healthy and Easy"
        desc=""
        imgSrc="/imgs/promo/2.png"
        bgColor="#fff"
        borderColor="#f8fafb"
      >
        <template #button>
          <ButtonComponent bgColor="#27ae60" textColor="#fff">Shop Now →</ButtonComponent>
        </template>
      </PromotionComponent>

      <PromotionComponent
        title="The best Organic Products Online"
        desc=""
        imgSrc="/imgs/promo/3.png"
        bgColor="#e7eAf3"
        borderColor="#eaf6f2"
      >
        <template #button>
          <ButtonComponent bgColor="#f7b32b" textColor="#fff">Shop Now →</ButtonComponent>
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
