import { useSuspenseQuery } from "@tanstack/react-query";
import tagQueries from "./queryKeyFactories";

const useGetTopTagsFromUploaded = () => {
  const { data, ...rest } = useSuspenseQuery(tagQueries.topTagsFromUploaded());

  return {
    topTags: data,
    ...rest,
  };
};

export default useGetTopTagsFromUploaded;
