import { PostUploadZzalTagRequest } from "@/types/zzal.dto";
import http from "./core";

export const postUploadZzal = ({ file, dto }: PostUploadZzalTagRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("dto", JSON.stringify(dto));

  return http.post<PostUploadZzalTagRequest>({
    url: `/image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
