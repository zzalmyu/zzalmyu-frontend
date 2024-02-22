export interface Report {
  imageId: number;
  lastReportAt: string;
  reportCount: number;
  tags: { tagId: number; tagName: string }[];
}
export interface ReportDetail {
  reportDate: string;
  reportUserEmail: string;
  tags?: { tagId: number; tagName: string }[];
}
