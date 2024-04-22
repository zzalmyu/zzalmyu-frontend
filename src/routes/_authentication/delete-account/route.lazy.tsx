import { Helmet } from "react-helmet-async";
import { Fragment } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { cn } from "@/utils/tailwind";
import useFunnel from "@/hooks/common/useFunnel";
import DeleteConfirm from "@/components/DeleteAccount/DeleteConfirm";
import DeleteCompleted from "@/components/DeleteAccount/DeleteCompleted";

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
      <Helmet>
        <title>계정 삭제 - 짤뮤니티</title>
        <meta name="description" content="계정을 삭제하시겠습니까?" />
      </Helmet>
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

export const Route = createLazyFileRoute("/_authentication/delete-account")({
  component: DeleteAccount,
});
