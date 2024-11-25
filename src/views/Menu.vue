<template>
    <div>
        <div class="menu-view">

            <div ref="logo" class="logo">
                <Logo :width="200" />
            </div>

            <div ref="carousel" class="carousel" v-show="!impairedActive">

                <vue-carousel :data="slider" :controls="false" :slideOnSwipe="true"></vue-carousel>

            </div>

            <div class="menu">

                <div class="menu-groups">

                    <a v-for="group in groups" :key="group.id" :class="{ active: (group.id == selectedGroup.id) }"
                        @click="setSelectedGroup(group)">
                        <img :src="group.src" />
                    </a>

                </div>

                <div class="menu-details">

                    <div ref="menuCaption" class="menu-caption">

                        <div>{{ selectedGroup.name }}</div>

                    </div>

                    <div ref="menuContent" class="menu-content">

                        <a v-for="menuItem in filteredMenuItems" :key="menuItem.id"
                            @click="setSelectedProduct(menuItem)">
                            <div class="img" :style="{ 'background-image': 'url(' + menuItem.src + ')' }"></div>
                            <div class="menu-title">{{ menuItem.name }}</div>
                            <div class="menu-action">
                                <div class="menu-price">{{ menuItem.price }} TL</div>
                                <button class="btnaddToBasket">SEPETE EKLE</button>
                            </div>
                        </a>

                    </div>


                </div>

            </div>


        </div>

        <teleport to="body">
            <div class="modal-overlay" v-if="modalIsOpen">

                <div class="modal-content">

                    <div class="product">
                        <div class="product-image">
                            <img :src="selectedProduct.src" />
                        </div>
                        <div class="product-info">
                            <div class="product-name">{{ selectedProduct.name }}</div>
                            <div class="product-description">
                                <div>
                                    Onun lezzet durumu: karışık! Acıktığı an ortaya karışık bir şeyler isteyenlere
                                    kıyma, peynir ve kuşbaşı etiyle Karışık Pidem!
                                </div>
                            </div>
                            <div class="product-price">{{ selectedProduct.price }} TL</div>
                        </div>
                    </div>

                    <div class="choices">
                        <div class="caption">Pideler</div>
                        <div class="choice-products">
                            <a @click="setChoice($event)">
                                <div class="img"
                                    style="background-image: url('/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0020_PATATES_2.jpg');">
                                </div>
                                <div class="name">PATATESLİ PİDEM</div>
                                <div class="price"></div>
                            </a>

                            <a @click="setChoice($event)">
                                <div class="img"
                                    style="background-image: url('/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0014_TAVUKLU_2.jpg');">
                                </div>
                                <div class="name">TAVUKLU PİDEM</div>
                                <div class="price"></div>
                            </a>
                        </div>

                        <div class="caption">İçecekler</div>
                        <div class="choice-products">
                            <a @click="setChoice($event)">
                                <div class="img" style="background-image: url('/assets/products/cappy_visne.jpg');">
                                </div>
                                <div class="name">KUTU CAPPY VİŞNE 330 ML</div>
                                <div class="price"></div>
                            </a>

                            <a @click="setChoice($event)">
                                <div class="img"
                                    style="background-image: url('/assets/products/cappy_seftali.jpg');">
                                </div>
                                <div class="name">KUTU CAPPY ŞEFTALİ 330 ML</div>
                                <div class="price"></div>
                            </a>

                            <a @click="setChoice($event)">
                                <div class="img"
                                    style="background-image: url('/assets/products/cappy_karisik.jpg');">
                                </div>
                                <div class="name">KUTU CAPPY KARIŞIK 330 ML</div>
                                <div class="price"></div>
                            </a>

                            <a @click="setChoice($event)">
                                <div class="img" style="background-image: url('/assets/products/cocacola.jpg');">
                                </div>
                                <div class="name">COCA COLA 450 ML</div>
                                <div class="price"></div>
                            </a>

                            <a @click="setChoice($event)">
                                <div class="img" style="background-image: url('/assets/products/cocacola.jpg');">
                                </div>
                                <div class="name">COCA COLA ZERO 450 ML</div>
                                <div class="price"></div>
                            </a>
                        </div>

                        <div class="caption">Ekstra</div>
                        <div class="choice-products">
                            <a @click="setChoice($event)">
                                <div class="img" style="background-image: url('/assets/products/TURŞU.jpg');"></div>
                                <div class="name">TURŞU</div>
                                <div class="price">+10 TL</div>
                            </a>

                            <a @click="setChoice($event)">
                                <div class="img"
                                    style="background-image: url('/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0000_CORBA.jpg');">
                                </div>
                                <div class="name">ÇORBA</div>
                                <div class="price">+49 TL</div>
                            </a>
                        </div>


                    </div>

                    <div class="action">

                        <div class="buttons cancel">
                            <button @click="modalCancel">VAZGEÇ</button>
                        </div>

                        <div class="quantity-options">
                            <div class="quantity-button">
                                <button @click="setQuantityMinus">
                                    <Minus :width="65" :height="65" :fill="'#d96000'"
                                        :style="'background-color: #fff; border-radius: 100%;'" />
                                </button>
                            </div>
                            <div class="quantity">{{ selectedProduct.quantity }}</div>
                            <div class="quantity-button">
                                <button @click="setQuantityPlus">
                                    <Plus :width="65" :height="65" :fill="'#d96000'"
                                        :style="'background-color: #fff; border-radius: 100%;'" />
                                </button>
                            </div>
                        </div>

                        <div class="buttons add-to-basket">
                            <button class="step1" @click="modalAddToBasket(true)">ÖDEME YAP</button>
                            <button class="step2" @click="modalAddToBasket(false)">SEPETE EKLE</button>
                        </div>

                    </div>
                </div>

            </div>

        </teleport>

        <BottomNav :showBasket="true" />
    </div>
