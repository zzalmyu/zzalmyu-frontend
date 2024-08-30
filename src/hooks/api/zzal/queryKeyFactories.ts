import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getHomeZzals, getMyLikedZzals, getMyUploadedZzals, getZzalDetails } from "@/apis/zzal";

export const zzalQueries = {
  all: () => ["zzal"],
  details: () => [...zzalQueries.all(), "detail"],
  detail: (imageId: number) =>
    queryOptions({
      queryKey: [...zzalQueries.details(), imageId],
      queryFn: () => getZzalDetails(imageId),
      select: (data) => ({
        isLiked: data.imageLikeYn,
        imageUrl: data.imgUrl,
        tagNames: data.tags.map((tag) => tag.tagName),
        ...data,
      }),
    }),
  homeZzals: () => [...zzalQueries.all(), "home"],
  selectedHomeZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: [...zzalQueries.homeZzals(), selectedTags],
      queryFn: ({ pageParam = 0 }) => getHomeZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  myLikedZzals: () => [...zzalQueries.all(), "liked"],
  selectedMyLikedZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: [...zzalQueries.myLikedZzals(), selectedTags],
      queryFn: ({ pageParam = 0 }) => getMyLikedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  myUploadedZzals: () => [...zzalQueries.all(), "uploaded"],
  selectedMyUploadedZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: [...zzalQueries.myUploadedZzals(), selectedTags],
      queryFn: ({ pageParam = 0 }) => getMyUploadedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
};
