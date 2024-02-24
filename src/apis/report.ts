import { GetReportsResponse, GetReportDetailsResponse } from "@/types/report.dto";
import http from "./core";

const SIZE = 10;

export const getReports = (offset: number) =>
  http.get<GetReportsResponse>({ url: `/api/v1/report?page=${offset}&size=${SIZE}` });

export const getReportDetails = (imageId: string) =>
  http.get<GetReportDetailsResponse>({ url: `/api/v1/report/${imageId}` });
