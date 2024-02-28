import { GetReportsResponse, GetReportDetailsResponse } from "@/types/report.dto";
import http from "./core";
import { PAGINATION_LIMIT } from "@/constants/api";

export const getReports = (page: number) =>
  http.get<GetReportsResponse>({ url: `/v1/report?page=${page}&size=${PAGINATION_LIMIT}` });

export const getReportDetails = (imageId: string) =>
  http.get<GetReportDetailsResponse>({ url: `/v1/report/${imageId}` });

export const deleteReportedImage = (imageId: string) =>
  http.delete({ url: `/v1/report/${imageId}` });
