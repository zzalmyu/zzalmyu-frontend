import { Trash2 } from "lucide-react";
import Modal from "../common/Modal";
import ZzalCard from "../common/ZzalCard";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const reportUsers = [
  { Date: "2024-02-08 23:03:20", UserEmail: "heejin1@asdf.com" },
  { Date: "2024-02-07 10:01:00", UserEmail: "heejin1@asdf.com" },
  { Date: "2024-02-08 23:03:20", UserEmail: "heejin1@asdf.com" },
  { Date: "2024-02-07 10:01:00", UserEmail: "heejin1@asdf.com" },
  { Date: "2024-02-08 23:03:20", UserEmail: "heejin1@asdf.com" },
  { Date: "2024-02-07 10:01:00", UserEmail: "heejin1@asdf.com" },
  { Date: "2024-02-08 23:03:20", UserEmail: "heejin1@asdf.com" },
  { Date: "2024-02-07 10:01:00", UserEmail: "heejin1@asdf.com" },
];

const ReportModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Body>
        <div className="flex items-start">
          <ZzalCard
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9928383A5BBECBB111"
            alt="신고 상세 이미지"
            // TODO: [2024.02.15] width속성 string으로 확장 후 width="full" 추가
          />
          <div className="ml-5 max-h-96 w-3/5 overflow-auto rounded-xl">
            <table className="table bg-card">
              <thead>
                <tr>
                  <th className="text-center text-text-primary">신고된 날짜</th>
                  <th className="text-center text-text-primary">신고 사용자 이메일</th>
                </tr>
              </thead>
              <tbody>
                {reportUsers.map((reportUser, index) => {
                  return (
                    <tr key={index} className="border-b-2 border-neutral-300 last:border-0">
                      <td className="text-center font-bold">{reportUser.Date.slice(0, 10)}</td>
                      <td className="text-center font-bold">{reportUser.UserEmail}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="btn fixed bottom-10 w-48 rounded-full bg-delete hover:bg-delete hover:opacity-75">
            <Trash2 color="#FFFF" strokeWidth={2} />
            <span className="text-white">제거하기</span>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReportModal;
