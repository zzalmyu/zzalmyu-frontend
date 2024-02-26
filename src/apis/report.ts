import { GetReportsResponse, GetReportDetailsResponse } from "@/types/report.dto";
import http from "./core";

const REPORTS_THRESHOLD = 10;

export const getReports = (offset: number) =>
  http.get<GetReportsResponse>({ url: `/v1/report?page=${offset}&size=${REPORTS_THRESHOLD}` });

export const getReportDetails = (imageId: string) =>
  http.get<GetReportDetailsResponse>({ url: `/v1/report/${imageId}` });

export const deleteReportedImage = (imageId: string) =>
  http.delete<number>({ url: `/v1/report/${imageId}` });
