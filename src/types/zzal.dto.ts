import { TagDetail } from "./tag";

export interface GetMyLikedZzalsResponse {
  imageId: number;
  path: string;
  title: string;
}

export interface GetZzalDetailsResponse {
  imageId: number;
  imageTitle: string;
  uploadUserId: number;
  imgUrl: string;
  imageLikeYn: boolean;
  tags: TagDetail[];
}
