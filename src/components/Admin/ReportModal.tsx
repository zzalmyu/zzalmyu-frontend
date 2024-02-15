import { Trash2 } from "lucide-react";
import Modal from "../common/modals/Modal.tsx";
import ZzalCard from "../common/ZzalCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

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
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
  { date: "2024-02-08 23:03:20", userEmail: "heejin1@asdf.com" },
];

const ReportModal = ({ isOpen, onClose }: Props) => {
  const reportDate = (date: string) => {
    return date.slice(0, 10);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Body>
        <div className="flex flex-col items-center sm:flex-row sm:items-start">
          <ZzalCard
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9928383A5BBECBB111"
            alt="신고 상세 이미지"
            // TODO: [2024.02.15] width속성 string으로 확장 후 width="full" 추가
          />
          <div className="mt-3 max-h-200pxr w-280pxr overflow-auto rounded-xl sm:ml-5 sm:max-h-96 sm:w-3/5 sm:overflow-auto sm:rounded-xl">
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
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn fixed bottom-10 w-48 rounded-full bg-delete hover:bg-delete hover:opacity-75">
            <Trash2 color="#FFFF" strokeWidth={2} aria-label="제거 아이콘" />
            <span className="text-white">제거하기</span>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;
