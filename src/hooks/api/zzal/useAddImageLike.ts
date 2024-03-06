import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addImageLike } from "@/apis/zzal";
import { GetZzalResponse } from "@/types/zzal.dto";
import { PAGINATION_LIMIT } from "@/constants/api";

export const useAddImageLike = (imageIndex: number, queryKey: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => addImageLike(imageId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [queryKey] });

      const masonryRowIndex = Math.floor(imageIndex / PAGINATION_LIMIT);
      const masonryColumnIndex = imageIndex % PAGINATION_LIMIT;
      const oldData = queryClient.getQueryData<GetZzalResponse>([queryKey]) as GetZzalResponse;

      const updatedData = { ...oldData };

      updatedData.pages[masonryRowIndex][masonryColumnIndex] = {
        ...updatedData.pages[masonryRowIndex][masonryColumnIndex],
        imageLikeYn: true,
      };

      queryClient.setQueryData([queryKey], updatedData);

      return { oldData };
    },
    onError: (error, _, rollback) => {
      console.error(error);
      queryClient.setQueryData([queryKey], rollback?.oldData);
    },
  });

  return { addImageLike: mutate, ...rest };
};
