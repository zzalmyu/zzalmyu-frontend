import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { createFileRoute } from "@tanstack/react-router";
import { Folder, Heart, MessageCircle, Wand, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/tailwind";

const DeleteAccount = () => {
  const [step, setStep] = useState(1);

  const handleDeleteAccount = () => {
    toast.success("계정이 삭제되었습니다.");
    // TODO: [2024.03.03] 삭제 로직 추가하기
    setStep(2);
  };

  const buttonWrappingClasses = "flex w-full max-w-950pxr flex-row-reverse my-10pxr sm:my-0";
  const buttonClasses = "btn m-0 w-auto rounded-full hover:opacity-75 sm:m-10  sm:w-40";
  const noticeContainerClasses = "max-w-570pxr pb-5 sm:h-385pxr";

  const AccountDeletionNotice = () => {
    const deletionNotices = [
      {
        icon: <Folder aria-label="폴더 아이콘" />,
        text: "짤을 업로드하지 못하고, 업로드할 짤들을 조회하지 못하게 됩니다",
      },
      {
        icon: <Heart aria-label="좋아요 아이콘" />,
        text: "짤에 좋아요를 추가하지 못하고, 좋아요한 짤들을 조회하지 못하게 됩니다",
      },
      {
        icon: <MessageCircle aria-label="메세지 아이콘" />,
        text: "다른 사용자들에게 짤 메세지를 전송하지 못하게 됩니다",
      },
      {
        icon: <Wand aria-label="지팡이 아이콘" />,
        text: "회원님만을 위한 추천 짤 목록을 받지 못하게 됩니다",
      },
    ];

    return (
      <div>
        {deletionNotices.map(({ icon, text }, index) => (
          <div>
            <div key={index} className="flex flex-row gap-4">
              {icon}
              <span className="font-bold">{text}</span>
            </div>
            {index !== deletionNotices.length - 1 && (
              <div className="divider divider-neutral"></div>
            )}
          </div>
        ))}
      </div>
    );
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
              <div className={cn("pt-8", noticeContainerClasses)}>
                <div className="mb-25pxr">
                  <span className="text-xl font-bold">계정을 삭제하시겠어요?</span>
                </div>
                <AccountDeletionNotice />
              </div>
              <div className={buttonWrappingClasses}>
                <button onClick={handleDeleteAccount} className={buttonClasses}>
                  삭제하기
                </button>
              </div>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              <div className={noticeContainerClasses}>
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
              <div className={buttonWrappingClasses}>
                <Link to="/">
                  <button className={buttonClasses}>닫기</button>
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
