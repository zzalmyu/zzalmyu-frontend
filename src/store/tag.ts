import { atom } from "jotai";
import { Tag, TagUpload } from "@/types/tag";

export const $selectedTags = atom<string[]>([]);

export const $recommendedTags = atom<Tag[]>([]);

export const $selectedTagsUpload = atom<TagUpload[]>([]);
