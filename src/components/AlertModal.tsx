import { AlertTriangle, Trash2 } from "lucide-react";
import NewModal from "@/components/common/NewModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ALERT_CONTENTS = {
  main: "정말로 이 사진을 제거하시겠습니까?",
  sub: "제거된 사진은 영구적으로 삭제됩니다",
};
const AlertModal = ({ isOpen, onClose, onDelete }: Props) => {
  return (
    <NewModal isOpen={isOpen} onClose={onClose} size="sm">
      <NewModal.Body>
        <div className="flex flex-col items-center">
          <AlertTriangle color="#ED0000" strokeWidth="1.2" size="84" />
          <div className="mt-4 flex flex-col items-center gap-1">
            <div className="text-xl font-extrabold sm:text-2xl">{ALERT_CONTENTS.main}</div>
            <div className="font-bold text-text-secondary">{ALERT_CONTENTS.sub}</div>
          </div>
          <div className="mt-6 flex items-center gap-3 text-lg font-bold">
            <button
              className="w-32 rounded-[90px] p-2 text-text-secondary outline outline-offset-2 outline-transparent transition-[outline] hover:outline-primary"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="flex w-32 items-center justify-evenly rounded-[90px] bg-delete p-2 text-white outline outline-offset-2 outline-transparent transition-[outline] hover:outline-delete"
              onClick={onDelete}
            >
              <Trash2 color="#FFFF" strokeWidth={2} />
              제거하기
            </button>
          </div>
        </div>
      </NewModal.Body>
    </NewModal>
  );
};

export default AlertModal;
