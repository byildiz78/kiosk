<template>

    <div class="basket">

        <div class="logo">
            <Logo :width="200" />
        </div>


        <div class="selector-1">

            <div class="caption">Sepet ({{ basket.count }})</div>


            <div class="content">

                <div class="item" v-for="product in basket.products" :key="product.index">
                    <div class="img" :style="{ 'background-image': 'url(' + product.src + ')' }"></div>
                    <div class="name">
                        <span class="title">{{ product.name }}</span>
                        <span class="notes">* Seçenek 1, Seçenek 2, Seçenek 3, Seçenek 4</span>
                    </div>
                    <div class="quantity-options">
                        <div class="quantity-button">

                            <button @click="setQuantityMinus(product)">
                                <Trash v-if="product.quantity == 1" :width="40" :height="40" :fill="'#d96000'"
                                    :style="'background-color: #fff; border-radius: 100%; border: 2px solid #d96000;padding:3px'" />

                                <Minus v-else :width="40" :height="40" :fill="'#d96000'"
                                    :style="'background-color: #fff; border-radius: 100%;'" />
                            </button>

                        </div>
                        <div class="quantity">{{ product.quantity }}</div>
                        <div class="quantity-button">
                            <button @click="setQuantityPlus(product)">
                                <Plus :width="40" :height="40" :fill="'#d96000'"
                                    :style="'background-color: #fff; border-radius: 100%;'" />
                            </button>
                        </div>
                    </div>

                    <div class="price">{{ product.price }} TL</div>
                </div>

            </div>


        </div>


        <div class="selector-2">

            <button class="goMenu" @click="goMenu">
                MENÜYE DÖN
            </button>

            <button class="goPayment" @click="goPayment">
                <div class="totalPrice">
                    {{ basket.total }} TL
                </div>
                <div class="info">
                    SİPARİŞİ TAMAMLA
                </div>
            </button>

        </div>

    </div>
</template>

<script setup>
import Logo from '../components/icons/Logo.vue'
import Minus from '../components/icons/Minus.vue'
import Plus from '../components/icons/Plus.vue'
import Trash from '../components/icons/Trash.vue'

import { useApplicationStore } from '@/stores/application'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const applicationStore = useApplicationStore();

const { basket } = storeToRefs(applicationStore)

const { updateBasketTotals, removeBasketItem } = applicationStore;


const setQuantityMinus = (product) => {
    if (product.quantity > 1)
        product.quantity--;
    else {
        removeBasketItem(product);
    }

    updateBasketTotals();
}

const setQuantityPlus = (product) => {
    if (product.quantity > 0)
        product.quantity++;

    updateBasketTotals();
}

const goMenu = () => {

    router.push({ name: 'menu' });

};

const goPayment = () => {

    router.push({ name: 'payment' });

};

</script>

<style scoped>
.basket {
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.basket .logo {
    flex: 1;
    background-color: #000;
    display: flex;
    justify-content: center;
}

.basket .logo svg {
    margin: 1rem 0;
}

.basket .selector-1 {
    flex: 10;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 2rem 2rem 0 2rem;
}

.basket .selector-2 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid orange
}

.caption {
    color: #d96000;
    font-size: 2rem;
    font-weight: 700;
    margin: 0.5rem 0 0.5rem 0;
    width: 100%;
}

.content {
    width: 100%;
    max-height: 1505px;
    display: grid;
    gap: 1rem;
    overflow: auto;
    padding-bottom: 1rem;
}

.content::-webkit-scrollbar {
    display: none;
}

.content .item {
    display: flex;
    justify-content: space-between;
    background-color: #e9980329;
    border-radius: 1rem;
    padding: 1rem;
}

.content .item .img {
    width: 150px;
    height: 150px;
    border-radius: 0.5rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border: 1px solid #d96000;
}

.content .item .name {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
}

.content .item .name span {
    display: block;
}

.content .item .name .title {
    color: #ff8500;
}

.content .item .name .notes {
    color: #272727;
    font-size: 1.2rem;
}

.content .item .price {
    font-size: 1.5rem;
    text-align: center;
    align-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #d96000;

}


.quantity-options {
    display: flex;
    align-items: center;
}

.quantity-options .quantity-button button {
    border: none;
    padding: 0;
    background-color: transparent;
}

.quantity-options .quantity-button button:active {
    opacity: 0.8;
}

.quantity-options .quantity {
    font-size: 2rem;
    font-weight: 700;
    padding: 0 1rem 0.6rem 1rem;
}

.selector-2 button {
    background-color: #d96000;
    border: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 0 2rem;
    border-radius: 1.3rem;
    font-size: 2rem;
    color: #fff;
    padding: 2rem;
}

.selector-2 button .totalPrice {
    font-weight: 700;
}

button.goMenu {
    flex: 1;
}

button.goPayment {
    flex: 1.1;
}
</style>