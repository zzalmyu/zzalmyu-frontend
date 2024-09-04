import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteImageLike } from "@/apis/zzal";
import { ZzalCardType } from "@/types/zzal";
import zzalQueries from "./queryKeyFactories";

const queryPerType = {
  liked: zzalQueries.selectedMyLikedZzals,
  home: zzalQueries.selectedHomeZzals,
  uploaded: zzalQueries.selectedMyUploadedZzals,
};

export const useRemoveImageLike = (
  imageIndex: number,
  type: ZzalCardType,
  selectedTags: string[],
  imageId: number,
) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => deleteImageLike(imageId),
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: queryPerType[type](selectedTags).queryKey }),
        queryClient.cancelQueries({ queryKey: zzalQueries.detail(imageId).queryKey }),
      ]);

      const zzalOldData = queryClient.getQueryData(queryPerType[type](selectedTags).queryKey);
      const zzalDetailOldData = queryClient.getQueryData(zzalQueries.detail(imageId).queryKey);

      if (!zzalOldData) return;

      if (zzalDetailOldData) {
        const zzalDetailUpdatedData = JSON.parse(JSON.stringify(zzalDetailOldData));
        zzalDetailUpdatedData.imageLikeYn = false;
        queryClient.setQueryData(zzalQueries.detail(imageId).queryKey, zzalDetailUpdatedData);
      }

      const zzalUpdatedData = JSON.parse(
        JSON.stringify({
          pageParams: [...zzalOldData.pageParams],
          pages: [...zzalOldData.pages.flatMap((page) => page)],
        }),
      );
      zzalUpdatedData.pages[imageIndex].imageLikeYn = false;
      queryClient.setQueryData(queryPerType[type](selectedTags).queryKey, zzalUpdatedData);

      return { zzalOldData, zzalDetailOldData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: zzalQueries.myLikedZzals() });
    },
    onError: (_error, _zzalId, context) => {
      queryClient.setQueryData(queryPerType[type](selectedTags).queryKey, context?.zzalOldData);
      if (context?.zzalDetailOldData) {
        queryClient.setQueryData(zzalQueries.detail(imageId).queryKey, context?.zzalDetailOldData);
      }
    },
  });

  return { removeImageLike: mutate, ...rest };
};
