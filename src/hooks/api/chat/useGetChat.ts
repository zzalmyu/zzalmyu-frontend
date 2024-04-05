import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getChat } from "@/apis/chat";

const useGetChat = () => {
  const { data, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["chat"],
      queryFn: async ({ pageParam = 0 }) => await getChat(pageParam),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage.length === 0) return;

        return lastPageParam + 1;
      },
      select: (data) => ({
        pages: [...data.pages].reverse(),
        pageParams: [...data.pageParams],
      }),
      initialPageParam: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  console.log(data, isFetchingNextPage, isFetching);
  return {
    messageHistory: data?.pages.flatMap((page) => page),
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
};

export default useGetChat;
