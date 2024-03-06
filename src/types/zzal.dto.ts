export interface GetMyLikedZzalsResponse {
  imageId: number;
  path: string;
  title: string;
}

export interface GetZzalResponse {
  pageParams: number[];
  pages: GetZzalPagesResponse[][];
}

export interface GetZzalPagesResponse {
  imageId: number;
  title: string;
  path: string;
  imageLikeYn: boolean;
}
