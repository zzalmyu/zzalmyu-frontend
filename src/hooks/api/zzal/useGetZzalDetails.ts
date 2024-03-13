import { useSuspenseQuery } from "@tanstack/react-query";
import { getZzalDetails } from "@/apis/zzal";

const useGetZzalDetails = (imageId: number) => {
  const { data: zzalDetails, ...rest } = useSuspenseQuery({
    queryKey: ["zzalDetails", imageId],
    queryFn: () => getZzalDetails(imageId),
    select: (data) => ({
      isLiked: data.imageLikeYn,
      imageUrl: data.imgUrl,
      ...data,
    }),
  });
  return { zzalDetails, ...rest };
};

export default useGetZzalDetails;
