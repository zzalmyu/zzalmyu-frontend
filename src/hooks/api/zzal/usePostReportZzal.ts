import { useMutation } from "@tanstack/react-query";
import { postReportZzal } from "@/apis/zzal";

const usePostReportZzal = () => {
  const mutation = useMutation({
    mutationFn: postReportZzal,
    onSuccess: () => console.log("postReportZzal success"),
    onError: () => console.log("postReportZzal error"),
  });

  return mutation;
};

export default usePostReportZzal;
