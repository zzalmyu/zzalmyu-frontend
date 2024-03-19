import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getHomeZzals } from "@/apis/zzal";
import { $selectedTags } from "@/store/tag";

const useGetHomeZzlas = () => {
  const [selectedTags] = useAtom($selectedTags);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["homeZzals", selectedTags],
      queryFn: ({ pageParam = 0 }) => getHomeZzals({ page: pageParam, selectedTags }),
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
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleFetchNextPage,
    ...rest,
  };
};

export default useGetHomeZzlas;
