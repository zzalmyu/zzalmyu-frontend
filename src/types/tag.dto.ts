import { Tag } from "./tag";

export type GetTagsResponse = Tag[];

export type GetTopTagsFromUploadedResponse = Tag[];

export type GetTopTagsFromLikedResponse = Tag[];

export interface PostTagResponse {
  tagId: number;
  tagName: string;
  count: number;
}
