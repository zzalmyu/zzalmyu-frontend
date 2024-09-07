import { http, HttpResponse } from "msw";
import { GetReportDetailsResponse, GetReportsResponse } from "@/types/report.dto";
import { reports } from "../data/reports";
import { zzals } from "../data/zzals";

const REPORT_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/report`;

export const reportHandlers = [
  http.get(`${REPORT_BASE_URL}`, () => HttpResponse.json<GetReportsResponse>(reports)),
  http.get(`${REPORT_BASE_URL}/:imageId`, ({ params }) => {
    const { imageId } = params;

    return HttpResponse.json<GetReportDetailsResponse>(getReport(Number(imageId)));
  }),
  http.post(`${REPORT_BASE_URL}/:imageId`, () => HttpResponse.json()),
  http.delete(`${REPORT_BASE_URL}/:imageId`, () => HttpResponse.json()),
];

const getReport = (id: number) => {
  const reportZzal = zzals.filter(({ imageId }) => imageId === id);

  return {
    imageTitle: String(reportZzal[0].imageId),
    imageUrl: reportZzal[0].path,
    reports: [
      {
        reportDate: "임시 날짜",
        reportUserEmail: "익명",
      },
    ],
  };
};
