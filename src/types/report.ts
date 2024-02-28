export interface Report {
  imageId: number;
  imageTitle: string;
  lastReportAt: string;
  reportCount: number;
}
export interface ReportDetails {
  imageTitle: string;
  imageUrl: string;
  reports: ReportedAtBy[];
}

export interface ReportedAtBy {
  reportDate: string;
  reportUserEmail: string;
}
