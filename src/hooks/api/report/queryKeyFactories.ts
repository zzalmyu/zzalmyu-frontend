import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getReportDetails, getReports } from "@/apis/report";

export const reportQueries = {
  all: () => ["report"],
  reports: () =>
    infiniteQueryOptions({
      queryKey: [...reportQueries.all(), "report"],
      queryFn: ({ pageParam = 0 }) => getReports(pageParam),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  report: (imageId: string) =>
    queryOptions({
      queryKey: [...reportQueries.reports().queryKey, imageId],
      queryFn: () => getReportDetails(imageId),
    }),
};
