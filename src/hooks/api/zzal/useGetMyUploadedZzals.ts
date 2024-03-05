import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getMyUploadedZzals } from "@/apis/zzal";

const useGetMyUploadedZzals = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["uploadedZzals"],
      queryFn: ({ pageParam = 0 }) => getMyUploadedZzals(pageParam),
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

export default useGetMyUploadedZzals;
