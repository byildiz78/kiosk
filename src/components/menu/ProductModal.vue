<template>
  <teleport to="body">
    <transition name="modal" appear>
      <div class="modal-overlay" v-if="modelValue">
        <transition name="modal-content" appear>
          <div class="modal-content custom-scrollbar">
            <!-- Product Header -->
            <div class="product-header">
              <div class="header-content">
                <div class="header-icon">
                  <Chef :width="32" :height="32" :fill="'#fff'" />
                </div>
                <div class="header-text">
                  <h1>{{ selectedProduct?.MenuItemText }}</h1>
                  <div class="price-badge">
                    <span class="amount">{{ totalPrice }}</span>
                    <span class="currency">TL</span>
                  </div>
                </div>
              </div>
              <button class="close-btn" @click="$emit('update:modelValue', false)">
                <Close :width="24" :height="24" :fill="'#ff4757'" />
              </button>
            </div>

            <div class="modal-body">
              <!-- Product Description -->
              <div class="product-description">
                <div class="description-icon">
                  <Info :width="24" :height="24" :fill="'#ff8500'" />
                </div>
                <p>
                  Onun lezzet durumu: karışık! Acıktığı an ortaya karışık bir
                  şeyler isteyenlere kıyma, peynir ve kuşbaşı etiyle Karışık
                  Pidem!
                </p>
              </div>

              <!-- Product Image -->
              <div class="product-image">
                <img
                  :src="`assets/products/${selectedProduct?.MenuItemKey}.jpg`"
                  :alt="selectedProduct?.name"
                />
                <div class="image-overlay"></div>
              </div>

              <!-- Choices Sections -->
              <div class="choices-container">
                <template v-if="selectedProduct?.Combo">
                  <div
                    v-for="(group, groupIndex) in selectedProduct.Combo"
                    :key="groupIndex"
                    class="choice-group animate__animated animate__fadeIn"
                    :style="{ animationDelay: `${groupIndex * 0.1}s` }"
                  >
                    <div class="group-header">
                      <div class="group-title">
                        <h3>{{ group.GroupName }}</h3>
                        <div class="group-info">
                          <span v-if="group.IsForcedGroup" class="required-badge"
                            >Zorunlu Seçim</span
                          >
                          <span v-if="group.MaxQuantity > 0" class="max-quantity"
                            >Max: {{ group.MaxQuantity }}</span
                          >
                        </div>
                      </div>
                      <div class="animated-line"></div>
                    </div>

                    <div class="items-grid">
                      <div
                        v-for="item in group.Items"
                        :key="item.MenuItemKey"
                        class="choice-item"
                        :class="{
                          'has-subitems': item.SubItems?.length > 0,
                          selected: isItemSelected(item),
                        }"
                        @click="handleItemClick(group, item)"
                      >
                        <div class="item-image">
                          <img
                            :src="`assets/products/${item.MenuItemKey}.jpg`"
                            :alt="item.MenuItemText"
                            @error="
                              $event.target.src = 'assets/products/default.png'
                            "
                          />
                          <div class="image-overlay">
                            <div class="select-button">
                              <Check v-if="isItemSelected(item)" :width="24" :height="24" :fill="'#fff'" />
                              <span>{{ isItemSelected(item) ? 'Seçildi' : 'Seç' }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="item-content">
                          <div class="item-header">
                            <div class="item-name-container">
                              <span class="item-name">{{
                                item.MenuItemText
                              }}</span>
                              <span
                                v-if="item.ExtraPriceTakeOut_TL > 0"
                                class="item-price"
                              >
                                +{{ item.ExtraPriceTakeOut_TL }} TL
                              </span>
                            </div>
                            <div
                              v-if="getSelectedSubItem(item)"
                              class="selected-subitem"
                            >
                              ({{ getSelectedSubItem(item).MenuItemText }}
                              <template
                                v-if="
                                  getSelectedSubItem(item)
                                    .ExtraPriceTakeOut_TL > 0
                                "
                              >
                                +{{
                                  getSelectedSubItem(item).ExtraPriceTakeOut_TL
                                }}
                                TL
                              </template>
                              )
                            </div>

                            <span
                              v-if="isItemSelected(item)"
                              class="item-quantity"
                            >
                              <button
                                @click.stop="decreaseQuantity(group, item)"
                                :disabled="!canDecreaseQuantity(group, item)"
                                class="quantity-btn"
                              >
                                <Minus :width="20" :height="20" :fill="canDecreaseQuantity(group, item) ? '#2d3436' : '#b2bec3'" />
                              </button>
                              <span>{{ getItemQuantity(item) }}</span>
                              <button
                                @click.stop="increaseQuantity(group, item)"
                                :disabled="!canIncreaseQuantity(group)"
                                class="quantity-btn"
                              >
                                <Plus :width="20" :height="20" :fill="canIncreaseQuantity(group) ? '#2d3436' : '#b2bec3'" />
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <div class="notes-section">
                <div class="notes-header">
                  <div class="notes-title">
                    <h3>{{$t('menu.modal.productNote')}}</h3>
                    <button @click="showKeyboard = true" class="edit-note-btn">
                      <span v-if="!notes">{{$t('menu.modal.addNote')}}</span>
                      <span v-else>{{$t('menu.modal.editNote')}}</span>
                    </button>
                  </div>
                  <div class="animated-line"></div>
                </div>
                <div class="notes-content" v-if="notes">
                  {{ notes }}
                </div>
              </div>

              <VirtualKeyboard
                v-model="notes"
                :show="showKeyboard"
                @close="showKeyboard = false"
              />
            </div>

            <!-- Action Footer -->
            <div class="modal-footer">
              <button
                class="cancel-btn"
                @click="$emit('update:modelValue', false)"
              >
                <Close :width="24" :height="24" :fill="'#fff'" />
                <span>{{ $t("menu.modal.cancel") }}</span>
              </button>

              <div class="quantity-controls">
                <button class="quantity-btn minus" @click="setQuantityMinus">
                  <Minus :width="24" :height="24" :fill="'#fff'" />
                </button>
                <span class="quantity">{{
                  selectedProduct?.quantity || 1
                }}</span>
                <button class="quantity-btn plus" @click="setQuantityPlus">
                  <Plus :width="24" :height="24" :fill="'#fff'" />
                </button>
              </div>

              <div class="action-buttons">
                <button class="payment-btn" @click="addToBasketAndClose(true)">
                  <CreditCard :width="24" :height="24" :fill="'#fff'" />
                  <span>{{ $t("menu.modal.direktPay") }}</span>
                </button>

                <button class="add-btn" @click="addToBasketAndClose(false)">
                  <Cart :width="24" :height="24" :fill="'#fff'" />
                  <span>{{ $t("menu.modal.addToBasket") }}</span>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- SubItem Modal -->
    <SubItemModal
      v-model="showSubItemModal"
      :title="currentParentItem?.MenuItemText"
      :items="currentSubItems"
      @select-item="handleSubItemSelect"
    />

    <!-- Warning Modal -->
    <WarningModal
      v-model="showWarningModal"
      message="Lütfen zorunlu seçimleri tamamlayın."
    />
  </teleport>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import Close from "../icons/Close.vue";
import Minus from "../icons/Minus.vue";
import Plus from "../icons/Plus.vue";
import Info from "../icons/Info.vue";
import CreditCard from "../icons/CreditCard.vue";
import Cart from "../icons/Cart.vue";
import Check from "../icons/Check.vue";
import Chef from "../icons/Chef.vue";
import SubItemModal from "./SubItemModal.vue";
import WarningModal from "./WarningModal.vue";
import { useApplicationStore } from "@/stores/application";
import VirtualKeyboard from "../common/VirtualKeyboard.vue";

const applicationStore = useApplicationStore();
const { basket } = storeToRefs(applicationStore);

const props = defineProps({
  modelValue: Boolean,
  selectedProduct: Object,
  modifiers: Array,
});

const selectedItems = ref(new Map());
const selectedSubItems = ref(new Map());
const showSubItemModal = ref(false);
const currentSubItems = ref([]);
const currentParentItem = ref(null);
const currentGroup = ref(null);
const showWarningModal = ref(false);
const notes = ref("");
const showKeyboard = ref(false);

const resetState = () => {
  selectedItems.value.clear();
  selectedSubItems.value.clear();
  showSubItemModal.value = false;
  currentSubItems.value = [];
  currentParentItem.value = null;
  currentGroup.value = null;
  notes.value = "";
  showKeyboard.value = false;
};

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      resetState();

      if (props.selectedProduct?.Combo) {
        props.selectedProduct.Combo.forEach((group) => {
          group.Items.forEach((item) => {
            if (item.IsDefault) {
              selectedItems.value.set(item.MenuItemKey, {
                item: item,
                quantity: item.DefaultQuantity || 1,
                group: group,
              });

              if (item.SubItems?.length > 0) {
                const defaultSubItem = item.SubItems.find(
                  (subItem) => subItem.IsDefault
                );
                if (defaultSubItem) {
                  const subItemWithParent = {
                    ...defaultSubItem,
                    parentItem: item,
                  };
                  selectedItems.value.set(item.MenuItemKey, {
                    item: subItemWithParent,
                    quantity: defaultSubItem.DefaultQuantity || 1,
                    group: group,
                  });
                }
              }
            }
          });
        });
      }
    }
  }
);

