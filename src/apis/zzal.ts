import { PostReportZzalRequeust } from "@/types/zzal.dto";
import http from "./core";

export const postReportZzal = ({ imageId }: PostReportZzalRequeust) => {
  return http.post<PostReportZzalRequeust>({
    url: `/report/${imageId}`,
  });
};
