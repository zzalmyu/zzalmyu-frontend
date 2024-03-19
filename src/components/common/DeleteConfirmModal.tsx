import { AlertTriangle, Trash2 } from "lucide-react";
import Modal from "@/components/common/modals/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmModal = ({ isOpen, onClose, onDelete }: Props) => {
  // TODO: [2024.02.15] 제거하기 api 로직 연결
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-40pxr">
      <Modal.Header hasCloseButton />
      <Modal.Body>
        <div className="flex flex-col items-center">
          <AlertTriangle color="#ED0000" strokeWidth="1.2" size="84" aria-label="경고삼각형" />
          <div className="mt-4 flex flex-col items-center gap-1">
            <div className="text-xl font-extrabold sm:text-2xl">
              정말로 이 사진을 제거하시겠습니까?
            </div>
            <div className="font-bold text-text-secondary">제거된 사진은 영구적으로 삭제됩니다</div>
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
              onClick={handleDelete}
            >
              <Trash2 color="#FFFF" strokeWidth={2} aria-label="제거하기" />
              제거하기
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmModal;
