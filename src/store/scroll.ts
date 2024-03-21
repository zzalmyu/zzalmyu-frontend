import { atom } from "jotai";

export const $scrollDirection = atom<"down" | "up">("up");
