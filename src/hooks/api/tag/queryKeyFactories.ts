import { queryOptions } from "@tanstack/react-query";
import {
  getPopularTags,
  getSearchTag,
  getTopTagsFromHome,
  getTopTagsFromLiked,
  getTopTagsFromUploaded,
} from "@/apis/tag";

export const tagQueries = {
  all: ["tag"] as const,
  tagListKey: () => [...tagQueries.all, "tagList"] as const,
  getTagList: (tag: string) => {
    const MAX_TAG_RESPONSE_COUNT = 10;

    return queryOptions({
      queryKey: [...tagQueries.tagListKey(), tag] as const,
      queryFn: () => getSearchTag(tag),
      select: (tags) => tags.filter((_tag, index) => index < MAX_TAG_RESPONSE_COUNT),
    });
  },
  popularTagsKey: () => [...tagQueries.all, "popularTags"] as const,
  getPopularTags: () =>
    queryOptions({
      queryKey: [...tagQueries.popularTagsKey()] as const,
      queryFn: getPopularTags,
    }),
  topTagsFromHomeKey: () => [...tagQueries.all, "topTagsFromHome"] as const,
  getTopTagsFromHome: () =>
    queryOptions({
      queryKey: [...tagQueries.topTagsFromHomeKey()] as const,
      queryFn: getTopTagsFromHome,
    }),
  topTagsFromLikedKey: () => [...tagQueries.all, "topTagsFromLiked"] as const,
  getTopTagsFromLiked: () =>
    queryOptions({
      queryKey: [...tagQueries.topTagsFromLikedKey()] as const,
      queryFn: getTopTagsFromLiked,
    }),
  topTagsFromUploadedKey: () => [...tagQueries.all, "topTagsFromUploaded"] as const,
  getTopTagsFromUploaded: () =>
    queryOptions({
      queryKey: [...tagQueries.topTagsFromUploadedKey()] as const,
      queryFn: getTopTagsFromUploaded,
    }),
};
