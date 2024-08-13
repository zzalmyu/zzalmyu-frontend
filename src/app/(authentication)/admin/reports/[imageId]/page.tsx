import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getReportDetails } from "@/apis/report";
import ErrorCaughtAdminImageDetail from "./AdminImageDetail";
interface Props {
  params: {
    imageId: string;
  };
}

const AdminImageDetailPage = async ({ params }: Props) => {
  const { imageId } = params || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["reportDetails", imageId],
    queryFn: () => getReportDetails(imageId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorCaughtAdminImageDetail imageId={imageId} />
    </HydrationBoundary>
  );
};

export default AdminImageDetailPage;
