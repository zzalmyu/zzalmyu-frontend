import {
  GetPopularTagsResponse,
  GetTagsResponse,
  GetTopTagsFromUploadedResponse,
  GetTopTagsFromLikedResponse,
  PostUsedTagResponse,
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

export const getTopTagsFromUploaded = () =>
  http.get<GetTopTagsFromUploadedResponse>({
    url: "/v1/tag/me/upload",
  });

export const getTopTagsFromLiked = () =>
  http.get<GetTopTagsFromLikedResponse>({
    url: "/v1/tag/me/like",
  });

export const postUsedTag = (tagName: string) =>
  http.post<PostUsedTagResponse>({
    url: "/v1/tag/use",
    data: {
      name: tagName,
    },
  });
