<template>
  <div
    class="fullscreen text-white text-center q-pa-md column justify-center items-center"
    :style="{ background: '#36393f' }"
  >
    <figure>
      <img
        :style="{ width: '40vw', 'max-width': '300px', 'min-width': '200px' }"
        src="https://encrypted.fractalup.com/file/MainPublic/fractalup_assets/logo/logo_cooperate.svg"
        alt="logo-fractalup"
      />
    </figure>

    <div class="row items-center">
      Loading
      <q-spinner-dots class="q-ml-md" size="2em" />
    </div>
  </div>
</template>

<script>
export default {
  name: "FuLoading",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "./loading.scss";
</style>
