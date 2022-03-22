<template>
  <section class="o-meetWrapper">
    <fu-loading
      v-if="loading || showClosePage"
      :logo="showLogo"
      :closePage="showClosePage"
    />
    <div
      class="o-meetWrapper__container"
      ref="meet"
      :style="heightObjectStyle"
    ></div>
  </section>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import FuLoading from "../FuLoading";
import FractalJitsi from "../../utils/zoid";

export default defineComponent({
  name: "FuJitsi",
  components: { FuLoading },
  setup() {
    const router = useRouter();
    const api = ref(null);
    const domain = ref("");
    const meet = ref({});
    const loading = ref(true);
    const showLogo = window.xprops.completedJitsi;
    const showClosePage = ref(false);
    let vh = ref(window.innerHeight * 0.01);
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
        MOBILE_APP_PROMO: false,
      },
    });

    const handleDeviceHeight = () => {
      vh.value = window.innerHeight * 0.01;
    };

    // domain.value = true ? "jitsi.fractaluptest.xyz" : "meet.jit.si";
    domain.value = window.xprops.completedJitsi
      ? "jitsi.fractaluptest.xyz"
      : "meet.jit.si";

    const heightObjectStyle = computed(() => ({
      "--vh": String(vh.value) + "px",
    }));

    let script = document.createElement("script");
    script.src = `https://${domain.value}/external_api.js`;
    document.body.appendChild(script);

    onMounted(() => {
      window.addEventListener("resize", handleDeviceHeight);
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
      setTimeout(() => {
        loading.value = false;
      }, 1300);

      api.value.addEventListener("videoConferenceLeft", function () {
        showClosePage.value = true;
        window.xprops?.handleLeaveCall(2, []);
      });
      // api.value.addEventListener("readyToClose", function () {
      //   window.xprops?.handleLeaveCall(2, []);
      // });
    };

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleDeviceHeight);
    });

    return {
      meet,
      loading,
      showLogo,
      showClosePage,
      heightObjectStyle,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./jitsi.scss";
</style>
