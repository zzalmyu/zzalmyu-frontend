import { atom } from "jotai";

export const $isChatOpen = atom(false);

export const $peekState = atom({
  src: "",
  isOpen: false,
});
