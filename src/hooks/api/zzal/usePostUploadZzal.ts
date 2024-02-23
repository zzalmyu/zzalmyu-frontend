import { useMutation } from "@tanstack/react-query";
import { postUploadZzal } from "@/apis/zzal";

const usePostUploadZzal = () => {
  const mutation = useMutation({
    mutationFn: ({ file, dto }: { file: string; dto: { tagIdList: Array<string> } }) =>
      postUploadZzal({ file, dto }),
    onSuccess: () => console.log("postUploadZzal success"),
    onError: () => console.log("postUploadZzal error"),
  });

  return mutation;
};

export default usePostUploadZzal;
