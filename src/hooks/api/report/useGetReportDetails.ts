import { useSuspenseQuery } from "@tanstack/react-query";
import { getReportDetails } from "@/apis/report";

const useGetReportsDetails = (imageId: string) => {
  const { data: reportDetails, ...rest } = useSuspenseQuery({
    queryKey: ["reportDetails", imageId],
    queryFn: () => getReportDetails(imageId),
  });

  return { reportDetails, ...rest };
};

export default useGetReportsDetails;
