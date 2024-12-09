<template>
  <div class="menu-view">
    <div class="menu-content custom-scrollbar">
      <MenuHeader ref="header" />

      <div class="menu">
        <MenuGroups
          ref="refGroups"
          v-model="selectedGroup"
          :groups="groups"
          @select-group="setSelectedGroup"
        />

        <MenuItems
          ref="items"
          :selected-group="selectedGroup"
          :order-type="orderType"
          @select-product="setSelectedProduct"
        />
      </div>
    </div>

    <ProductModal
      v-model="modalIsOpen"
      :selected-product="selectedProduct"
      :order-type="orderType"
      :modifiers="modifiers"
      @add-to-basket="handleAddToBasket"
    />

    <BottomNav :showBasket="true" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useApplicationStore } from "@/stores/application";
import { useMenuStore } from "@/stores/menu";
import { storeToRefs } from "pinia";

import BottomNav from "../components/BottomNav.vue";
import MenuHeader from "../components/menu/MenuHeader.vue";
import MenuGroups from "../components/menu/MenuGroups.vue";
import MenuItems from "../components/menu/MenuItems.vue";
import ProductModal from "../components/menu/ProductModal.vue";

const router = useRouter();
const route = useRoute();
const applicationStore = useApplicationStore();
const menuStore = useMenuStore();

const orderType = route.query.orderType;

const { impairedActive } = storeToRefs(applicationStore);
const { addToBasket } = applicationStore;

const header = ref(null);
const items = ref(null);
const refGroups = ref(null);

const selectedGroup = ref({ MenuGroupKey: "", MenuGroupText: "", Items: [] });
const selectedProduct = ref(null);
const modalIsOpen = ref(false);

const groups = menuStore.getMenu();
const modifiers = menuStore.getModifiers();

onMounted(() => {
  const firstGroup = groups[0];
  selectedGroup.value = firstGroup;

  setTimeout(calculateHeights, 500);
});

watch(impairedActive, () => {
  setTimeout(calculateHeights, 500);
});

const setSelectedGroup = (group) => {
  selectedGroup.value = group;
};

const setSelectedProduct = (product) => {
  selectedProduct.value = { ...product, quantity: 1 };
  modalIsOpen.value = true;
};

const handleAddToBasket = ({ product, selectedItems, withPayment, totalPrice, notes }) => {
  addToBasket(selectedProduct.value, selectedItems, orderType, totalPrice, notes);

  if (withPayment) {
    router.push({ name: "payment" });
  }
};

const calculateHeights = () => {
  if (header.value?.logo && header.value?.carousel && items.value?.menuCaption) {
    const bottomNav = document.getElementById("bottom-nav");
    const bottomNavStyle = getComputedStyle(bottomNav);
    const bottomNavHeight = parseFloat(bottomNavStyle.height);

    const menuContent = document.querySelector('.menu-content');
    if (menuContent) {
      menuContent.style.height = `calc(100vh - ${bottomNavHeight}px)`;
    }
  }
};
</script>

<style scoped>
.menu-view {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.menu-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 5rem;
}

.menu {
  display: flex;
  flex-direction: row;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 133, 0, 0.1);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  border-radius: 4px;
}
</style>