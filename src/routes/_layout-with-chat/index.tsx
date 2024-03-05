import { createFileRoute } from "@tanstack/react-router";
import { copyZzal } from "@/utils/copyZzal";
import { debounce } from "@/utils/debounce";

const Home = () => {
  const handleCopyClick = debounce(() => {
    copyZzal(
      "https://zzalmyu-bucket.s3.ap-northeast-2.amazonaws.com/upload/keroro9073%40gmail.comtemp_image10005225818988034545.jpg",
    );
  }, 500);

  return (
    <div>
      <button onClick={handleCopyClick}>복사 test 버튼</button>
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
