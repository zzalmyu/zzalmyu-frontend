import { useEffect } from "react";
import { toast } from "react-toastify";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAtom } from "jotai";
import AccountDeletionNotice from "./AccountDeletionNotice";
import useDeleteUserWithdraw from "@/hooks/api/auth/useDeleteUserWithdraw";
import { $userInformation } from "@/store/user";

const DeleteCompleted = () => {
  const { userWithdraw } = useDeleteUserWithdraw();
  const [, setUserInformation] = useAtom($userInformation);

  useEffect(() => {
    userWithdraw(undefined, {
      onSuccess: () => {
        setUserInformation({
          userId: 0,
          email: "",
          role: "GUEST",
        });
        toast.success("계정이 삭제되었습니다.", { autoClose: 1500 });
      },
    });
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className={"max-w-570pxr pb-5 sm:h-385pxr"}>
        <div className="mb-25pxr flex flex-col justify-center gap-3">
          <CheckCircle2
            size={50}
            fill="mediumSeaGreen"
            color="white"
            strokeWidth={1.5}
            aria-label="완료 아이콘"
          />
          <span className="text-xl font-bold">계정이 삭제되었습니다</span>
        </div>
        <AccountDeletionNotice />
      </div>
      <div className={"my-10pxr flex w-full max-w-950pxr flex-row-reverse sm:my-0"}>
        <Link to="/">
          <button className={"btn m-0 w-auto rounded-full hover:opacity-75 sm:my-10  sm:w-40"}>
            닫기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DeleteCompleted;
