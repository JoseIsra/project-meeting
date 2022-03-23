<template>
  <section
    class="a-endingPage z-top fullscreen text-white text-center q-pa-md column justify-center items-center"
  >
    <div class="a-endingPage__content">
      <h5>¿Quieres finalizar la llamada?</h5>
    </div>
    <div class="a-endingPage__actions q-px-sm row items-center justify-around">
      <q-btn
        dense
        class="a-endingPage__btn --accept q-py-sm"
        color="white"
        text-color="black"
        label="Sí"
        @click="endingMeeting"
      />
      <q-btn
        dense
        class="a-endingPage__btn --cancel q-py-sm"
        label="No"
        color="black"
        @click="noEndingMeeting"
      />
    </div>
  </section>
</template>

<script>
export default {
  setup(_, { emit }) {
    const noEndingMeeting = () => {
      emit("ending-meeting");
    };

    const endingMeeting = () => {
      emit("no-ending-meeting");
    };

    return {
      endingMeeting,
      noEndingMeeting,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./endingPage.scss";
</style>
