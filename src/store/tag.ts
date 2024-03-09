import { atom } from "jotai";
import { Tag } from "@/types/tag";

export const $selectedTags = atom<string[]>([]);

export const $recommendedTags = atom<Tag[]>([]);
