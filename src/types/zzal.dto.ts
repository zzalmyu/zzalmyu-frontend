import { Tag } from "./tag";

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
export interface GetZzalDetailsResponse {
  imageId: number;
  imageTitle: string;
  uploadUserId: number;
  imgUrl: string;
  imageLikeYn: boolean;
  tags: Tag[];
}
