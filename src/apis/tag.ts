import http from "@/apis/core";
import { GetTagsResponse, GetTopTagsFromLiked } from "@/types/tag.dto";

export const getSearchTag = (tag: string) =>
  http.get<GetTagsResponse>({
    url: "/v1/tag/search",
    params: {
      keyword: tag,
    },
  });

export const getTopTagsFromLiked = () =>
  http.get<GetTopTagsFromLiked>({
    url: "/v1/tag/me/like",
  });
