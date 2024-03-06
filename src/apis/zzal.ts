import http from "@/apis/core";
import { GetMyLikedZzalsResponse, GetZzalsResponse } from "@/types/zzal.dto";
import { PAGINATION_LIMIT } from "@/constants/api";

export const getAllZzal = () =>
  http.get<GetZzalsResponse[]>({
    url: "/v1/image/all",
    params: {
      page: 0,
      size: 10,
    },
  });

export const addImageLike = (imageId: number) =>
  http.post<void>({
    url: `/v1/image/${imageId}/like`,
    params: {
      imageId,
    },
  });

export const deleteMyZzal = (imageId: number) => {
  return http.delete<number>({ url: `/v1/image/${imageId}` });
};

export const getMyLikedZzals = (offset: number) =>
  http.get<GetMyLikedZzalsResponse>({
    url: `/v1/image/like?page=${offset}&size=${PAGINATION_LIMIT}`,
  });
