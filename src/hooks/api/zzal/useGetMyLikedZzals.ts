import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getMyLikedZzals } from "@/apis/zzal";
import { $selectedTags } from "@/store/tag";

const useGetMyLikedZzals = () => {
  const [selectedTags] = useAtom($selectedTags);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["likedZzals", selectedTags],
      queryFn: ({ pageParam = 0 }) => getMyLikedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
      refetchOnMount: false,
    });

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    zzals: data?.pages.flatMap((page) => page),
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    ...rest,
  };
};

export default useGetMyLikedZzals;
