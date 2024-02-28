export interface Report {
  imageId: number;
  imageTitle: string;
  lastReportAt: string;
  reportCount: number;
}
export interface ReportDetails {
  imageTitle: string;
  imageUrl: string;
  reports: ReportByUser[];
}

export interface ReportByUser {
  reportDate: string;
  reportUserEmail: string;
}
