import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postImageLike } from "@/apis/zzal";
import { findZzal } from "@/utils/findZzal";
import { GetZzalResponse } from "@/types/zzal.dto";
import { ZzalType } from "@/types/queryKey";

export const useAddImageLike = (imageIndex: number, zzalKey: ZzalType) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => postImageLike(imageId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [zzalKey] });

      const oldData = queryClient.getQueryData<GetZzalResponse>([zzalKey]);
      const updatedData = oldData && findZzal(imageIndex, oldData, true);

      queryClient.setQueryData([zzalKey], updatedData);

      return { oldData };
    },
    onError: (error, _zzalId, context) => {
      console.error(error);
      queryClient.setQueryData([zzalKey], context?.oldData);
    },
  });

  return { addImageLike: mutate, ...rest };
};
