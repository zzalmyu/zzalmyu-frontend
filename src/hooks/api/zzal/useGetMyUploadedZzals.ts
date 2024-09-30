import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import zzalQueries from "./queryKeyFactories";
import { $selectedTags } from "@/store/tag";

const useGetMyUploadedZzals = () => {
  const [selectedTags] = useAtom($selectedTags);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery(zzalQueries.selectedMyUploadedZzals(selectedTags));

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
