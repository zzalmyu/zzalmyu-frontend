import { http, HttpResponse } from "msw";
import { GetMyHomeZzalsResponse } from "@/types/zzal.dto";
import { zzals } from "../data/zzals";

const ZZAL_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/v1/image`;

export const zzalHandlers = [
  http.get(`${ZZAL_BASE_URL}`, ({ request }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get("tagName") as string;

    return HttpResponse.json<GetMyHomeZzalsResponse[]>(getZzals(tag));
  }),
  http.get(`${ZZAL_BASE_URL}/like`, ({ request }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get("tagName") as string;

    return HttpResponse.json<GetMyHomeZzalsResponse[]>(getZzals(tag));
  }),
  http.get(`${ZZAL_BASE_URL}/upload`, ({ request }) => {
    const url = new URL(request.url);
    const tag = url.searchParams.get("tagName") as string;

    return HttpResponse.json<GetMyHomeZzalsResponse[]>(getZzals(tag));
  }),
  http.get(`${ZZAL_BASE_URL}/:imageId`, ({ params }) => {
    const { imageId } = params;

    return HttpResponse.json(getZzal(Number(imageId)));
  }),
  http.post(`${ZZAL_BASE_URL}/:imageId/like`, ({ request }) => {
    const url = new URL(request.url);
    const imgId = url.searchParams.get("imageId");

    zzalAddLike(Number(imgId));

    return HttpResponse.json();
  }),
  http.post(`${ZZAL_BASE_URL}/:imageId/like/cancel`, ({ request }) => {
    const url = new URL(request.url);
    const imgId = url.searchParams.get("imageId");

    zzalCancelLike(Number(imgId));

    return HttpResponse.json();
  }),
  http.post(ZZAL_BASE_URL, async ({ request }) => {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return HttpResponse.error();
    }

    if (!(file instanceof File)) {
      return HttpResponse.error();
    }

    return HttpResponse.json();
  }),
];

const getZzals = (tag: string) => {
  const regex = new RegExp(tag, "i");

  return zzals.filter(({ title }) => regex.test(title));
};

const getZzal = (id: number) => {
  const zzal = zzals.filter(({ imageId }) => imageId === id);
  return {
    ...zzal,
    imageTitle: zzal[0].title,
    uploadUserId: 1,
    imgUrl: zzal[0].path,
    tags: [],
  };
};

const zzalAddLike = (id: number) => {
  zzals.forEach(({ imageId }, index) => {
    if (imageId === id) {
      zzals[index].imageLikeYn = true;
    }
  });
};

const zzalCancelLike = (id: number) => {
  zzals.forEach(({ imageId }, index) => {
    if (imageId === id) {
      zzals[index].imageLikeYn = false;
    }
  });
};
