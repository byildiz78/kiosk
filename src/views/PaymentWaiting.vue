<template>

    <div class="payment">

        <div class="logo">
            <Logo :width="200" />
        </div>


        <div class="selector-1">


            <div class="waiting-animation">
                <img src="/assets/img/pay-animation.gif" />
            </div>

            <div class="waiting">
                ÖDEME BEKLENİYOR
            </div>

        </div>



    </div>
</template>

<script setup>
import Logo from '../components/icons/Logo.vue'


import { onMounted } from 'vue'
import { useApplicationStore } from '@/stores/application'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const applicationStore = useApplicationStore();

const { basket } = storeToRefs(applicationStore)

const { updateBasketTotals, removeBasketItem } = applicationStore;

onMounted(()=>{

    setTimeout(function(){

        goPaymentSuccess();

    }, 2000)

})

const goPaymentSuccess = () => {

    router.push({ name: 'payment-success' });

};

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
    justify-content: center;
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


.waiting {
    color: #d96000;
    margin: 0.5rem 0 0.5rem 0;
    width: 100%;
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
}

.waiting-animation {
    margin-top: -10rem;
}
</style>