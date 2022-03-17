<template>
  <div>
    <q-btn class="q-ma-lg" color="green" label="goMeet" @click="goMeet" />
    <br />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const goMeet = () => {
      void router.push({ name: "meet" });
    };
    return {
      goMeet,
    };
  },
});
</script>

<style lang="scss" scoped></style>
