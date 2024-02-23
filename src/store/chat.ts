import { atom } from "jotai";

export const $isChatOpen = atom(false);

export const $isPeekOpen = atom(false);

export const $previewImage = atom("");

export const $setMessagePreview = atom(null, (_, set, previewImage: string) => {
  set($previewImage, previewImage);
  set($isPeekOpen, true);
});

export const $deleteMessagePreview = atom(null, (_, set) => {
  set($isPeekOpen, false);
  set($previewImage, "");
});
