import { http, HttpResponse } from "msw";
import {
  GetPopularTagsResponse,
  GetTagsResponse,
  GetTopTagsFromHomeResponse,
  GetTopTagsFromLikedResponse,
  GetTopTagsFromUploadedResponse,
} from "@/types/tag.dto";
import { Tag } from "@/types/tag";
import { MockTags } from "@/mocks/data/tags";

const TAG_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/tag`;

export const TagHandlers = [
  http.get(`${TAG_BASE_URL}/popular`, () =>
    HttpResponse.json<GetPopularTagsResponse>(getPopularTags(MockTags)),
  ),
  http.get(`${TAG_BASE_URL}/search`, async ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get("keyword") as string;

    return HttpResponse.json<GetTagsResponse>(getSearchTag(keyword));
  }),
  http.get(TAG_BASE_URL, () => HttpResponse.json<GetTopTagsFromHomeResponse>(getTogTags(MockTags))),
  http.get(`${TAG_BASE_URL}/me/upload`, () =>
    HttpResponse.json<GetTopTagsFromUploadedResponse>(getTogTags(MockTags)),
  ),
  http.get(`${TAG_BASE_URL}/me/like`, () =>
    HttpResponse.json<GetTopTagsFromLikedResponse>(getTogTags(MockTags)),
  ),
  http.post(TAG_BASE_URL, async ({ request }) => {
    const data = await request.json();
    const { name } = data as { name: string };
    const isExistedTag = MockTags.some(({ tagName }) => tagName === name);

    if (isExistedTag) return;

    MockTags.push({
      tagId: MockTags.length + 1,
      tagName: name,
      count: 1,
    });
  }),
  http.post(`${TAG_BASE_URL}/use`, async ({ request }) => {
    const data = await request.json();
    const { name } = data as { name: string };

    MockTags.forEach(({ tagName }, index) => {
      if (tagName === name) MockTags[index].count += 1;
    });
  }),
];

const getPopularTags = (tags: Tag[]) => {
  const tempTags = [...tags];
  tempTags.sort((a, b) => b.count - a.count);

  return tempTags.filter((_, index) => index < 5);
};

const getSearchTag = (tag: string) => {
  if (!tag) {
    return [];
  }

  const regex = new RegExp(tag, "i");

  return MockTags.filter(({ tagName }) => regex.test(tagName));
};

const getTogTags = (tags: Tag[]) => {
  return tags.filter((_, index) => index < 5);
};
