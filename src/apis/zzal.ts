import { PostUploadZzalRequest } from "@/types/zzal.dto";
import http from "./core";

export const postUploadZzal = ({ file, dto }: PostUploadZzalRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("dto", JSON.stringify(dto));

  return http.post<PostUploadZzalRequest>({
    url: `/image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
