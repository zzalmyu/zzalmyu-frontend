import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getMyUploadedZzals } from "@/apis/zzal";
import { getTopTagsFromUploaded } from "@/apis/tag";
import ErrorCaughtMyUploadedZzals from "./MyUploadedZzals";

const MyUploadedZzalsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["uploadedZzals", []],
    queryFn: ({ pageParam = 0 }) => getMyUploadedZzals({ page: pageParam, selectedTags: [] }),
    getNextPageParam: (lastPage: unknown, _allPages: unknown, lastPageParam: number) => {
      if (!lastPage) return;

      return lastPageParam + 1;
    },
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: ["topTagsFromUploaded"],
    queryFn: () => getTopTagsFromUploaded(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtMyUploadedZzals />
    </HydrationBoundary>
  );
};

export default MyUploadedZzalsPage;
