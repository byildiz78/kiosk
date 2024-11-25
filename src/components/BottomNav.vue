<template>


    <div class="bottom-fixed" id="bottom-nav">
        <div class="basket" v-if="showBasket">
            <div class="info" @click="basketToggle">
                <div class="left">
                    <BasketUp v-if="!basketIsOpen" :width="40" height="40" :fill="'#fff'" />
                    <BasketDown v-else :width="40" height="40" :fill="'#fff'" />
                    <span>Siparişim</span>
                </div>

                <div class="right">
                    <Basket :width="30" height="30" :fill="'#fff'" />
                    <span>{{ basket.count }} Ürün / {{ basket.total.toFixed(2) }} TL</span>
                </div>

            </div>

            <Transition enter-active-class="animate__animated animate__fadeInLeft animate__faster"
                leave-active-class="animate__animated animate__fadeOutRight animate__faster" mode="out-in">
                <div class="basket-area" v-if="basketIsOpen">

                    <div class="basket-detail">
                        
                        <a v-for="product in basket.products" :key="product.index">
                            <div class="img" :style="{ 'background-image': 'url(' + product.src + ')' }"></div>
                            <div class="name">{{ product.name }}</div>
                            <div class="price">{{ product.price }} TL</div>
                        </a>

                    </div>

                    <div class="basket-action">
                        <button class="cancel" @click="orderCancelConfirmOpen">SİPARİŞİ İPTAL ET</button>
                        <button class="go-basket" @click="goShowBasket">SEPETİ GÖSTER</button>
                    </div>

                    <Transition enter-active-class="animate__animated animate__fadeInLeft animate__faster"
                        leave-active-class="animate__animated animate__fadeOutRight animate__faster" mode="out-in">

                        <div class="basket-cancel" v-if="orderCancelConfirmIsOpen">
                            <div class="question">Siparişi iptal etmek istediğinize emin misiniz?</div>
                            <div class="reply">
                                <div class="cancel">
                                    <button @click="orderCancelConfirmCancel">VAZGEÇ</button>
                                </div>
                                <div class="yes">
                                    <button @click="orderCancelConfirmOk">EVET</button>
                                </div>
                            </div>
                        </div>
                    </Transition>

                </div>
            </Transition>




        </div>
        <div class="bottom-nav">

            <div class="go-back">
                <div @click="goBack">
                    <Back :width="40" :height="40" />
                    <span>Geri Dön</span>
                </div>
            </div>
            <div class="language-selector">

                <a href="javascript:void();" class="active">
                    <FlagTR :width="50" :height="50" />
                </a>

                <a href="javascript:void();">
                    <FlagUS :width="50" :height="50" />
                </a>

                <a href="javascript:void();">
                    <FlagSU :width="50" :height="50" />
                </a>

            </div>
            <div class="impaired">
                <div @click="impairedToggle" :class="{ active: impairedActive }">
                    <span>Engelsiz Menü</span>
                    <WhellChair :width="40" :height="40" />
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import FlagTR from './icons/flags/Flag-TR.vue'
import FlagUS from './icons/flags/Flag-US.vue'
import FlagSU from './icons/flags/Flag-SU.vue'
import WhellChair from './icons/WhellChair.vue'
import Back from './icons/Back.vue'
import BasketUp from './icons/BasketUp.vue'
import BasketDown from './icons/BasketDown.vue'
import Basket from './icons/Basket.vue'

import { useApplicationStore } from '@/stores/application'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const applicationStore = useApplicationStore();

const { impairedActive, basket, basketIsOpen, orderCancelConfirmIsOpen } = storeToRefs(applicationStore)

const { impairedToggle, basketToggle, orderCancelConfirmOpen, orderCancelConfirmOk, orderCancelConfirmCancel } = applicationStore;

const goBack = () => {
    history.go(-1);
};

const goShowBasket = () => {
    if (basket.value.count > 0)
        router.push({ name: 'basket' });
};


const { showBasket } = defineProps(['showBasket']);

</script>

<style scoped>
.bottom-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    width: 100vw;
}

.basket {
    background-color: rgb(73, 48, 0);
    display: flex;
    flex-direction: column;
}



.basket .info {
    background-color: rgb(73, 48, 0);
    display: flex;
    width: 100vw;
    justify-content: space-between;
}

.basket .info .left {
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
}

.basket .info .left span {
    color: #fff;
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 0.5rem;
}

.basket .info .right {
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
}

.basket .info .right span {
    color: #fff;
    font-weight: 500;
    font-size: 1.2rem;
    margin-left: 0.5rem;
}

.basket .basket-area {
    position: relative;
}

.basket .basket-detail {
    border-top: 2px solid rgb(48, 32, 2);
    background-color: rgb(107, 70, 2);
    display: flex;
}

.basket .basket-detail a {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background-color: #956307;
    border-left: 1px solid rgb(105, 71, 7);
    align-items: center;
}

.basket .basket-detail a .img {
    width: 100px;
    height: 100px;
    border-radius: 0.5rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.basket .basket-detail a .name {
    color: #fff;
    font-size: 1rem;
    text-align: center;
}

.basket .basket-detail a .price {
    color: #fff;
    font-size: 1rem;
    text-align: center;
}

.basket .basket-cancel {
    background-color: rgb(73, 48, 0);
    display: flex;
    width: 100vw;
    height: 100%;
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.basket .basket-cancel .reply {
    display: flex;
}

.basket .basket-cancel .question {
    font-size: 2rem;
    color: #fff;
}

.basket .basket-cancel button {
    padding: 1rem 2rem;
    font-size: 2rem;
    font-weight: 700;
    background-color: #fff;
    border-radius: 1.5rem;
    color: orange;
    border-color: orange;
    margin: 1rem;
    min-width: 300px;
}

.basket .basket-action {
    display: grid;
    grid-template-columns: auto auto;
    width: 100vw;
}

.basket .basket-action button {
    border: none;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 700;
    padding: 1rem;
}

.basket .basket-action button.cancel {
    background-color: rgb(218, 25, 25);
}

.basket .basket-action button.go-basket {
    background-color: rgb(35, 105, 35);

}

.bottom-nav {

    background-color: orange;
    display: flex;
    flex-direction: row;

}

.bottom-nav .go-back {
    flex: 1;
    display: flex;
    justify-content: start;

}

.bottom-nav .go-back>div {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
}

.bottom-nav .go-back>div span {
    font-weight: 700;
    font-size: 1.2rem;
    margin-left: 0.5rem;
}

.bottom-nav .language-selector {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bottom-nav a {
    margin: 0.4rem 0.4rem 0 0.4rem;
    position: relative;
}

.bottom-nav .language-selector a.active::after {
    width: 7px;
    height: 7px;
    background: white;
    position: absolute;
    content: '';
    bottom: 6px;
    left: 44%;
    border-radius: 1rem;
}

.bottom-nav .impaired {
    flex: 1;
    display: flex;
    justify-content: end;
}

.bottom-nav .impaired>div {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
}

.bottom-nav .impaired>div.active {
    background-color: rgb(206, 134, 0);
}

.bottom-nav .impaired>div span {
    font-weight: 700;
    font-size: 1.2rem;
    margin-right: 0.5rem;
}
</style>