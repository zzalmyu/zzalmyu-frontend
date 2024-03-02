import http from "@/apis/core";
import { GetZzalsResponse } from "@/types/zzals.dto";

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
