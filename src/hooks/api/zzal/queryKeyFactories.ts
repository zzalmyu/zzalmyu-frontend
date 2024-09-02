import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getHomeZzals, getMyLikedZzals, getMyUploadedZzals, getZzalDetails } from "@/apis/zzal";

const zzalQueryKeys = {
  all: () => ["zzal"],
  details: () => [...zzalQueryKeys.all(), "detail"],
  detail: (imageId: number) => [...zzalQueryKeys.details(), imageId],
  homeZzals: () => [...zzalQueryKeys.all(), "home"],
  selectedHomeZzals: (selectedTags: string[]) => [...zzalQueryKeys.homeZzals(), selectedTags],
  myLikedZzals: () => [...zzalQueryKeys.all(), "liked"],
  selectedMyLikedZzals: (selectedTags: string[]) => [...zzalQueryKeys.myLikedZzals(), selectedTags],
  myUploadedZzals: () => [...zzalQueryKeys.all(), "uploaded"],
  selectedMyUploadedZzals: (selectedTags: string[]) => [
    ...zzalQueryKeys.myUploadedZzals(),
    selectedTags,
  ],
};

const zzalQueries = {
  all: () => zzalQueryKeys.all(),
  details: () => zzalQueryKeys.details(),
  detail: (imageId: number) =>
    queryOptions({
      queryKey: zzalQueryKeys.detail(imageId),
      queryFn: () => getZzalDetails(imageId),
      select: (data) => ({
        isLiked: data.imageLikeYn,
        imageUrl: data.imgUrl,
        tagNames: data.tags.map((tag) => tag.tagName),
        ...data,
      }),
    }),
  homeZzals: () => zzalQueryKeys.homeZzals(),
  selectedHomeZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: zzalQueryKeys.selectedHomeZzals(selectedTags),
      queryFn: ({ pageParam = 0 }) => getHomeZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  myLikedZzals: () => zzalQueryKeys.myLikedZzals(),
  selectedMyLikedZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: zzalQueryKeys.selectedMyLikedZzals(selectedTags),
      queryFn: ({ pageParam = 0 }) => getMyLikedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  myUploadedZzals: () => zzalQueryKeys.myUploadedZzals(),
  selectedMyUploadedZzals: (selectedTags: string[]) =>
    infiniteQueryOptions({
      queryKey: zzalQueryKeys.selectedMyUploadedZzals(selectedTags),
      queryFn: ({ pageParam = 0 }) => getMyUploadedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
};

export default zzalQueries;
