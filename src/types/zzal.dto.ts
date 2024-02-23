export interface PostUploadZzalTagRequest {
  file: string;
  dto: {
    tagIdList: Array<string>;
  };
}
