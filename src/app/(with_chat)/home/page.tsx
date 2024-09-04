import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ErrorCaughtHome from "./Home";
import zzalQueries from "@/hooks/api/zzal/queryKeyFactories";

const ExplorePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(zzalQueries.selectedHomeZzals([]));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtHome />
    </HydrationBoundary>
  );
};

export default ExplorePage;
