import { toast } from "react-toastify";
import axios from "axios";

const createImage = (src: string) => {
  const image = document.createElement("img");
  image.src = src;
  return image;
};

const copyToClipboard = async (pngBlob: Blob) => {
  try {
    await navigator.clipboard.write([
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

const copyJpgToClipboard = (imgBlob: Blob) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = createImage(window.URL.createObjectURL(imgBlob));
  image.onload = (event) => {
    if (event && event.target) {
      const target = event.target as HTMLImageElement;
      canvas.width = target.width;
      canvas.height = target.height;
      if (ctx) {
        ctx.drawImage(target, 0, 0, target.width, target.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              copyToClipboard(blob);
            }
          },
          "image/png",
          1,
        );
      }
    }
  };
};

export const copyZzal = async (imageUrl: string) => {
  try {
    const imgResponse = await axios.get(imageUrl, { responseType: "blob" });
    const imgBlob = imgResponse.data;
    const extension = imageUrl.split(".").pop()?.toLowerCase();

    if (extension === "jpg") {
      copyJpgToClipboard(imgBlob);
    } else {
      console.error("예상치 못한 파일 형식입니다: " + extension);
    }
  } catch (error) {
    toast.error("복사에 실패했습니다.");
    console.error(error);
  }
};
