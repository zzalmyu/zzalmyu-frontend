import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postUploadZzal } from "@/apis/zzal";

interface Props {
  file: File;
  tagIdList: Array<number>;
  title: string;
}

const usePostUploadZzal = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ file, tagIdList, title }: Props) => postUploadZzal({ file, tagIdList, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadedZzals"] });
    },
  });

  return { uploadZzal: mutate, ...rest };
};

export default usePostUploadZzal;
