import {
  PostUploadZzalRequest,
  GetMyLikedZzalsResponse,
  GetMyUploadedZzalsResponse,
  GetZzalDetailsResponse,
  GetZzalResponse,
  GetMyLikedZzalsRequest,
} from "@/types/zzal.dto";
import http from "./core";
import { PAGINATION_LIMIT } from "@/constants/api";

export const postUploadZzal = ({ file, tagIdList, title }: PostUploadZzalRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tagIdList", tagIdList.join(","));
  formData.append("title", title);

  return http.post<PostUploadZzalRequest>({
    url: `/v1/image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteMyZzal = (imageId: number) => {
  return http.delete<number>({ url: `/v1/image/${imageId}` });
};

export const getMyLikedZzals = ({ page, selectedTags }: GetMyLikedZzalsRequest) =>
  http.get<GetMyLikedZzalsResponse>({
    url: `/v1/image/like?page=${page}&size=${PAGINATION_LIMIT}`,
    params: {
      tagName: selectedTags.join(","),
    },
  });

export const getMyUploadedZzals = (page: number) =>
  http.get<GetMyUploadedZzalsResponse>({
    url: `/v1/image/upload?page=${page}&size=${PAGINATION_LIMIT}`,
  });

export const getZzalDetails = (imageId: number) =>
  http.get<GetZzalDetailsResponse>({ url: `/v1/image/${imageId}` });

export const postImageLike = (imageId: number) =>
  http.post<GetZzalResponse>({
    url: `/v1/image/${imageId}/like`,
    params: {
      imageId,
    },
  });

export const deleteImageLike = (imageId: number) =>
  http.post<GetZzalResponse>({
    url: `/v1/image/${imageId}/like/cancel`,
    params: {
      imageId,
    },
  });
