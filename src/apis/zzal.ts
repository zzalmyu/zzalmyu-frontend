import { GetMyLikedZzalsResponse } from "@/types/zzal.dto";
import http from "./core";

const SIZE = 10;

export const getMyLikedZzals = (offset: number) =>
  http.get<GetMyLikedZzalsResponse>({ url: `/image/like?page=${offset}&size=${SIZE}` });
