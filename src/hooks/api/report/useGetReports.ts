import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getReports } from "@/apis/report";

const useGetReports = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["reports"],
      queryFn: ({ pageParam = 0 }) => getReports(pageParam),
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
    reports: data?.pages.flatMap((page) => page),
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    ...rest,
  };
};

export default useGetReports;
