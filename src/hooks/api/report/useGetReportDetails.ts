import { useQuery } from "@tanstack/react-query";
import { getReportDetails } from "@/apis/report";

const useGetReportsDetails = (imageId: string) => {
  const {
    data: reportDetails,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reportDetails", imageId],
    queryFn: () => getReportDetails(imageId),
  });

  return { reportDetails, isLoading, isError };
};

export default useGetReportsDetails;
