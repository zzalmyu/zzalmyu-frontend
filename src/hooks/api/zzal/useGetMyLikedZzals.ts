import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getMyLikedZzals } from "@/apis/zzal";

const useGetMyLikedZzals = () => {
  const { data } = useSuspenseInfiniteQuery({
    queryKey: ["likedZzals"],
    queryFn: ({ pageParam = 0 }) => getMyLikedZzals(pageParam),
    getNextPageParam: () => {
      return 0;
    },
    initialPageParam: 0,
  });

  return { zzals: data?.pages.flatMap((page) => page) };
};

export default useGetMyLikedZzals;
