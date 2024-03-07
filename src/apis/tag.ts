import http from "@/apis/core";
import {
  GetTagsResponse,
  GetTopTagsFromUploadedResponse,
  GetTopTagsFromLikedResponse,
  PostTagResponse,
} from "@/types/tag.dto";

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

export const postTagCreate = (tagName: string) =>
  http.post<PostTagResponse>({
    url: "/v1/tag",
    data: {
      name: tagName,
    },
  });
