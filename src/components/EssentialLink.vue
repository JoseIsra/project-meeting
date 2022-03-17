<template>
  <section>
    <div id="meeto" ref="meet"></div>
  </section>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Index",
  setup() {
    const router = useRouter();
    const api = ref(null);
    const domain = ref("8x8.vc");
    const meet = ref({});
    const options = reactive({
      roomName: "FractalUp",
      width: 700,
      height: 700,
      parentNode: null,
      configOverwrite: {
        startWithAudioMuted: true,
        prejoinConfig: { enabled: true },
        toolbarButtons: [
          "camera",
          "chat",
          "desktop",
          "microphone",
          "fullscreen",
          "hangup",
          "filmstrip",
          "participants-panel",
          "raisehand",
          "tileview",
        ],
      },
      interfaceConfigOverwrite: {
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        // DEFAULT_LOGO_URL:
        //   "https://encrypted.fractalup.com/file/MainPublic/fractalup_assets/logo/LogoFU_head.svg",
        // JITSI_WATERMARK_LINK_:
        //   "https://encrypted.fractalup.com/file/MainPublic/fractalup_assets/logo/LogoFU_head.svg",
        SHOW_BRAND_WATERMARK: false,
        SHOW_JITSI_WATERMARK: false,
      },
      userInfo: {
        displayName: "",
      },
    });
    onMounted(() => {
      if (JitsiMeetExternalAPI) {
        initJitsi();
      } else {
        console.log("NO LOAD");
      }
    });
    const initJitsi = () => {
      options.parentNode = meet.value;
      api.value = new JitsiMeetExternalAPI(domain.value, options);
      api.value.addEventListener("readyToClose", function () {
        console.log("cerrando sala con router->");
        router.push({ name: "lobby" });
      });
    };
    return {
      meet,
    };
  },
});
</script>
