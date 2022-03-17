<template>
  <div>otra ruta</div>
  <q-btn label="volver" @click="goback" />
</template>

<script>
import { defineComponent } from "vue";

import { useRouter } from "vue-router";

export default defineComponent({
  name: "Test",
  setup() {
    const router = useRouter();
    const goback = () => {
      void router.push({ name: "lobby" });
    };
    return {
      goback,
    };
  },
});
</script>
