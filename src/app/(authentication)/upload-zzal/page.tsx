import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPopularTags } from "@/apis/tag";
import UploadZzal from "./UploadZzal";

const UploadZzalPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["popularTags"],
    queryFn: () => getPopularTags(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UploadZzal />
    </HydrationBoundary>
  );
};

export default UploadZzalPage;
