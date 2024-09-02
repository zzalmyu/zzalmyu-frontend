import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getReportDetails, getReports } from "@/apis/report";

const reportQueryKeys = {
  all: () => ["report"],
  reports: () => [reportQueryKeys.all(), "list"],
  report: (imageId: string) => [reportQueryKeys.reports(), imageId],
};

const reportQueries = {
  all: () => reportQueryKeys.all(),
  reports: () =>
    infiniteQueryOptions({
      queryKey: reportQueryKeys.reports(),
      queryFn: ({ pageParam = 0 }) => getReports(pageParam),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
    }),
  report: (imageId: string) =>
    queryOptions({
      queryKey: reportQueryKeys.report(imageId),
      queryFn: () => getReportDetails(imageId),
    }),
};

export default reportQueries;
