import { PostReportZzalRequeust } from "@/types/report.dto";
import http from "./core";

export const postReportZzal = async ({ imageId }: PostReportZzalRequeust) => {
  const response = await http.post({
    url: `/report/${imageId}`,
  });

  return response;
};
