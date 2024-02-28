import { useMutation } from "@tanstack/react-query";
import { postReportZzal } from "@/apis/report";

const usePostReportZzal = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: postReportZzal,
  });

  return { reportZzal: mutate, ...rest };
};

export default usePostReportZzal;
