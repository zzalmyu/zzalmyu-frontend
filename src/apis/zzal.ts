import { GetMyLikedZzalsResponse } from "@/types/zzal.dto";
import http from "./core";

const SIZE = 10;

export const getMyLikedZzals = (offset: number) =>
  http.get<GetMyLikedZzalsResponse>({ url: `/image/like?offset=${offset}&size=${SIZE}` });
