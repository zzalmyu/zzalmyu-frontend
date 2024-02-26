import http from "@/apis/core";
import { GetTagsResponse } from "@/types/tag.dto";

export const getSearchTag = (tag: string) =>
  http.get<GetTagsResponse>({
    url: "/api/v1/tag/search",
    params: {
      input: tag,
    },
  });
