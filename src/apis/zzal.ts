import { PostUploadZzalRequest, GetMyLikedZzalsResponse } from "@/types/zzal.dto";
import http from "./core";

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

const SIZE = 10;

export const getMyLikedZzals = (offset: number) =>
  http.get<GetMyLikedZzalsResponse>({ url: `v1/image/like?page=${offset}&size=${SIZE}` });
