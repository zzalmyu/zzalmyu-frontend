import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getReportDetails, getReports } from "@/apis/report";

export const reportQueries = {
  all: () => ["report"] as const,
  reportListKey: () => [...reportQueries.all(), "reportList"] as const,
  getReportList: () =>
    infiniteQueryOptions({
      queryKey: [...reportQueries.reportListKey()] as const,
      queryFn: ({ pageParam = 0 }) => getReports(pageParam),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  reportDetailKey: () => [...reportQueries.all(), "reportDetail"] as const,
  getReportDetail: (imageId: string) =>
    queryOptions({
      queryKey: [...reportQueries.reportDetailKey(), imageId],
      queryFn: () => getReportDetails(imageId),
    }),
};
