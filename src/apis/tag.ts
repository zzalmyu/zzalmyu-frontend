import {
  GetPopularTagsResponse,
  GetTagsResponse,
  GetTopTagsFromLikedResponse,
} from "@/types/tag.dto";
import http from "./core";

export const getPopularTags = () =>
  http.get<GetPopularTagsResponse>({
    url: `/v1/tag/popular`,
  });

export const getSearchTag = (tag: string) =>
  http.get<GetTagsResponse>({
    url: "/v1/tag/search",
    params: {
      keyword: tag,
    },
  });

export const getTopTagsFromLiked = () =>
  http.get<GetTopTagsFromLikedResponse>({
    url: "/v1/tag/me/like",
  });