</template>

<style scoped>
.menu-view {
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.menu-view .menu {
    flex: 8;
    display: flex;
    flex-direction: row;
    padding-bottom: 5rem;
}

.menu-view .logo {
    flex: 1;
    background-color: #000;
    display: flex;
    justify-content: center;
}

.menu-view .logo svg {
    margin: 1rem 0;
}

.menu-view .carousel {
    flex: 2;
}



.menu-view .menu .menu-groups {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 1rem;
    justify-content: center;
}


.menu-view .menu .menu-groups img {
    width: 100%;
    border-radius: 1.3rem;
}

.menu-view .menu .menu-groups a.active img,
.menu-view .menu .menu-groups a:active img {
    box-shadow: 0px 0px 9px 3px #d96000;
}

.menu-view .menu .menu-details {
    flex: 10;
    display: flex;
    flex-direction: column;
    padding-right: 1rem;
}



.menu-view .menu .menu-details .menu-content {
    display: grid;
    justify-content: start;
    align-content: space-around;
    align-items: start;
    justify-items: center;
    gap: 1rem;
    grid-template-columns: auto auto auto;
    overflow: auto;
}

.menu-view .menu .menu-details .menu-content::-webkit-scrollbar {
    display: none;
}

body.impaired .menu-view .menu .menu-details .menu-content {
    grid-template-columns: auto auto auto auto;
}

.menu-view .menu .menu-details a {
    display: flex;
    flex-direction: column;
    max-width: 275px;
    border-radius: 1.3rem;
    border: 1px solid #b3b3b3;
    box-shadow: 0px 0px 0px 1px #c6c4c4;
}

.menu-view .menu .menu-details a .menu-title {
    background-color: #ff8500;
    font-weight: 700;
    color: #fff;
    font-size: 1.2rem;

    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    height: 70px;
    text-align: center;
    text-shadow: 1px 1px #000000;
}

.menu-view .menu .menu-details a .img {
    width: 275px;
    height: 275px;
    border-radius: 1.3rem 1.3rem 0 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

body.impaired .menu-view .menu .menu-details a .img {
    width: 200px;
    height: 200px;
}

body.impaired .menu-view .menu .menu-details a .menu-title {
    font-size: 1rem;
}

.menu-view .menu .menu-details .menu-caption div {
    font-size: 3rem;
    font-weight: 900;
    padding: 0 0 0.1rem 0;
    margin: 0 0 1rem 0;
    border-bottom: 4px solid #ff8500;
}

.menu-view .menu .menu-details a .menu-action {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
}

.menu-view .menu .menu-details a .menu-action .menu-price {
    background: url('/assets/bg/bg-price.jpg');
    color: #fff;
    font-weight: 700;
    font-size: 1.3rem;
    text-align: center;
    padding: 0.3rem 0 0 0;
    border-radius: 0 0 0 1.3rem
}

.menu-view .menu .menu-details a .menu-action .btnaddToBasket {
    border: none;
    background-color: #000;
    color: #fff;
    font-weight: 700;
    font-size: 1rem;
    padding: 0.8rem 0;
    border-radius: 0 0 1.3rem 0
}

.modal-overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-overlay .modal-content {
    background-color: #fff;
    padding: 2rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

.modal-overlay .modal-content .product {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    flex: 1;
}

.modal-overlay .modal-content .product .product-image img {
    width: 275px;
    height: auto;
    border-radius: 1.3rem;
}

.modal-overlay .modal-content .product .product-info {
    display: flex;
    flex-direction: column;
}

.modal-overlay .modal-content .product .product-name {
    font-size: 2rem;
    font-weight: 700;
    color: #ff8500;
}

.modal-overlay .modal-content .product .product-description div {
    color: rgb(19, 19, 17);
    border: 1px solid #fd9d34;
    border-radius: 1.3rem;
    padding: 1rem;
    font-size: 1.6rem;
    background-color: #fbf8f4;
    margin: 1rem 0;
    text-align: justify;
}


.modal-overlay .modal-content .product .product-price {
    font-size: 2rem;
    font-weight: 700;
    color: #ff8500;
    text-align: right;
}

.modal-overlay .modal-content .action {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: rgb(233, 152, 3);
    border-radius: 1.3rem;
    margin-top: 1rem;
    flex: 1;
}

.modal-overlay .modal-content .action .quantity-options {
    display: flex;
    margin: 0.6rem 1rem 0.3rem 1rem;
}

.modal-overlay .modal-content .action .quantity-options .quantity-button button {
    border: none;
    padding: 0;
    background-color: transparent;
}

.modal-overlay .modal-content .action .quantity-options .quantity-button button:active {
    opacity: 0.8;
}

.modal-overlay .modal-content .action .quantity-options .quantity {
    font-size: 2.3rem;
    color: #fff;
    font-weight: 700;
    padding: 0 1rem;
}

.modal-overlay .modal-content .action .buttons {
    display: flex;
}

.modal-overlay .modal-content .action .buttons button {
    border: none;
    background-color: #d96000;
    color: #fff;
    font-weight: 700;
    font-size: 1.5rem;
    padding: 1rem;
    width: 200px;
}

.modal-overlay .modal-content .action .buttons.cancel button {
    border-radius: 1.3rem 0 0 1.3rem;

}

.modal-overlay .modal-content .action .buttons.add-to-basket .step1 {
    border-radius: 0;
    background-color: #49b35a;

}

.modal-overlay .modal-content .action .buttons.add-to-basket .step2 {
    border-radius: 0 1.3rem 1.3rem 0;
}

.modal-overlay .modal-content .action .buttons button:active {
    opacity: 0.8;
}


.modal-overlay .modal-content .choices {
    display: flex;
    flex-direction: column;
    flex: 17;
}



.modal-overlay .modal-content .choices .caption {
    color: #d96000;
    font-size: 2rem;
    font-weight: 700;
    margin: 0.5rem 0 1rem 0;
    border-bottom: 4px solid #ff8500;

}

.modal-overlay .modal-content a {
    display: flex;
    flex-direction: column;
    background-color: #f3f1f1;
    border-radius: 1.3rem;
    padding: 1rem;
    border: 2px solid #f3f1f1;
    align-items: center;
}

.modal-overlay .modal-content a.selected {
    background-color: #ebeaea;
    border-color: #fd7f18;
}

.modal-overlay .modal-content .choices .choice-products {
    display: grid;
    gap: 1rem;
    margin: 0 0 1rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}

.modal-overlay .modal-content .choices .choice-products .img {
    width: 130px;
    height: 130px;
    border-radius: 1.3rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.modal-overlay .modal-content .choices .choice-products .name {
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
}

.modal-overlay .modal-content .choices .choice-products .price {
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
}
</style>

<script setup>
import BottomNav from '../components/BottomNav.vue'
import Logo from '../components/icons/Logo.vue'
import Minus from '../components/icons/Minus.vue'
import Plus from '../components/icons/Plus.vue'
import { ref, onMounted, watch, computed } from 'vue'
import VueCarousel from '@chenfengyuan/vue-carousel';
import { useApplicationStore } from '@/stores/application'
import { storeToRefs } from 'pinia'

const applicationStore = useApplicationStore();

const { impairedActive } = storeToRefs(applicationStore)
const { addToBasket } = applicationStore;

import { useRouter } from 'vue-router'

const router = useRouter()


const selectedGroup = ref({ id: 0, name: "" });
const selectedProduct = ref({ id: 0, name: "", quantity: 1 });

const modalIsOpen = ref(false);

const slider = ref([
    '<div class="example-slide"><img src="/assets/slider/slider1.jpg" style="height:auto; width:100%;" /></div>',
    '<div class="example-slide"><img src="/assets/slider/slider2.jpg" style="height:auto; width:100%;"  /></div>'
]);

const groups = ref(
    [
        { "id": 2, "name": "pideler", src: "/assets/groups/mp-pideler-banner.jpg" },
        { "id": 1, "name": "tüm ürünler", src: "/assets/groups/mp-tum-urunler-banner.jpg" },
        { "id": 3, "name": "fırsatlar", src: "/assets/groups/mp-firsatlar-banner.jpg" }
    ]
);

const menuItems = ref(
    [{
        "id": 1,
        "groupIds": [1, 2],
        "name": "PATATESLİ PİDEM",
        "price": 77,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0020_PATATES_2.jpg"
    }, {
        "id": 2,
        "groupIds": [1, 2],
        "name": "LAHMACUN",
        "price": 79,
        "src": "/assets/products/lahmacun.jpg"
    }, {
        "id": 3,
        "groupIds": [1, 2],
        "name": "TAVUKLU PATATESLİM",
        "price": 119,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0018_TAVUKLU_PATATESLIM.jpg"
    }, {
        "id": 4,
        "groupIds": [1, 2],
        "name": "KIYMALI PATATESLİM",
        "price": 125,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0016_KIYMA_PATATES_2.jpg"
    }, {
        "id": 5,
        "groupIds": [1, 2],
        "name": "TAVUKLU PİDEM",
        "price": 135,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0014_TAVUKLU_2.jpg"
    }, {
        "id": 6,
        "groupIds": [1, 2],
        "name": "PEYNİRLİ PİDEM",
        "price": 159,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0012_PEYNIRLI_2.jpg"
    }, {
        "id": 7,
        "groupIds": [1, 2],
        "name": "KIYMALI PİDEM",
        "price": 159,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0010_KIYMALI_2.jpg"
    }, {
        "id": 8,
        "groupIds": [1, 2],
        "name": "SUCUKLU ŞAHANEM",
        "price": 165,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0008_SUCUKLU_SAHANE_2.jpg"
    }, {
        "id": 9,
        "groupIds": [1, 2],
        "name": "KARIŞIK PİDEM",
        "price": 169,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0006_KARISIK_2.jpg"
    }, {
        "id": 10,
        "groupIds": [1, 2],
        "name": "KUŞBAŞILI PİDEM",
        "price": 179,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0004_KUSBASI_2.jpg"
    }, {
        "id": 11,
        "groupIds": [1, 2],
        "name": "KUŞBAŞILI PEYNİRLİM",
        "price": 189,
        "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0002_KUSBASI_PEYNIR_2.jpg"
    },
    { "id": 12, "groupIds": [1, 3], "name": "PATATESLİ MENÜM", "price": 87, "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0021_PATATES_1.jpg" },
    { "id": 13, "groupIds": [1, 3], "name": "LAHMACUN MENÜM", "price": 99, "src": "/assets/products/lahmacun_menu_24234.jpg" },
    { "id": 14, "groupIds": [1, 3], "name": "TAVUKLU PATATESLİ MENÜM", "price": 129, "src": "/assets/products/TAVUKLU-PATATESLI-MENUM.jpg" },
    { "id": 15, "groupIds": [1, 3], "name": "KIYMALI PATATESLİ MENÜM", "price": 135, "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0017_KIYMA_PATATES_1.jpg" },
    { "id": 16, "groupIds": [1, 3], "name": "TAVUKLU MENÜM", "price": 145, "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0015_TAVUKLU_1.jpg" },
    { "id": 17, "groupIds": [1, 3], "name": "KARIŞIK 2LİM", "price": 220, "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0019_KARISIK_IKILIM.jpg" },
    { "id": 18, "groupIds": [1, 3], "name": "ETSEVER 2LİM", "price": 290, "src": "/assets/products/yeni_WEB_BANNER_TUM_URUNLER_0001_ETSEVER_IKILIM.jpg" },
    { "id": 19, "groupIds": [1], "name": "İLAVE LAHMACUN GARNİTÜRÜ", "price": 7, "src": "/assets/products/garnitur.jpg" },
    { "id": 20, "groupIds": [1], "name": "TURŞU", "price": 10, "src": "/assets/products/TURŞU.jpg" },
    { "id": 21, "groupIds": [1], "name": "ÇORBA", "price": 49, "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_0000_CORBA.jpg" },
    { "id": 22, "groupIds": [1], "name": "SÜTLAÇ", "price": 59, "src": "/assets/products/Trendyol-web-sutlac-2024-1000x1000px.jpg" },
    { "id": 23, "groupIds": [1], "name": "KÜNEFE", "price": 69, "src": "/assets/products/kunefe.jpg" },
    { "id": 24, "groupIds": [1], "name": "ÇAY", "price": 10, "src": "/assets/products/PIDEM_WEB_BANNER_TUM_URUNLER_BARDAK.jpg" },
    { "id": 25, "groupIds": [1], "name": "SU", "price": 15, "src": "/assets/products/yenisu.jpg" },
    { "id": 26, "groupIds": [1], "name": "SODA", "price": 25, "src": "/assets/products/soda.jpg" },
    { "id": 27, "groupIds": [1], "name": "FANTA 450 ML", "price": 39, "src": "/assets/products/fanta-fuse.jpg" },
    { "id": 28, "groupIds": [1], "name": "FUSE TEA ŞEFTALİ 450 ML", "price": 35, "src": "/assets/products/cocacola.jpg" },
    { "id": 29, "groupIds": [1], "name": "AYRAN 285 ML", "price": 35, "src": "/assets/products/ayran-pidem.jpg" },
    { "id": 30, "groupIds": [1], "name": "COCA COLA 450 ML", "price": 39, "src": "/assets/products/cocacola.jpg" },
    { "id": 31, "groupIds": [1], "name": "COCA COLA ZERO 450 ML", "price": 39, "src": "/assets/products/cocacola.jpg" },
    { "id": 32, "groupIds": [1], "name": "KUTU CAPPY KARIŞIK 330 ML", "price": 39, "src": "/assets/products/cappy_karisik.jpg" },
    { "id": 33, "groupIds": [1], "name": "KUTU CAPPY ŞEFTALİ 330 ML", "price": 39, "src": "/assets/products/cappy_seftali.jpg" },
    { "id": 34, "groupIds": [1], "name": "KUTU CAPPY VİŞNE 330 ML", "price": 39, "src": "/assets/products/cappy_visne.jpg" }

    ]
);

const filteredMenuItems = computed(() => {

    return menuItems.value.filter(x => x.groupIds.includes(selectedGroup.value.id))

});

const logo = ref(null)
const carousel = ref(null)
const menuCaption = ref(null)
const menuContent = ref(null)
const totalHeight = ref(0)

onMounted(() => {

    const firstGroup = groups.value[0];

    setSelectedGroup(firstGroup);

    setTimeout(function () { calculateHeights() }, 100);

})

watch(impairedActive, () => {
    setTimeout(function () { calculateHeights() }, 500);
});


const setSelectedGroup = (group) => {

    selectedGroup.value = group;

    menuContent.value.scrollTop = 0;

};

const setQuantityMinus = () => {
    if (selectedProduct.value.quantity > 1)
        selectedProduct.value.quantity--;
}

const setQuantityPlus = () => {
    if (selectedProduct.value.quantity > 0)
        selectedProduct.value.quantity++;
}

const setSelectedProduct = (product) => {
    selectedProduct.value = product;
    selectedProduct.value.quantity = 1;

    modalIsOpen.value = true;
};

const modalAddToBasket = (withGoPayment) => {

    addToBasket(selectedProduct.value);

    modalIsOpen.value = false;

    if (withGoPayment)
        goPayment();

}

const goPayment = () => {

    router.push({ name: 'payment' });

};

const modalCancel = () => {
    modalIsOpen.value = false;
}

const setChoice = (event) => {
    if (event.target.nodeName == 'A') {
        event.target.classList.toggle('selected');
    }
    else {
        event.target.parentNode.classList.toggle('selected');
    }
}


const calculateHeights = () => {

    if (logo.value && carousel.value && menuCaption.value) {

        const app = document.getElementById('app');
        var appStyle = app.currentStyle || window.getComputedStyle(app);

        const appMarginTop = parseFloat(appStyle.marginTop.replace('px', ''));

        const bottomNav = document.getElementById('bottom-nav');
        var bottomNavStyle = bottomNav.currentStyle || window.getComputedStyle(bottomNav);

        const bottomNavHeight = parseFloat(bottomNavStyle.height.replace('px', ''));

        const logoHeight = logo.value.clientHeight;
        const carouselHeight = carousel.value.clientHeight;
        const menuCaptionHeight = menuCaption.value.clientHeight;

        totalHeight.value = logoHeight + carouselHeight + menuCaptionHeight + bottomNavHeight + appMarginTop + 20;

        menuContent.value.style = "height: calc(100vh - " + totalHeight.value + "px)";
    }
}

</script>