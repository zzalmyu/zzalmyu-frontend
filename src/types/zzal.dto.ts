export interface PostUploadZzalTagRequest {
  file: File;
  dto: {
    tagIdList: Array<number>;
    title: string;
  };
}
