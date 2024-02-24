import { GetReportResponse } from "@/types/report.dto";
import http from "./core";

const SIZE = 10;

export const getReports = (offset: number) =>
  http.get<GetReportResponse>({ url: `/api/v1/report?page=${offset}&size=${SIZE}` });
