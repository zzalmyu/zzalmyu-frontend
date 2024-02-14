import { AlertTriangle, Check, Trash2 } from "lucide-react";
import { MutationFunction, useMutation } from "@tanstack/react-query";
import Modal from "@/components/common/Modal";

const ALERT_CONTENTS = {
  main: "정말로 이 사진을 제거하시겠습니까?",
  sub: "제거된 사진은 영구적으로 삭제됩니다",
};

interface Props<TData, TVariables> {
  isOpen: boolean;
  onClose: () => void;
  onDelete: MutationFunction<TData, TVariables>;
  variables: TVariables;
}

const AlertModal = <TData, TVariables>({
  isOpen,
  onClose,
  onDelete,
  variables,
}: Props<TData, TVariables>) => {
  const mutation = useMutation({
    mutationFn: onDelete,
  });
  const { status, mutate } = mutation;
  const handleDelete = () => {
    mutate(
      { ...variables },
      {
        onSuccess: () => {
          setTimeout(() => {
            onClose();
          }, 600);
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <Modal.Body>
        <div className="flex flex-col items-center">
          <AlertTriangle color="#ED0000" strokeWidth="1.2" size="84" />
          <div className="mt-4 flex flex-col items-center gap-1">
            <div className="text-xl font-extrabold sm:text-2xl">{ALERT_CONTENTS.main}</div>
            <div className="font-bold text-text-secondary">{ALERT_CONTENTS.sub}</div>
          </div>
          <div className="mt-6 flex items-center gap-3 text-lg font-bold">
            <button
              className="h-12 w-32 rounded-[90px] text-text-secondary outline outline-offset-2 outline-transparent transition-[outline] hover:outline-primary"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className={`flex h-12 w-32 items-center justify-evenly rounded-[90px] ${status === "success" ? "bg-green-500 hover:outline-none" : "bg-delete hover:outline-delete"}  text-white outline outline-offset-2 outline-transparent transition-[outline_background-color]`}
              onClick={handleDelete}
              disabled={status !== "idle"}
            >
              {status === "idle" && (
                <>
                  <Trash2 color="#FFFF" strokeWidth={2} />
                  제거하기
                </>
              )}
              {status === "pending" && (
                <span className="loading loading-spinner loading-xs text-white"></span>
              )}
              {status === "success" && <Check />}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AlertModal;
