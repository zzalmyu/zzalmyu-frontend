import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ErrorCaughtHome from "./Home";
import zzalQueries from "@/hooks/api/zzal/queryKeyFactories";
import tagQueries from "@/hooks/api/tag/queryKeyFactories";

const ExplorePage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery(zzalQueries.selectedHomeZzals([])),
    queryClient.prefetchQuery(tagQueries.topTagsFromHome()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtHome />
    </HydrationBoundary>
  );
};

export default ExplorePage;
