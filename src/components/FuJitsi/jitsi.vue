<template>
  <section class="o-meetWrapper">
    <div class="o-meetWrapper__container" ref="meet"></div>
  </section>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import FractalJitsi from "../../utils/zoid";

export default defineComponent({
  name: "FuJitsi",
  setup() {
    const router = useRouter();
    const api = ref(null);
    const domain = ref("meet.jit.si");
    const meet = ref({});
    const options = reactive({
      roomName: `Conference Room ${window.xprops.roomId} live now🟢`,
      width: "100%",
      height: "100%",
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
        DEFAULT_LOGO_URL:
          "https://encrypted.fractalup.com/file/MainPublic/fractalup_assets/logo/LogoFU_head.svg",
        JITSI_WATERMARK_LINK_: "https://www.fractalup.com",
        SHOW_BRAND_WATERMARK: false,
        SHOW_JITSI_WATERMARK: false,
        HIDE_DEEP_LINKING_LOGO: true,
        SHOW_WATERMARK_FOR_GUESTS: false,
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
        window.xprops?.handleLeaveCall(2, []);
      });
    };
    return {
      meet,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./jitsi.scss";
</style>
