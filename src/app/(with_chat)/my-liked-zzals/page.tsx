import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ErrorCaughtMyLikedZzals from "./MyLikedZzals";
import zzalQueries from "@/hooks/api/zzal/queryKeyFactories";
import tagQueries from "@/hooks/api/tag/queryKeyFactories";

const MyLikedZzalsPage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery(zzalQueries.selectedMyLikedZzals([])),
    queryClient.prefetchQuery(tagQueries.topTagsFromLiked()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtMyLikedZzals />
    </HydrationBoundary>
  );
};

export default MyLikedZzalsPage;
