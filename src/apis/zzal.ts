import { GetMyLikedZzalsResponse, GetZzalDetailsResponse, GetZzalResponse } from "@/types/zzal.dto";
import http from "./core";

import { PAGINATION_LIMIT } from "@/constants/api";

export const deleteMyZzal = (imageId: number) => {
  return http.delete<number>({ url: `/v1/image/${imageId}` });
};

export const getMyLikedZzals = (offset: number) =>
  http.get<GetMyLikedZzalsResponse>({
    url: `/v1/image/like?page=${offset}&size=${PAGINATION_LIMIT}`,
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