const isItemSelected = (item) => {
  return selectedItems.value.has(item.MenuItemKey);
};

const getItemQuantity = (item) => {
  return selectedItems.value.get(item.MenuItemKey)?.quantity || 0;
};

const getGroupSelectedQuantity = (group) => {
  let total = 0;
  group.Items.forEach((item) => {
    total += getItemQuantity(item);
  });
  return total;
};

const canIncreaseQuantity = (group) => {
  const currentQuantity = getGroupSelectedQuantity(group);
  return group.MaxQuantity === 0 || currentQuantity < group.MaxQuantity;
};

const canDecreaseQuantity = (group, item) => {
  const currentQuantity = getItemQuantity(item);
  if (
    group.IsForcedGroup &&
    getGroupSelectedQuantity(group) <= group.ForcedQuantity
  ) {
    return false;
  }
  return currentQuantity > 0;
};

const canDeselectItem = (group, item) => {
  if (
    group.IsForcedGroup &&
    group.MaxQuantity === 1 &&
    group.Items.length === 1 &&
    isItemSelected(item)
  ) {
    return false;
  }
  return true;
};

const handleItemClick = (group, item) => {
  if (item.SubItems?.length > 0) {
    currentSubItems.value = item.SubItems;
    currentParentItem.value = item;
    currentGroup.value = group;
    showSubItemModal.value = true;
    return;
  }

  if (group.MaxQuantity === 1) {
    if (isItemSelected(item) && !canDeselectItem(group, item)) {
      return;
    }

    group.Items.forEach((groupItem) => {
      if (groupItem.MenuItemKey !== item.MenuItemKey) {
        selectedItems.value.delete(groupItem.MenuItemKey);
      }
    });

    if (isItemSelected(item)) {
      selectedItems.value.delete(item.MenuItemKey);
    } else {
      selectedItems.value.set(item.MenuItemKey, {
        item,
        quantity: 1,
        group,
      });
    }
  } else {
    if (!isItemSelected(item)) {
      if (canIncreaseQuantity(group)) {
        increaseQuantity(group, item);
      }
    }
  }
};

