import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { createFileRoute } from "@tanstack/react-router";
import { Folder, Heart, MessageCircle, Wand, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/utils/tailwind";

const DeleteAccount = () => {
  const [step, setStep] = useState(1);

  const handleDelete = () => {
    toast.success("계정이 삭제되었습니다.");
    // TODO: [2024.03.03] 삭제 로직 추가하기
    setStep(2);
  };

  const AccountDeletionNotice = () => {
    return (
      <Fragment>
        <div className="flex flex-row gap-4">
          <Folder aria-label="폴더 아이콘" />
          <span className=" font-bold">
            짤을 업로드하지 못하고, 업로드할 짤들을 조회하지 못하게 됩니다
          </span>
        </div>
        <div className="divider divider-neutral "></div>
        <div className="flex flex-row gap-4">
          <Heart aria-label="좋아요 아이콘" />
          <span className=" font-bold">
            짤에 좋아요를 추가하지 못하고, 좋아요한 짤들을 조회하지 못하게 됩니다
          </span>
        </div>
        <div className="divider divider-neutral "></div>
        <div className="flex flex-row gap-4">
          <MessageCircle aria-label="메세지 아이콘" />
          <span className="  font-bold">다른 사용자들에게 짤 메세지를 전송하지 못하게 됩니다</span>
        </div>
        <div className="divider divider-neutral "></div>
        <div className="flex flex-row gap-4">
          <Wand aria-label="지팡이 아이콘" />
          <span className=" font-bold">회원님만을 위한 추천 짤 목록을 받지 못하게 됩니다</span>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center p-42pxr">
      <div className="flex w-4/6 flex-col">
        <p className="mb-10pxr text-2xl font-bold">계정 삭제</p>
        <div className="breadcrumbs pb-20pxr text-base font-bold sm:text-lg">
          <ul>
            <li>
              <h1 className={cn({ "text-primary": step === 1 })}>1. 확인</h1>
            </li>
            <li>
              <h1 className={cn({ "text-primary": step === 2 })}>2. 완료</h1>
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-col items-center">
          {step === 1 && (
            <Fragment>
              <div className="h-full w-full max-w-570pxr pb-11 pt-8 sm:h-380pxr">
                <div className="mb-30pxr ">
                  <span className="text-xl font-bold">계정을 삭제하시겠어요?</span>
                </div>
                <AccountDeletionNotice />
              </div>
              <div className="flex w-full max-w-950pxr flex-row-reverse justify-between">
                <button
                  onClick={handleDelete}
                  className="btn m-0 w-auto rounded-full hover:opacity-75 sm:m-10  sm:w-40"
                >
                  <span>삭제하기</span>
                </button>
              </div>
            </Fragment>
          )}
          {step === 2 && (
            <Fragment>
              <div className="h-full w-full max-w-570pxr pb-11 sm:h-380pxr">
                <div className="mb-30pxr flex flex-col justify-center gap-4">
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
              <div className="flex w-full max-w-950pxr flex-row-reverse justify-between">
                <Link to="/">
                  <button className="btn m-0 w-auto rounded-full hover:opacity-75 sm:m-10  sm:w-40">
                    <span>닫기</span>
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
