import { ref } from "vue";

const roomName = ref("");

export function useRoom() {
  const setRoomName = (name) => {
    roomName.value = name;
  };
  return {
    roomName,
    setRoomName,
  };
}
