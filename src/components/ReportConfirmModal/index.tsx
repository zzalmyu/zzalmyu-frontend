import { AlertTriangle, Siren } from "lucide-react";
import Modal from "../common/modals/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onReport: () => void;
}

const ReportConfirmModal = ({ isOpen, onClose, onReport }: Props) => {
  const handleClickReportButton = () => {
    onReport();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-40pxr">
      <Modal.Header hasCloseButton={true} />
      <Modal.Body>
        <div className="flex flex-col items-center">
          <AlertTriangle color="#ED0000" strokeWidth="1.2" size="84" />
          <div className="mt-4 flex flex-col items-center gap-1">
            <div className="text-xl font-extrabold sm:text-2xl">
              정말로 이 사진을 신고하시겠습니까?
            </div>
            <div className="font-bold text-text-secondary">
              신고된 사진은 기준에 맞게 조치됩니다.
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3 text-lg font-bold">
            <button
              className="h-12 w-32 rounded-[90px] text-text-secondary outline outline-offset-2 outline-transparent transition-[outline] hover:outline-primary"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="flex h-12 w-32 items-center justify-evenly rounded-90pxr bg-delete text-white outline outline-offset-2 outline-transparent transition-[outline_background-color] hover:outline-delete"
              onClick={handleClickReportButton}
            >
              <Siren color="#FFFF" strokeWidth={2} aria-label="신고하기" />
              신고하기
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReportConfirmModal;
