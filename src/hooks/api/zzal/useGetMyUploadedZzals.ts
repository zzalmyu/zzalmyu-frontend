import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { getMyUploadedZzals } from "@/apis/zzal";
import { $selectedTags } from "@/store/tag";

const useGetMyUploadedZzals = () => {
  const [selectedTags] = useAtom($selectedTags);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["uploadedZzals", selectedTags],
      queryFn: ({ pageParam = 0 }) => getMyUploadedZzals({ page: pageParam, selectedTags }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
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

export default useGetMyUploadedZzals;
