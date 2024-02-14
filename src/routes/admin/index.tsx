import { createFileRoute } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import ReportModal from "@/components/admin/ReportModal";

const Admin = () => {
  const modalOverlay = useOverlay();

  const handleClickModal = () => {
    modalOverlay.open(({ isOpen, close }) => <ReportModal isOpen={isOpen} onClose={close} />);
  };

  return (
    <div>
      <button onClick={handleClickModal}>상세보기</button>
    </div>
  );
};

export const Route = createFileRoute("/admin/")({
  component: Admin,
});
