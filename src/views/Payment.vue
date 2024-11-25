<template>

    <div class="payment">

        <div class="logo">
            <Logo :width="200" />
        </div>


        <div class="selector-1">

            <div class="caption">
                <span class="question">Hangi ödeme şekliyle ödemek istersiniz?</span>
                <span class="total-price">{{ basket.total.toFixed(2) }} TL</span>
            </div>


            <div class="content">

                <button class="payment-button" @click="goPaymentWaiting">

                    <CreditCard :width="170" :fill="'#fff'" />
                    <span>KREDİ KARTI</span>

                </button>

                <button class="payment-button" @click="showMealPaymentTypeModal">

                    <MealCard :width="170" :fill="'#fff'" />
                    <span>YEMEK ÇEKİ</span>
                    <div class="meal-payment-types" v-if="showMealPaymentTypes">
                        <button @click="goPaymentWaiting"><Metropolcard :width="250" :height="100" /></button>
                        <button @click="goPaymentWaiting"><Multinet :width="250" :height="100" /></button>
                        <button @click="goPaymentWaiting"><Pluxee :width="250" :height="100" /></button>
                        <button @click="goPaymentWaiting"><Setcard :width="250" :height="100" /></button>
                    </div>
                </button>


            </div>


        </div>



    </div>
</template>

<script setup>
import Logo from '../components/icons/Logo.vue'
import CreditCard from '../components/icons/CreditCard.vue'
import MealCard from '../components/icons/MealCard.vue'

import Metropolcard from '../components/icons/brands/Metropolcard.vue'
import Multinet from '../components/icons/brands/Multinet.vue'
import Pluxee from '../components/icons/brands/Pluxee.vue'
import Setcard from '../components/icons/brands/Setcard.vue'

import { ref } from 'vue'
import { useApplicationStore } from '@/stores/application'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const applicationStore = useApplicationStore();

const { basket } = storeToRefs(applicationStore)

const { updateBasketTotals, removeBasketItem } = applicationStore;

const showMealPaymentTypes = ref(false);

const goPaymentWaiting = () => {

    router.push({ name: 'payment-waiting' });

};

const goPaymentSuccess = () => {

    router.push({ name: 'payment-success' });

};

const showMealPaymentTypeModal = () => {

    showMealPaymentTypes.value = true;

}

</script>

<style scoped>
.payment {
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.payment .logo {
    flex: 1;
    background-color: #000;
    display: flex;
    justify-content: center;
}

.payment .logo svg {
    margin: 1rem 0;
}

.payment .selector-1 {
    flex: 10;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 2rem 2rem 0 2rem;
    position: relative;
}

.payment .selector-2 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid orange;
}

.caption {
    color: #d96000;
    margin: 0.5rem 0 0.5rem 0;
    width: 100%;
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    row-gap: 4rem;


}

.caption span {
    border: 1px solid #fd9d34;
    border-radius: 1.3rem;
    padding: 1rem;
    background-color: #fbf8f4;
}

.caption .question{
    font-size: 3rem;
    font-weight: 700;
}

.caption .total-price{
    font-size: 4rem;
    font-weight: 700;
}

.content {
    width: 100%;
    max-height: 1505px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 9;
    padding-top: 5rem;
}

.content::-webkit-scrollbar {
    display: none;
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

.content .payment-button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 2rem 2rem;
    font-size: 2rem;
    background-color: orange;
    border-radius: 1.5rem;
    color: #413d3d;
    border-color: #ac4800;
    margin: 0 1rem;
    text-decoration: none;
    color: #fff;
    text-align: center;
    width: 300px;
    border:none;
}

.content .payment-button:active {
    background-color: rgb(206, 134, 0);
}

.content .payment-button span {
    font-weight: 700;
}

.meal-payment-types{
    margin-top:1rem
}
.meal-payment-types button{
    background-color: #fff;
    border:none;
    border-radius: 1.3rem;
    margin: 0.5rem 0
}
</style>