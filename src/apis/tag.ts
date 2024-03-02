import http from "@/apis/core";
import { GetTagsResponse } from "@/types/tag.dto";

export const getSearchTag = (tag: string) =>
  http.get<GetTagsResponse>({
    url: "/v1/tag/search",
    params: {
      keyword: tag,
    },
  });
