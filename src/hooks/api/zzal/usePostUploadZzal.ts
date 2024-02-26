import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { postUploadZzal } from "@/apis/zzal";
import { $previewUrl } from "@/store/zzal";
import { $selectedTags } from "@/store/tag";

const usePostUploadZzal = () => {
  const [, setPreviewUrl] = useAtom($previewUrl);
  const [, setSelectedTags] = useAtom($selectedTags);

  const mutation = useMutation({
    mutationFn: postUploadZzal,
    onSuccess: () => {
      console.log("postUploadZzal success"), setPreviewUrl(null), setSelectedTags([]);
    },
    onError: () => console.log(`postUploadZzal error.`),
  });

  return mutation;
};

export default usePostUploadZzal;
