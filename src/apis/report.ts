import http from "./core";

export const postReportZzal = (imageId: number) => {
  return http.post<void>({ url: `/report/${imageId}` });
};
