import http from "./core";

export const postReportZzal = async (imageId: number) => {
  const response = await http.post<void>({
    url: `/report/${imageId}`,
  });

  return response;
};
