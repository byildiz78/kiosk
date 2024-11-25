<template>
    <div class="order-type-selector-view">

        <div class="logo">
            <Logo :width="200" />
        </div>


        <div class="selector-0">


        </div>


        <div class="selector-1">

            <span>SİPARİŞ TÜRÜ SEÇİNİZ</span>

        </div>


        <div class="selector-2">

            <a @click="goDineIn">

                <DineIn :width="170" :fill="'#fff'" />
                <span>BURADA<br />YİYECEĞİM</span>

            </a>

            <a @click="goTakeAway">

                <TakeAway :width="170" :fill="'#fff'" />
                <span>PAKET<br />YAPTIRACAĞIM</span>

            </a>


        </div>

        <div class="selector-3">

            <button class="qr-action">QR Göster, İndirim Kazan !</button>

        </div>

    </div>
    <BottomNav />
</template>

<style scoped>
.order-type-selector-view {
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.order-type-selector-view .logo {
    flex: 1;
    background-color: #000;
    display: flex;
    justify-content: center;
}

.order-type-selector-view .logo svg {
    margin: 1rem 0;
}

.order-type-selector-view .selector-0 {
    flex: 2;
}

.order-type-selector-view .selector-1 {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.order-type-selector-view .selector-1 span {
    font-weight: 900;
    font-size: 2.5rem;
    color: orange;
}

.order-type-selector-view .selector-2 {
    flex: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid orange
}

.order-type-selector-view .selector-2 a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 2rem 2rem;
    font-size: 2rem;
    font-weight: 700;
    background-color: orange;
    border-radius: 1.5rem;
    color: #413d3d;
    border-color: #ac4800;
    margin: 0 1rem;
    text-decoration: none;
    color: #fff;
    text-align: center;
    width: 300px;
}

.order-type-selector-view .selector-2 a:active {
    background-color: rgb(206, 134, 0);
}

.order-type-selector-view .selector-2 a span {
    font-weight: 600;
}

.order-type-selector-view .selector-3 {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: start;
}


button.qr-action {
    padding: 2rem 3rem;
    font-size: 2rem;
    font-weight: 700;
    background-color: #fff;
    border-radius: 1.5rem;
    color: orange;
    border-color: orange;
}

button.qr-action:active {
    background-color: orange;
    color: #fff;
}
</style>

<script setup>
import BottomNav from '../components/BottomNav.vue'
import Logo from '../components/icons/Logo.vue'
import DineIn from '../components/icons/DineIn.vue'
import TakeAway from '../components/icons/TakeAway.vue'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const goDineIn = () => {

    router.push({ name: 'menu', query: { orderType: 'DineIn' } });

};

const goTakeAway = () => {

    router.push({ name: 'menu', query: { orderType: 'TakeAway' } });

};

</script>