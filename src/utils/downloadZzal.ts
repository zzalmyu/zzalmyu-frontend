import { toast } from "react-toastify";
import axios from "axios";

interface Props {
  imageUrl: string;
  imageTitle: string;
}

const downloadZzal = ({ imageUrl, imageTitle }: Props) => {
  axios
    .get(imageUrl, {
      responseType: "blob",
      headers: { "Cache-Control": "no-cache" },
    })
    .then((response) => {
      const file = new File([response.data], "file.jpg", { type: "image/jpeg" });
      const downloadLink = document.createElement("a");

      downloadLink.href = URL.createObjectURL(file);
      downloadLink.download = `${imageTitle}.jpg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      toast.success("성공적으로 다운로드 되었습니다");
    })
    .catch((error) => {
      toast.error("다운로드에 실패했습니다.");
      console.error("파일 다운로드 중 오류가 발생했습니다:", error);
    });
};

export default downloadZzal;
