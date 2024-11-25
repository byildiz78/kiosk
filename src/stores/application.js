import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('applicationStore', () => {
  const impairedActive = ref(false)
  const basketIsOpen = ref(false)
  const orderCancelConfirmIsOpen = ref(false)
  const basket = ref({ count: 0, total: 0, products: [] })

  const impairedToggle = () => {
    impairedActive.value = !impairedActive.value;
  }

  const basketToggle = () => {
    basketIsOpen.value = !basketIsOpen.value;
  }

  const orderCancelConfirmOpen = () => {
    if (basket.value.count > 0)
      orderCancelConfirmIsOpen.value = true;
  }

  const orderCancelConfirmOk = () => {
    basket.value = { count: 0, total: 0, products: [] };
    orderCancelConfirmIsOpen.value = false;
    basketIsOpen.value = false;
  }

  const orderCancelConfirmCancel = () => {
    orderCancelConfirmIsOpen.value = false;
  }

  const addToBasket = (product) => {

    let newProduct = { ...product };

    newProduct.index = Math.floor(Math.random() * 10000000);
    basket.value.products.push(newProduct);

    updateBasketTotals();

    basketIsOpen.value = true;
  }

  const updateBasketTotals = () => {

    let count = 0;
    let total = 0;
    basket.value.products.forEach(x => {

      count += x.quantity;
      total += x.quantity * x.price;
    });

    basket.value.count = count;
    basket.value.total = total;

  };

  const removeBasketItem = (product) => {
    const index = basket.value.products.findIndex(x => x.index === product.index);
    if (index !== -1) {
      basket.value.products.splice(index, 1);
    }
  };



  return {
    impairedActive,
    impairedToggle,
    basket,
    addToBasket,
    basketIsOpen,
    basketToggle,
    orderCancelConfirmIsOpen,
    orderCancelConfirmOpen,
    orderCancelConfirmOk,
    orderCancelConfirmCancel,
    updateBasketTotals,
    removeBasketItem
  }
})
