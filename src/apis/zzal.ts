import { PostUploadZzalTagRequest } from "@/types/zzal.dto";
import http from "./core";

export const postUploadZzal = ({ file, dto }: PostUploadZzalTagRequest) => {
  return http.post<PostUploadZzalTagRequest>({
    url: `/image`,
    data: { file, dto: dto.tagIdList },
  });
};
