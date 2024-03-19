import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteImageLike } from "@/apis/zzal";
import { GetZzalDetailsResponse } from "@/types/zzal.dto";

export const useRemoveImageDetailLike = (imageId: number) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => deleteImageLike(imageId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["zzalDetails", imageId] });

      const oldData = queryClient.getQueryData<GetZzalDetailsResponse>(["zzalDetails", imageId]);

      if (!oldData) return;

      const updatedData = JSON.parse(JSON.stringify(oldData));

      updatedData.imageLikeYn = false;

      queryClient.setQueryData(["zzalDetails", imageId], updatedData);

      return { oldData };
    },
    onError: (_error, _zzalId, context) => {
      queryClient.setQueryData(["zzalDetails", imageId], context?.oldData);
    },
  });

  return { removeImageLike: mutate, ...rest };
};
