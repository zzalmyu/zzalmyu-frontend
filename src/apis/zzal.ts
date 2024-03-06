import http from "@/apis/core";
import { GetMyLikedZzalsResponse } from "@/types/zzal.dto";
import { GetZzalResponse } from "@/types/zzal.dto";
import { PAGINATION_LIMIT } from "@/constants/api";

export const deleteMyZzal = (imageId: number) => {
  return http.delete<number>({ url: `/v1/image/${imageId}` });
};

export const getMyLikedZzals = (offset: number) =>
  http.get<GetMyLikedZzalsResponse>({
    url: `/v1/image/like?page=${offset}&size=${PAGINATION_LIMIT}`,
  });

export const addImageLike = (imageId: number) =>
  http.post<GetZzalResponse>({
    url: `/v1/image/${imageId}/like`,
    params: {
      imageId,
    },
  });

export const removeImageLike = (imageId: number) =>
  http.post<GetZzalResponse>({
    url: `/v1/image/${imageId}/like/cancel`,
    params: {
      imageId,
    },
  });
