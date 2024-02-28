import { useMutation } from "@tanstack/react-query";
import { postReportZzal } from "@/apis/report";

const usePostReportZzal = () => {
  const { mutate: reportZzal } = useMutation({
    mutationFn: postReportZzal,
  });

  return reportZzal;
};

export default usePostReportZzal;
