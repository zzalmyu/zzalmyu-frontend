import { Tag } from "./tag";

export interface Report {
  imageId: number;
  lastReportAt: string;
  reportCount: number;
  tags: Tag[];
}
export interface ReportDetail {
  imageTitle: string;
  imageUrl: string;
  reportDate: string;
  reportUserEmail: string;
  tags?: Tag[];
}
