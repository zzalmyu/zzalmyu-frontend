import { GetZzalResponse } from "@/types/zzal.dto";
import { PAGINATION_LIMIT } from "@/constants/api";

export const findZzal = (imageIndex: number, oldData: GetZzalResponse, isLiked: boolean) => {
  const masonryRowIndex = Math.floor(imageIndex / PAGINATION_LIMIT);
  const masonryColumnIndex = imageIndex % PAGINATION_LIMIT;

  const updatedData = { ...oldData };

  updatedData.pages[masonryRowIndex][masonryColumnIndex] = {
    ...updatedData.pages[masonryRowIndex][masonryColumnIndex],
    imageLikeYn: isLiked,
  };

  return updatedData;
};
