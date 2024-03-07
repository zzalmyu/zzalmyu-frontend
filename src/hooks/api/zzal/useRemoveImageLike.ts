import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteImageLike } from "@/apis/zzal";
import { findZzal } from "@/utils/findZzal";
import { GetZzalResponse } from "@/types/zzal.dto";
import { ZzalType } from "@/types/queryKey";

export const useRemoveImageLike = (imageIndex: number, zzalKey: ZzalType) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => deleteImageLike(imageId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [zzalKey] });

      const oldData = queryClient.getQueryData<GetZzalResponse>([zzalKey]) as GetZzalResponse;
      const updatedData = findZzal(imageIndex, oldData);

      queryClient.setQueryData([zzalKey], updatedData);

      return { oldData };
    },
    onError: (error, _, rollback) => {
      console.error(error);
      queryClient.setQueryData([zzalKey], rollback?.oldData);
    },
  });

  return { removeImageLike: mutate, ...rest };
};
