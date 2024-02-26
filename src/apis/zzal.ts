import { PostUploadZzalRequest } from "@/types/zzal.dto";
import http from "./core";

export const postUploadZzal = ({ file, tagIdList, title }: PostUploadZzalRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("tagIdList", tagIdList.join(","));
  formData.append("title", title);

  return http.post<PostUploadZzalRequest>({
    url: `/image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
