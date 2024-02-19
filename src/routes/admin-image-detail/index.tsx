import { Trash2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import ZzalCard from "@/components/common/ZzalCard";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";

const reportUsers = [
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
];

const AdminImageDetail = () => {
  const reportDate = (date: string) => {
    return date.slice(0, 10);
  };

  const alertOverlay = useOverlay();
  const handleClickAlert = () => {
    alertOverlay.open(({ isOpen, close }) => (
      <DeleteConfirmModal isOpen={isOpen} onClose={close} onDelete={() => {}} />
    ));
  };

  return (
    <div className="mw-450pxr flex h-full w-full flex-col p-40pxr">
      <div className="px-0 pb-5 text-xl font-bold sm:px-10">
        <div className="breadcrumbs text-lg">
          <ul>
            <li>
              <Link to={"/admin/"}>신고 내역</Link>
            </li>
            <li>image1</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-850pxr">
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <ZzalCard
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9928383A5BBECBB111"
              alt="신고 상세 이미지"
              width="100"
              hasAnimation={false}
            />
            <div className="mt-3 flex w-280pxr justify-end rounded-xl  sm:ml-5 sm:mt-0 sm:max-h-96 sm:w-3/5 sm:rounded-xl">
              <table className="table bg-card">
                <thead>
                  <tr>
                    <th className="text-center text-text-primary">신고된 날짜</th>
                    <th className="text-center text-text-primary">신고 사용자 이메일</th>
                  </tr>
                </thead>
                <tbody>
                  {reportUsers.map(({ date, userEmail }, index) => (
                    <tr
                      key={`${index}-${userEmail}`}
                      className="border-b-2 border-neutral-300 last:border-0"
                    >
                      <td className="text-center text-xs font-bold sm:text-center sm:font-bold">
                        {reportDate(date)}
                      </td>
                      <td className="text-center text-xs font-bold sm:text-center sm:font-bold">
                        {userEmail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleClickAlert}
                className="btn fixed bottom-5 mb-0 ml-12pxr w-48 rounded-full bg-delete hover:bg-delete hover:opacity-75 sm:mb-20pxr"
              >
                <Trash2 color="#FFFF" strokeWidth={2} aria-label="제거 아이콘" />
                <span className="text-white">제거하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin-image-detail/")({
  component: AdminImageDetail,
});
