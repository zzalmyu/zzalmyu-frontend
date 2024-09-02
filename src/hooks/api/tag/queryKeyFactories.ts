import { queryOptions } from "@tanstack/react-query";
import {
  getPopularTags,
  getSearchTag,
  getTopTagsFromHome,
  getTopTagsFromLiked,
  getTopTagsFromUploaded,
} from "@/apis/tag";

const tagQueries = {
  all: () => ["tags"],
  searchResults: () => [...tagQueries.all(), "search"],
  searchResult: (tag: string) => {
    const MAX_TAG_RESPONSE_COUNT = 10;

    return queryOptions({
      queryKey: [...tagQueries.searchResults(), tag],
      queryFn: () => getSearchTag(tag),
      select: (tags) => tags.filter((_tag, index) => index < MAX_TAG_RESPONSE_COUNT),
    });
  },
  popularTags: () =>
    queryOptions({
      queryKey: [...tagQueries.all(), "popularTags"],
      queryFn: getPopularTags,
    }),
  topTags: () => [...tagQueries.all(), "topTags"],
  topTagsFromHome: () =>
    queryOptions({
      queryKey: [...tagQueries.topTags(), "home"],
      queryFn: getTopTagsFromHome,
    }),
  topTagsFromLiked: () =>
    queryOptions({
      queryKey: [...tagQueries.topTags(), "liked"],
      queryFn: getTopTagsFromLiked,
    }),
  topTagsFromUploaded: () =>
    queryOptions({
      queryKey: [...tagQueries.topTags(), "uploaded"],
      queryFn: getTopTagsFromUploaded,
    }),
};

export default tagQueries;
