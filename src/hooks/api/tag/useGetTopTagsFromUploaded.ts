import { useSuspenseQuery } from "@tanstack/react-query";
import { getTopTagsFromUploaded } from "@/apis/tag";

const useGetTopTagsFromUploaded = () => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["topTagsFromUploaded"],
    queryFn: getTopTagsFromUploaded,
  });

  return {
    topTags: data,
    ...rest,
  };
};

export default useGetTopTagsFromUploaded;
