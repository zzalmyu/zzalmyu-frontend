import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getChat } from "@/apis/chat";

const useGetChat = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery({
      queryKey: ["chat"],
      queryFn: ({ pageParam = 0 }) => getChat(pageParam),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (!lastPage) return;

        return lastPageParam + 1;
      },
      initialPageParam: 0,
      refetchOnWindowFocus: false,
    });

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    messageHistory: data?.pages.flatMap((page) => page.reverse()).reverse(),
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
};

export default useGetChat;
