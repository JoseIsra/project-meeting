<template>
  <div
    class="z-top fullscreen text-white text-center q-pa-md column justify-center items-center"
    :style="{ background: '#36393f' }"
  >
    <figure v-show="logo">
      <img
        :style="{ width: '40vw', 'max-width': '300px', 'min-width': '200px' }"
        src="https://encrypted.fractalup.com/file/MainPublic/fractalup_assets/logo/logo_cooperate.svg"
        alt="logo-fractalup"
      />
    </figure>

    <div class="row items-center">
      {{ pageMessage }}
      <q-spinner-dots class="q-ml-md" size="2em" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "FuLoading",
  props: {
    logo: {
      type: Boolean,
      default: true,
    },
    closePage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const pageMessage = computed(() => {
      return props.closePage ? "Closing meeting" : "Loading";
    });
    return {
      pageMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./loading.scss";
</style>
