import { useSuspenseQuery } from "@tanstack/react-query";
import reportQueries from "./queryKeyFactories";

const useGetReportsDetails = (imageId: string) => {
  const { data: reportDetails, ...rest } = useSuspenseQuery(reportQueries.report(imageId));

  return { reportDetails, ...rest };
};

export default useGetReportsDetails;
