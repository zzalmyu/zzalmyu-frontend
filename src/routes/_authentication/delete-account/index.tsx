import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/utils/tailwind";
import useFunnel from "@/hooks/common/useFunnel";
import DeleteConfirm from "@/components/DeleteAccount/DeleteConfirm";
import DeleteCompleted from "@/components/DeleteAccount/DeleteCompleted";
import CommonHelmet from "@/helmets/CommonHelmet";

const DeleteAccount = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel([
    "DeleteConfirm",
    "DeleteCompleted",
  ] as const);

  const handleNextStep = (step: "DeleteConfirm" | "DeleteCompleted") => () => {
    setStep(step);
  };

  return (
    <Fragment>
      <CommonHelmet
        pageTitle="계정 삭제 - 짤뮤니티"
        url="https://zzalmyu.site/delete-account"
        description="짤뮤니티 계정 삭제 페이지"
      />
      <div className="flex h-full flex-col items-center p-20pxr sm:p-42pxr">
        <div className="flex w-4/6 flex-col font-bold">
          <p className="mb-10pxr text-2xl">계정 삭제</p>
          <div className="breadcrumbs pb-20pxr text-base sm:text-lg">
            <ul>
              <li>
                <h1 className={cn({ "text-primary": currentStep === "DeleteConfirm" })}>1. 확인</h1>
              </li>
              <li>
                <h1 className={cn({ "text-primary": currentStep === "DeleteCompleted" })}>
                  2. 완료
                </h1>
              </li>
            </ul>
          </div>
          <Funnel>
            <Step name="DeleteConfirm">
              <DeleteConfirm onNext={handleNextStep("DeleteCompleted")} />
            </Step>
            <Step name="DeleteCompleted">
              <DeleteCompleted />
            </Step>
          </Funnel>
        </div>
      </div>
    </Fragment>
  );
};

export const Route = createFileRoute("/_authentication/delete-account/")({
  component: DeleteAccount,
});
