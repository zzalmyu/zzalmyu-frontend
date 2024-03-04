import { GetPopularTagsResponse, GetTagsResponse } from "@/types/tag.dto";
import http from "./core";

export const getPopularTags = () => {
  return http.get<GetPopularTagsResponse[]>({
    url: `/v1/tag/popular`,
  });
};

export const getSearchTag = (tag: string) =>
  http.get<GetTagsResponse>({
    url: "/v1/tag/search",
    params: {
      keyword: tag,
    },
  });
