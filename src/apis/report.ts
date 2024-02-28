import { PostReportZzalRequeust } from "@/types/report.dto";
import http from "./core";

export const postReportZzal = ({ imageId }: PostReportZzalRequeust) => {
  return http.post<PostReportZzalRequeust>({
    url: `/report/${imageId}`,
  });
};
