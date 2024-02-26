export interface PostUploadZzalRequest {
  file: File;
  dto: {
    tagIdList: Array<number>;
    title: string;
  };
}
