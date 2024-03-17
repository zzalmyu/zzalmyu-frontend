import { Tag } from "./tag";

export type GetTagsResponse = Tag[];

export type GetPopularTagsResponse = Tag[];

export type GetTopTagsFromHomeResponse = Tag[];

export type GetTopTagsFromUploadedResponse = Tag[];

export type GetTopTagsFromLikedResponse = Tag[];

export interface PostUsedTagResponse {
  tagId: number;
  tagName: string;
  count: number;
}
