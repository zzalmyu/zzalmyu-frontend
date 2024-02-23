import { atom } from "jotai";

export const $isChatOpen = atom(false);

export const $isMessagePeekOpen = atom(false);

export const $previewImage = atom("");

export const $setMessagePreview = atom(null, (_, set, previewImage: string) => {
  set($previewImage, previewImage);
  set($isMessagePeekOpen, true);
});

export const $deleteMessagePreview = atom(null, (_, set) => {
  set($isMessagePeekOpen, false);
  set($previewImage, "");
});
