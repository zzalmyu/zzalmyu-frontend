import { useSuspenseQuery } from "@tanstack/react-query";
import { getTopTagsFromHome } from "@/apis/tag";

const useGetTopTagsFromHome = () => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["topTagsFromHome"],
    queryFn: getTopTagsFromHome,
  });

  return {
    topTags: data,
    ...rest,
  };
};
export default useGetTopTagsFromHome;
