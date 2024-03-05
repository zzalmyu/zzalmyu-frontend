import { GetMyLikedZzalsResponse, GetMyUploadedZzalsResponse } from "@/types/zzal.dto";
import http from "./core";
import { PAGINATION_LIMIT } from "@/constants/api";

export const deleteMyZzal = (imageId: number) => {
  return http.delete<number>({ url: `/v1/image/${imageId}` });
};

export const getMyLikedZzals = (page: number) =>
  http.get<GetMyLikedZzalsResponse>({
    url: `/v1/image/like?page=${page}&size=${PAGINATION_LIMIT}`,
  });

export const getMyUploadedZzals = (page: number) =>
  http.get<GetMyUploadedZzalsResponse>({
    url: `/v1/image/upload?page=${page}&size=${PAGINATION_LIMIT}`,
  });
