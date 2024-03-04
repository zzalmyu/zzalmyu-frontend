import { GetPopularTagsResponse } from "@/types/tag.dto";
import http from "./core";

export const getPopularTags = () => {
  return http.get<GetPopularTagsResponse[]>({
    url: `/v1/tag/popular`,
  });
};
