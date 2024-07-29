import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getHomeZzals, getMyLikedZzals, getMyUploadedZzals, getZzalDetails } from "@/apis/zzal";

export const zzalQueries = {
  all: ["zzal"] as const,
  zzalDetailKey: () => [...zzalQueries.all, "zzalDetails"] as const,
  getZzalDetail: (imageId: number) =>
    queryOptions({
      queryKey: [...zzalQueries.zzalDetailKey(), imageId] as const,
      queryFn: () => getZzalDetails(imageId),
      select: (data) => ({
        isLiked: data.imageLikeYn,
        imageUrl: data.imgUrl,
        tagNames: data.tags.map((tag) => tag.tagName),
        ...data,
      }),
    }),
  homeZzalsKey: () => [...zzalQueries.all, "homeZzals"] as const,
  getHomeZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: [...zzalQueries.homeZzalsKey(), selectedTags] as const,
      queryFn: ({ pageParam = 0 }) => getHomeZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  myLikedZzalsKey: () => [...zzalQueries.all, "likedZzals"] as const,
  getMyLikedZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: [...zzalQueries.myLikedZzalsKey(), selectedTags] as const,
      queryFn: ({ pageParam = 0 }) => getMyLikedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  myUploadedZzalsKey: () => [...zzalQueries.all, "uploadedZzals"] as const,
  getMyUploadedZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: [...zzalQueries.myUploadedZzalsKey(), selectedTags] as const,
      queryFn: ({ pageParam = 0 }) => getMyUploadedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
};
