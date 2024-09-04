import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ErrorCaughtMyUploadedZzals from "./MyUploadedZzals";
import zzalQueries from "@/hooks/api/zzal/queryKeyFactories";
import tagQueries from "@/hooks/api/tag/queryKeyFactories";

const MyUploadedZzalsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(zzalQueries.selectedMyUploadedZzals([]));
  await queryClient.prefetchQuery(tagQueries.topTagsFromUploaded());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtMyUploadedZzals />
    </HydrationBoundary>
  );
};

export default MyUploadedZzalsPage;
