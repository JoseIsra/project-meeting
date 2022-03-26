<template>
  <section class="o-meetWrapper">
    <fu-loading
      v-if="loading || showClosePage"
      :logo="showLogo"
      :closePage="showClosePage"
    />
    <fu-ending-page
      v-if="showEndingPage"
      @ending-meeting="handleEndingMeeting"
      @no-ending-meeting="handleNoEndingMeeting"
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
import FuEndingPage from "../FuEndingPage";
import FractalJitsi from "../../utils/zoid";

export default defineComponent({
  name: "FuJitsi",
  components: {
    FuLoading,
    FuEndingPage,
  },
  setup() {
    const router = useRouter();
    const api = ref(null);
    const domain = ref("");
    const meet = ref({});
    const loading = ref(true);
    const showLogo = window.xprops.completedJitsi;
    const showClosePage = ref(false);
    let vh = ref(window.innerHeight * 0.01);
    const isModerator = window.xprops.moderator;
    const showEndingPage = ref(false);
    const userNameZoid = window.xprops.userName;
    const filteredToolbarButtons = ref([
      "camera",
      "chat",
      "desktop",
      "microphone",
      "fullscreen",
      "hangup",
      "filmstrip",
      "raisehand",
      "tileview",
      "participants-pane",
    ]);
    const complexToolbarButtons = ref([
      "camera",
      "chat",
      "closedcaptions",
      "desktop",
      "download",
      "etherpad",
      "filmstrip",
      "fullscreen",
      "hangup",
      "highlight",
      "microphone",
      "mute-everyone",
      "mute-video-everyone",
      "profile",
      "raisehand",
      "select-background",
      "shortcuts",
      "stats",
      "tileview",
      "toggle-camera",
      "participants-pane",
    ]);

    const options = reactive({
      roomName: `Conference Room ${window.xprops.roomId} live now🟢`,
      // roomName: `Conference Room  live now🟢`,
      width: "100%",
      height: "100%",
      parentNode: null,
      lang: "es-PE",
      userInfo: {
        displayName: userNameZoid,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        prejoinConfig: { enabled: true },
        disableDeepLinking: true,
        defaultLanguage: "es-PE",
        disablePolls: true,
        remoteVideoMenu: {
          disableGrantModerator: true,
          disablePrivateChat: true,
          disableKick: true,
        },
        hideAddRoomButton: true,
        toolbarButtons: complexToolbarButtons.value,
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

    const handleNoEndingMeeting = () => {
      showEndingPage.value = false;
      showClosePage.value = true;
      window.xprops?.handleParticipantLeave();
    };

    const handleEndingMeeting = () => {
      showEndingPage.value = false;
      showClosePage.value = true;
      window.xprops?.handleLeaveCall(2, []);
    };

    const initJitsi = () => {
      options.parentNode = meet.value;
      if (!window.xprops.completedJitsi) {
        options.configOverwrite.toolbarButtons = filteredToolbarButtons.value;
      } else if (isModerator) {
        options.configOverwrite.toolbarButtons = [
          ...complexToolbarButtons.value,
          "sharevideo",
          "shareaudio",
        ];
      }
      api.value = new JitsiMeetExternalAPI(domain.value, options);
      setTimeout(() => {
        loading.value = false;
      }, 1300);

      api.value.addEventListener("videoConferenceLeft", function () {
        if (!isModerator || !window.xprops.completedJitsi) {
          showClosePage.value = true;
          window.xprops?.handleParticipantLeave();
        } else {
          showEndingPage.value = true;
        }
      });
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
      showEndingPage,
      handleNoEndingMeeting,
      handleEndingMeeting,
    };
  },
});
</script>
<style lang="scss" scoped>
@import "./jitsi.scss";
</style>
