import { toast } from "react-toastify";
import axios from "axios";

const copyToClipboard = (pngBlob: Blob) => {
  try {
    navigator.clipboard.write([
      new ClipboardItem({
        [pngBlob.type]: pngBlob,
      }),
    ]);
    toast.success("성공적으로 복사되었습니다.");
  } catch (error) {
    toast.error("복사에 실패했습니다.");
    console.error(error);
  }
};

const copyImageToClipboard = (imageBlob: Blob) => {
  const image = new Image();
  image.src = URL.createObjectURL(imageBlob);

  image.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Canvas context를 생성할 수 없습니다.");
      return;
    }

    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
    canvas.toBlob((blob) => {
      if (blob) {
        copyToClipboard(blob);
        return;
      }

      console.error("Canvas to Blob 변환 실패");
    }, "image/png");
  };

  image.onerror = () => {
    console.error("이미지 로딩 실패");
  };
};

export const copyZzal = async (imageUrl: string) => {
  try {
    const { data: imageBlob } = await axios.get<Blob>(imageUrl, {
      headers: { "Cache-Control": "no-cache" },
      responseType: "blob",
    });

    copyImageToClipboard(imageBlob);
  } catch (error) {
    toast.error("복사에 실패했습니다.");
    console.error(error);
  }
};
