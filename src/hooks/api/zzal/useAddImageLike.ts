import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { addImageLike } from "@/apis/zzal";

export const useAddImageLike = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => addImageLike(imageId),
    onSuccess: () => console.log("좋아요 성공"),
    onError: () => toast.error("좋아요 요청이 실패하였습니다 다시 시도해주십시오."),
  });

  return { addImageLike: mutate, ...rest };
};
