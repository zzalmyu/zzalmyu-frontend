import { Tag } from "./tag";

export interface Report {
  imageId: number;
  lastReportAt: string;
  reportCount: number;
  tags: Tag[];
}
export interface ReportDetails {
  imageTitle: string;
  imageUrl: string;
  reports: ReportedAtBy[];
  tags?: Tag[];
}

export interface ReportedAtBy {
  reportDate: string;
  reportUserEmail: string;
}
