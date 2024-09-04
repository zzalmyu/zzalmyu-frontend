import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ErrorCaughtMyLikedZzals from "./MyLikedZzals";
import zzalQueries from "@/hooks/api/zzal/queryKeyFactories";

const MyLikedZzalsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(zzalQueries.selectedMyLikedZzals([]));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtMyLikedZzals />
    </HydrationBoundary>
  );
};

export default MyLikedZzalsPage;
