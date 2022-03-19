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
    const domain = ref("");
    const meet = ref({});
    const filteredToolbarButtons = ref([
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
    ]);

    const options = reactive({
      roomName: `Conference Room ${window.xprops.roomId} live now🟢`,
      width: "100%",
      height: "100%",
      parentNode: null,
      configOverwrite: {
        startWithAudioMuted: true,
        prejoinConfig: { enabled: true },
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
    domain.value = window.xprops.completedJitsi
      ? "jitsi.fractaluptest.xyz"
      : "meet.jit.si";

    let script = document.createElement("script");
    script.src = `https://${domain.value}/external_api.js`;
    document.body.appendChild(script);

    onMounted(() => {
      setTimeout(() => {
        if (JitsiMeetExternalAPI) {
          initJitsi();
        } else {
          console.log("NO LOAD");
        }
      }, 1000);
    });
    const initJitsi = () => {
      options.parentNode = meet.value;
      if (!window.xprops.completedJitsi) {
        options.configOverwrite.toolbarButtons = filteredToolbarButtons.value;
      }
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
