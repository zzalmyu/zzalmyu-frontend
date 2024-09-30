import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import chatQueries from "./queryKeyFactories";

const useGetChat = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, ...rest } =
    useSuspenseInfiniteQuery(chatQueries.messages());

  const handleFetchNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    messageHistory: data?.pages.flatMap((page) => page),
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
};

export default useGetChat;
