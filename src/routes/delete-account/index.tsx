import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/tailwind";
import AccountDeletionNotice from "@/components/DeleteAccount/AccountDeletionNotice";

const DeleteAccount = () => {
  const [step, setStep] = useState(1);

  const handleDeleteAccount = () => {
    toast.success("계정이 삭제되었습니다.");
    // TODO: [2024.03.03] 삭제 로직 추가하기
    setStep(2);
  };

  return (
    <div className="flex h-full flex-col items-center p-20pxr sm:p-42pxr">
      <div className="flex w-4/6 flex-col font-bold">
        <p className="mb-10pxr text-2xl">계정 삭제</p>
        <div className="breadcrumbs pb-20pxr text-base sm:text-lg">
          <ul>
            <li>
              <h1 className={cn({ "text-primary": step === 1 })}>1. 확인</h1>
            </li>
            <li>
              <h1 className={cn({ "text-primary": step === 2 })}>2. 완료</h1>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          {step === 1 && (
            <Fragment>
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
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
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
                  <button
                    className={"btn m-0 w-auto rounded-full hover:opacity-75 sm:m-10  sm:w-40"}
                  >
                    닫기
                  </button>
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/delete-account/")({
  component: DeleteAccount,
});
