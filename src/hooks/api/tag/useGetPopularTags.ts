import { useQuery } from "@tanstack/react-query";
import { getPopularTags } from "@/apis/tag";

const useGetPopularTags = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["popularTags"],
    queryFn: getPopularTags,
  });

  return {
    popularTags: data || [],
    ...rest,
  };
};

export default useGetPopularTags;
