import http from "./core";

export const deleteMyZzal = (imageId: number) => {
  return http.delete<number>({ url: `/v1/image/${imageId}` });
};
