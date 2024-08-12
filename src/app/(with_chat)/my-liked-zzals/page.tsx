import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMyLikedZzals } from "@/apis/zzal";
import ErrorCaughtMyLikedZzals from "./MyLikedZzals";

const MyLikedZzalsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["likedZzals", []],
    queryFn: ({ pageParam = 0 }) => getMyLikedZzals({ page: pageParam, selectedTags: [] }),
    getNextPageParam: (lastPage: unknown, _allPages: unknown, lastPageParam: number) => {
      if (!lastPage) return;

      return lastPageParam + 1;
    },
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtMyLikedZzals />
    </HydrationBoundary>
  );
};

export default MyLikedZzalsPage;
