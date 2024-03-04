export interface PostUploadZzalRequest {
  file: File;
  tagIdList: Array<number>;
  title: string;
}

export interface GetMyLikedZzalsResponse {
  imageId: number;
  path: string;
  title: string;
}
