import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import reportQueries from "./queryKeyFactories";

const useGetReports = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery(reportQueries.reports());

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
