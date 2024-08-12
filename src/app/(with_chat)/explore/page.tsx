import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getHomeZzals } from "@/apis/zzal";
import ErrorCaughtExplore from "./Explore";

const ExplorePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["homeZzals", []],
    queryFn: ({ pageParam = 0 }) => getHomeZzals({ page: pageParam, selectedTags: [] }),
    getNextPageParam: (lastPage: unknown, _allPages: unknown, lastPageParam: number) => {
      if (!lastPage) return;

      return lastPageParam + 1;
    },
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtExplore />
    </HydrationBoundary>
  );
};

export default ExplorePage;
