import { toast } from "react-toastify";
import axios from "axios";
import * as Sentry from "@sentry/react";
import { sendGAEvent } from "@next/third-parties/google";

interface DownloadZzalParameters {
  imageUrl: string;
  imageTitle: string;
}

export const downloadZzal = async ({ imageUrl, imageTitle }: DownloadZzalParameters) => {
  try {
    const { data: imageBlob } = await axios.get<Blob>(imageUrl, {
      responseType: "blob",
      headers: { "Cache-Control": "no-cache" },
    });

    const file = new File([imageBlob], "file.jpg", { type: "image/jpeg" });
    const downloadLink = document.createElement("a");

    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = `${imageTitle}.jpg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    toast.success("성공적으로 다운로드 되었습니다");
    sendGAEvent("event", "user_action", { event_category: "짤_다운로드" });
  } catch (error) {
    toast.error("다운로드에 실패했습니다.");
    Sentry.captureException(error);
  }
};

const copyToClipboard = (pngBlob: Blob) => {
  try {
    navigator.clipboard.write([
      new ClipboardItem({
        [pngBlob.type]: pngBlob,
      }),
    ]);
    toast.success("성공적으로 복사되었습니다.");
    sendGAEvent("event", "user_action", { event_category: "짤_복사" });
  } catch (error) {
    toast.error("복사에 실패했습니다.");
    Sentry.captureException(error);
  }
};

const copyImageToClipboard = (imageBlob: Blob) => {
  const image = new Image();
  image.src = URL.createObjectURL(imageBlob);

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const canvasContext = canvas.getContext("2d");

    if (!canvasContext) {
      console.error("Canvas context를 생성할 수 없습니다.");
      return;
    }

    canvasContext.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    canvas.toBlob((blob) => {
      if (blob) {
        copyToClipboard(blob);
        return;
      }

      console.error("Canvas to Blob 변환에 실패했습니다.");
    }, "image/png");
  };

  image.onerror = () => {
    console.error("이미지 로딩 실패했습니다.");
  };
};

export const copyZzal = async (imageUrl: string) => {
  try {
    const { data: imageBlob } = await axios.get<Blob>(imageUrl, {
      responseType: "blob",
      headers: { "Cache-Control": "no-cache" },
    });

    copyImageToClipboard(imageBlob);
  } catch (error) {
    toast.error("복사에 실패했습니다.");
    Sentry.captureException(error);
  }
};
