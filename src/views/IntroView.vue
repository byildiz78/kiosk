<template>
  <div class="view-intro">

    <RouterLink to="/order-type-selection">

      <video autoplay muted loop>
        <source src="/assets/video/intro.mp4" type="video/mp4">
      </video>

    </RouterLink>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

import { onMounted } from 'vue'
import { useApplicationStore } from '@/stores/application'

const applicationStore = useApplicationStore();
const { orderCancelConfirmOk } = applicationStore;

onMounted(() => {

  orderCancelConfirmOk();

})

</script>

<style scoped>
video {
  height: 100vh;
  width: 100%;
  object-fit: fill;
  position: absolute;
}
</style>