<template>

    <div class="payment">

        <div class="logo">
            <Logo :width="200" />
        </div>


        <div class="selector-1">


            <div class="waiting-animation">

                <DotLottieVue style="height: 900px; width: 900px" autoplay :data="PaymentSuccess" />
            </div>

            <div class="waiting">
                SİPARİŞ NUMARASI
                <br />
                <span>5754</span>
            </div>

            <div>
                <button @click="goIntro" class="go-intro">ANA EKRANA DÖN</button>
            </div>

        </div>



    </div>
</template>

<script setup>
import PaymentSuccess from '../assets/img/payment-success.json'
import Logo from '../components/icons/Logo.vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

import { onMounted } from 'vue'
import { useApplicationStore } from '@/stores/application'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const applicationStore = useApplicationStore();

const { orderCancelConfirmOk } = applicationStore;

onMounted(() => {

    setTimeout(function () {

        goIntro();

    }, 10 * 1000)

})


const goIntro = () => {

    orderCancelConfirmOk();
    router.push({ name: 'intro' });

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

.waiting span {
    font-size: 6rem;
    font-weight: 900;
}

.waiting-animation {
    margin-top: -10rem;
}

button.go-intro {
    padding: 2rem 3rem;
    font-size: 2rem;
    font-weight: 700;
    background-color: #fff;
    border-radius: 1.5rem;
    color: orange;
    border-color: orange;
}

button.go-intro:active {
    background-color: orange;
    color: #fff;
}
</style>