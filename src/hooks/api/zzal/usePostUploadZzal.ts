import { useMutation } from "@tanstack/react-query";
import { postUploadZzal } from "@/apis/zzal";

const usePostUploadZzal = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: postUploadZzal,
  });

  return { uploadZzal: mutate, ...rest };
};

export default usePostUploadZzal;
