import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getMyLikedZzals } from "@/apis/zzal";

const useGetMyLikedZzals = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["likedZzals"],
      queryFn: ({ pageParam = 0 }) => getMyLikedZzals(pageParam),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    });

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    zzals: data?.pages.flatMap((page) => page),
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    ...rest,
  };
};

export default useGetMyLikedZzals;
