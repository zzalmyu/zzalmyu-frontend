export interface Report {
  imageId: number;
  lastReportAt: string;
  reportCount: number;
  tags: { tagId: number; tagName: string }[];
  // TODO: [2024.02.22] 추후에 tags 파일에서 타입 가줘오기
}
export interface ReportDetail {
  reportDate: string;
  reportUserEmail: string;
  tags?: { tagId: number; tagName: string }[];
}

export interface ReportZzal {
  imageId: number;
}
