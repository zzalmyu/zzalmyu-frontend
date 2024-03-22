import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteImageLike } from "@/apis/zzal";
import { GetZzalResponse } from "@/types/zzal.dto";
import { ZzalType } from "@/types/queryKey";
import { GetZzalDetailsResponse } from "@/types/zzal.dto";

export const useRemoveImageLike = (
  imageIndex: number,
  zzalKey: [ZzalType, string[]],
  imageId: number,
) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => deleteImageLike(imageId),
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: [...zzalKey] }),
        queryClient.cancelQueries({ queryKey: ["zzalDetails", imageId] }),
      ]);

      const zzalOldData = queryClient.getQueryData<GetZzalResponse>([...zzalKey]);
      const zzalDetailOldData = queryClient.getQueryData<GetZzalDetailsResponse>([
        "zzalDetails",
        imageId,
      ]);

      if (!zzalOldData) return;

      if (zzalDetailOldData) {
        const zzalDetailUpdatedData = JSON.parse(JSON.stringify(zzalDetailOldData));
        zzalDetailUpdatedData.imageLikeYn = false;
        queryClient.setQueryData(["zzalDetails", imageId], zzalDetailUpdatedData);
      }

      const zzalUpdatedData = JSON.parse(
        JSON.stringify({
          pageParams: [...zzalOldData.pageParams],
          pages: [...zzalOldData.pages.flatMap((page) => page)],
        }),
      );
      zzalUpdatedData.pages[imageIndex].imageLikeYn = false;
      queryClient.setQueryData([...zzalKey], zzalUpdatedData);

      return { zzalOldData, zzalDetailOldData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedZzals"] });
    },
    onError: (_error, _zzalId, context) => {
      queryClient.setQueryData([...zzalKey], context?.zzalOldData);
      if (context?.zzalDetailOldData) {
        queryClient.setQueryData(["zzalDetails", imageId], context?.zzalDetailOldData);
      }
    },
  });

  return { removeImageLike: mutate, ...rest };
};
