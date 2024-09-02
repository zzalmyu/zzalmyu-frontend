import { infiniteQueryOptions } from "@tanstack/react-query";
import { getChat } from "@/apis/chat";

const chatQueryKeys = {
  all: () => ["chat"],
  messages: () => [...chatQueryKeys.all(), "message"],
};

const chatQueries = {
  all: () => chatQueryKeys.all(),
  messages: () =>
    infiniteQueryOptions({
      queryKey: chatQueryKeys.messages(),
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
    }),
};

export default chatQueries;
