import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postImageLike } from "@/apis/zzal";
import { GetZzalDetailsResponse } from "@/types/zzal.dto";

export const useAddImageDetailLike = (imageId: number) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => postImageLike(imageId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["zzalDetails", imageId] });

      const oldData = queryClient.getQueryData<GetZzalDetailsResponse>(["zzalDetails", imageId]);

      if (!oldData) return;

      const updatedData = JSON.parse(JSON.stringify(oldData));

      updatedData.imageLikeYn = true;

      queryClient.setQueryData(["zzalDetails", imageId], updatedData);

      return { oldData };
    },
    onError: (_error, _zzalId, context) => {
      queryClient.setQueryData(["zzalDetails", imageId], context?.oldData);
    },
  });

  return { addImageLike: mutate, ...rest };
};
