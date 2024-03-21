import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postImageLike } from "@/apis/zzal";
import { GetZzalResponse } from "@/types/zzal.dto";
import { ZzalType } from "@/types/queryKey";
import { GetZzalDetailsResponse } from "@/types/zzal.dto";

export const useAddImageLike = (
  imageIndex: number,
  zzalKey: [ZzalType, string[]],
  imageId: number,
) => {
  const zzalQueryClient = useQueryClient();
  const zzalDetailQueryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => postImageLike(imageId),
    onMutate: async () => {
      await Promise.all([
        zzalQueryClient.cancelQueries({ queryKey: [...zzalKey] }),
        zzalDetailQueryClient.cancelQueries({ queryKey: ["zzalDetails", imageId] }),
      ]);

      const zzalOldData = zzalQueryClient.getQueryData<GetZzalResponse>([...zzalKey]);
      const zzalDetailOldData = zzalDetailQueryClient.getQueryData<GetZzalDetailsResponse>([
        "zzalDetails",
        imageId,
      ]);

      if (!zzalOldData) return;

      if (zzalDetailOldData) {
        const zzalDetailUpdatedData = JSON.parse(JSON.stringify(zzalDetailOldData));
        zzalDetailUpdatedData.imageLikeYn = true;
        zzalDetailQueryClient.setQueryData(["zzalDetails", imageId], zzalDetailUpdatedData);
      }

      const zzalUpdatedData = JSON.parse(
        JSON.stringify({
          pageParams: [...zzalOldData.pageParams],
          pages: [...zzalOldData.pages.flatMap((page) => page)],
        }),
      );
      zzalUpdatedData.pages[imageIndex].imageLikeYn = true;
      zzalQueryClient.setQueryData([...zzalKey], zzalUpdatedData);

      return { zzalOldData, zzalDetailOldData };
    },
    onError: (_error, _zzalId, context) => {
      zzalQueryClient.setQueryData([...zzalKey], context?.zzalOldData);
      if (context?.zzalDetailOldData) {
        zzalDetailQueryClient.setQueryData(["zzalDetails", imageId], context?.zzalDetailOldData);
      }
    },
  });

  return { addImageLike: mutate, ...rest };
};
