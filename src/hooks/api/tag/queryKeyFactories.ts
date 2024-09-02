import { queryOptions } from "@tanstack/react-query";
import {
  getPopularTags,
  getSearchTag,
  getTopTagsFromHome,
  getTopTagsFromLiked,
  getTopTagsFromUploaded,
} from "@/apis/tag";

const tagQueryKeys = {
  all: () => ["tags"],
  searchResults: () => [...tagQueryKeys.all(), "search"],
  searchResult: (tag: string) => [...tagQueryKeys.searchResults(), tag],
  popularTags: () => [...tagQueryKeys.all(), "popularTags"],
  topTags: () => [...tagQueryKeys.all(), "topTags"],
  topTagsFromHome: () => [...tagQueryKeys.topTags(), "home"],
  topTagsFromLiked: () => [...tagQueryKeys.topTags(), "liked"],
  topTagsFromUploaded: () => [...tagQueryKeys.topTags(), "uploaded"],
};

const tagQueries = {
  all: () => tagQueryKeys.all(),
  searchResults: () => tagQueryKeys.searchResults(),
  searchResult: (tag: string) => {
    const MAX_TAG_RESPONSE_COUNT = 10;

    return queryOptions({
      queryKey: tagQueryKeys.searchResult(tag),
      queryFn: () => getSearchTag(tag),
      select: (tags) => tags.filter((_tag, index) => index < MAX_TAG_RESPONSE_COUNT),
    });
  },
  popularTags: () =>
    queryOptions({
      queryKey: tagQueryKeys.popularTags(),
      queryFn: getPopularTags,
    }),
  topTags: () => tagQueryKeys.topTags(),
  topTagsFromHome: () =>
    queryOptions({
      queryKey: tagQueryKeys.topTagsFromHome(),
      queryFn: getTopTagsFromHome,
    }),
  topTagsFromLiked: () =>
    queryOptions({
      queryKey: tagQueryKeys.topTagsFromLiked(),
      queryFn: getTopTagsFromLiked,
    }),
  topTagsFromUploaded: () =>
    queryOptions({
      queryKey: tagQueryKeys.topTagsFromUploaded(),
      queryFn: getTopTagsFromUploaded,
    }),
};

export default tagQueries;
