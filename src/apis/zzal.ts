import { GetMyLikedZzalsResponse } from "@/types/zzal.dto";
import http from "./core";
import { PAGINATION_LIMIT } from "@/constants/api";

export const getMyLikedZzals = (offset: number) =>
  http.get<GetMyLikedZzalsResponse>({
    url: `/v1/image/like?page=${offset}&size=${PAGINATION_LIMIT}`,
  });
