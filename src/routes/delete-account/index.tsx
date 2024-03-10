import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/utils/tailwind";
import { useFunnel } from "@/hooks/common/useFunnel";
import DeletionConfirm from "@/components/DeleteAccount/DeletionConfirm";
import DeletionCompleted from "@/components/DeleteAccount/DeletionCompleted";

const DeleteAccount = () => {
  const { Funnel, Step, setStep, currentStep } = useFunnel("DeletionConfirm");

  const handleNextStep = (step: string) => () => {
    setStep(step);
  };

  return (
    <div className="flex h-full flex-col items-center p-20pxr sm:p-42pxr">
      <div className="flex w-4/6 flex-col font-bold">
        <p className="mb-10pxr text-2xl">계정 삭제</p>
        <div className="breadcrumbs pb-20pxr text-base sm:text-lg">
          <ul>
            <li>
              <h1 className={cn({ "text-primary": currentStep === "DeletionConfirm" })}>1. 확인</h1>
            </li>
            <li>
              <h1 className={cn({ "text-primary": currentStep === "DeletionCompleted" })}>
                2. 완료
              </h1>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <Funnel>
            <Step name="DeletionConfirm">
              <DeletionConfirm onNext={handleNextStep("DeletionCompleted")} />
            </Step>
            <Step name="DeletionCompleted">
              <DeletionCompleted />
            </Step>
          </Funnel>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/delete-account/")({
  component: DeleteAccount,
});
