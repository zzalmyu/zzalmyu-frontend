import { Tag } from "./tag";

export type GetTagsResponse = Tag[];

export type GetTopTagsFromUploadedResponse = Tag[];

export type GetTopTagsFromLikedResponse = Tag[];

export interface PostUsedTagResponse {
  tagId: number;
  tagName: string;
  count: number;
}
