import { atom } from "jotai";

export const $isChatOpen = atom(false);

export const $isMessagePeekOpen = atom(false);

export const $previewImage = atom("");

export const $setMessagePreview = atom(null, (_get, set, previewImage: string) => {
  set($previewImage, previewImage);
  set($isMessagePeekOpen, true);
  set($isChatOpen, true);
});

export const $deleteMessagePreview = atom(null, (_get, set) => {
  set($isMessagePeekOpen, false);
  set($previewImage, "");
});