const increaseQuantity = (group, item) => {
  if (!canIncreaseQuantity(group)) return;

  const current = selectedItems.value.get(item.MenuItemKey);
  if (current) {
    selectedItems.value.set(item.MenuItemKey, {
      ...current,
      quantity: current.quantity + 1,
    });
  } else {
    selectedItems.value.set(item.MenuItemKey, {
      item,
      quantity: 1,
      group,
    });
  }
};

const decreaseQuantity = (group, item) => {
  if (!canDecreaseQuantity(group, item)) return;

  const current = selectedItems.value.get(item.MenuItemKey);
  if (current) {
    if (current.quantity > 1) {
      selectedItems.value.set(item.MenuItemKey, {
        ...current,
        quantity: current.quantity - 1,
      });
    } else {
      selectedItems.value.delete(item.MenuItemKey);
    }
  }
};

const handleSubItemSelect = (subItem) => {
  if (currentGroup.value && currentParentItem.value) {
    const group = currentGroup.value;

    if (group.MaxQuantity === 1) {
      group.Items.forEach((groupItem) => {
        selectedItems.value.delete(groupItem.MenuItemKey);
      });
    } else if (!canIncreaseQuantity(group)) {
      return;
    }

    const subItemWithParent = {
      ...subItem,
      parentItem: currentParentItem.value,
    };

    selectedItems.value.set(currentParentItem.value.MenuItemKey, {
      item: subItemWithParent,
      quantity: 1,
      group: currentGroup.value,
    });
  }
};

