import { toast } from "react-toastify";
import { cn } from "@/utils/tailwind";
import AccountDeletionNotice from "./AccountDeletionNotice";

interface Props {
  onNext: () => void;
}

const DeleteConfirm = ({ onNext }: Props) => {
  const handleDeleteAccount = () => {
    toast.success("계정이 삭제되었습니다.");
    onNext();
    // TODO: [2024.03.03] 삭제 로직 추가하기
    gtag("event", "user_action", { event_category: "계정_삭제" });
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div className={cn("pt-8", "max-w-570pxr pb-5 sm:h-385pxr")}>
        <div className="mb-25pxr">
          <span className="text-xl font-bold">계정을 삭제하시겠어요?</span>
        </div>
        <AccountDeletionNotice />
      </div>
      <div className={"my-10pxr flex w-full max-w-950pxr flex-row-reverse sm:my-0"}>
        <button
          onClick={handleDeleteAccount}
          className={"btn m-0 w-auto rounded-full hover:opacity-75 sm:m-10  sm:w-40"}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