const getSelectedSubItem = (parentItem) => {
  const selectedItem = selectedItems.value.get(parentItem.MenuItemKey);
  if (!selectedItem) return null;

  if (selectedItem.item.parentItem) {
    return selectedItem.item;
  }
  return null;
};

const isValidSelection = computed(() => {
  if (!props.selectedProduct?.Combo) return true;

  return props.selectedProduct.Combo.every((group) => {
    if (group.IsForcedGroup) {
      const selectedCount = getGroupSelectedQuantity(group);
      return selectedCount >= group.ForcedQuantity;
    }
    return true;
  });
});

const getSelectedItemsArray = () => {
  const items = [];
  selectedItems.value.forEach((value, key) => {
    value.item.price =
      (basket.value.orderType === "TakeOut"
        ? value.item.ExtraPriceTakeOut_TL
        : value.item.ExtraPriceDelivery_TL) * value.quantity;

    items.push({
      item: value.item,
      quantity: value.quantity,
      group: value.group,
    });
  });
  return items;
};

const addToBasketAndClose = (withPayment = false) => {
  if (!isValidSelection.value) {
    showWarningModal.value = true;
    return;
  }

  emit("add-to-basket", {
    product: props.selectedProduct,
    selectedItems: getSelectedItemsArray(),
    withPayment,
    totalPrice: totalPrice.value,
    notes: notes.value
  });
  emit("update:modelValue", false);
};

const emit = defineEmits(["update:modelValue", "add-to-basket"]);

const setQuantityMinus = () => {
  if (props.selectedProduct.quantity > 1) {
    props.selectedProduct.quantity--;
  }
};

const setQuantityPlus = () => {
  if (props.selectedProduct.quantity > 0) {
    props.selectedProduct.quantity++;
  }
};

const totalPrice = computed(() => {
  let total =
    basket.value.orderType === "TakeOut"
      ? props.selectedProduct?.TakeOutPrice_TL || 0
      : props.selectedProduct?.DeliveryPrice_TL || 0;

  if (props.selectedProduct?.Combo) {
    props.selectedProduct.Combo.forEach((group) => {
      group.Items.forEach((item) => {
        const selectedItem = selectedItems.value.get(item.MenuItemKey);
        if (selectedItem) {
          const extraPrice =
            basket.value.orderType === "TakeOut"
              ? item.ExtraPriceTakeOut_TL || 0
              : item.ExtraPriceDelivery_TL || 0;
          total += extraPrice * selectedItem.quantity;

          const selectedSubItem = getSelectedSubItem(item);
          if (selectedSubItem) {
            const subItemExtraPrice =
              basket.value.orderType === "TakeOut"
                ? selectedSubItem.ExtraPriceTakeOut_TL || 0
                : selectedSubItem.ExtraPriceDelivery_TL || 0;
            total += subItemExtraPrice;
          }
        }
      });
    });
  }

  return total;
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.modal-content {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.product-header {
  background: linear-gradient(135deg, #ff8500 0%, #ff6f00 100%);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.header-icon {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.2rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header-text h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.price-badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.price-badge .amount {
  font-size: 2rem;
  font-weight: 800;
}

.price-badge .currency {
  font-size: 1.2rem;
  opacity: 0.9;
}

.close-btn {
  background: white;
  border: 2px solid #ff4757;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.2);
}

.close-btn:hover {
  background: #ff4757;
}

.close-btn:hover svg path {
  stroke: white;
}

.product-description {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.description-icon {
  background: rgba(255, 133, 0, 0.1);
  padding: 0.8rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.product-description p {
  margin: 0;
  font-size: 1.1rem;
  color: #2d3436;
  line-height: 1.6;
}

.product-image {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
}

.product-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 100%);
}

.choices-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
}

.choice-group {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.choice-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.group-header {
  margin-bottom: 1.5rem;
}

.group-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.group-title h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
}

.group-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.required-badge {
  background: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.max-quantity {
  color: #636e72;
  font-size: 0.9rem;
  font-weight: 500;
}

.animated-line {
  height: 2px;
  background: linear-gradient(90deg, #ff8500, transparent);
  position: relative;
  overflow: hidden;
}

.animated-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 133, 0, 0.5), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  to {
    left: 100%;
  }
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.25rem;
}

.choice-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.choice-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.choice-item.selected {
  border: 2px solid #ff8500;
  box-shadow: 0 8px 20px rgba(255, 133, 0, 0.2);
}

.item-image {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.choice-item:hover .item-image img {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 133, 0, 0.9), rgba(255, 111, 0, 0.9));
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.select-button span {
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}

.choice-item:hover .image-overlay {
  opacity: 1;
}

.choice-item:hover .select-button {
  transform: translateY(0);
}

.item-content {
  padding: 1rem;
}

.item-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.item-name {
  font-weight: 600;
  color: #2d3436;
  font-size: 1rem;
  line-height: 1.4;
}

.item-price {
  background: rgba(255, 133, 0, 0.1);
  color: #ff8500;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.selected-subitem {
  font-size: 0.85rem;
  color: #636e72;
  font-style: italic;
  background: rgba(0, 0, 0, 0.05);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 25px;
  margin-top: 0.5rem;
}

.quantity-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:not(:disabled):hover {
  background: rgba(0, 0, 0, 0 .05);
}

.quantity-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.item-quantity span {
  font-weight: 600;
  color: #2d3436;
  min-width: 2ch;
  text-align: center;
}

.notes-section {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.notes-header {
  margin-bottom: 1rem;
}

.notes-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.notes-title h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
}

.edit-note-btn {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 133, 0, 0.2);
}

.edit-note-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 133, 0, 0.3);
}

.notes-content {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 10px;
  color: #2d3436;
  font-size: 1rem;
  line-height: 1.6;
  min-height: 60px;
}

.modal-footer {
  background: #2d3436;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.cancel-btn {
  background: #636e72;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: #2d3436;
  transform: translateY(-2px);
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
}

.quantity-controls .quantity-btn {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.8rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.quantity-controls .quantity-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.quantity-controls .quantity {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  min-width: 3ch;
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.action-buttons button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.payment-btn {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
}

.add-btn {
  background: linear-gradient(135deg, #ff8500, #ff6f00);
}

.action-buttons button:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.action-buttons button::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: rotate(45deg);
  transition: 0.3s;
}

.action-buttons button:hover::after {
  transform: rotate(45deg) translate(50%, 50%);
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 133, 0, 0.1);
  border-radius: 5px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff8500, #ff6f00);
  border-radius: 5px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ff6f00, #ff5f00);
}

/* Modal Animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 0;
  }

  .modal-content {
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
  }

  .product-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .header-content {
    flex-direction: column;
  }

  .header-text h1 {
    font-size: 1.8rem;
  }

  .price-badge {
    margin: 0 auto;
  }

  .modal-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .cancel-btn,
  .quantity-controls,
  .action-buttons {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
  }

  .quantity-controls {
    justify-content: center;
  }

  .items-grid {
    grid-template-columns: 1fr;
  }
}
</style>