import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import { MutationFunction } from "@tanstack/react-query";
import AlertModal from "@/components/common/AlertModal";

const Home = () => {
  // TODO: [2024.02.14] AlertModal 테스트 임시 코드 제거
  const [id, setId] = useState("1");
  interface DummyData {
    id: string;
    name: string;
  }
  interface DummyVariables {
    userId: string;
  }
  const exampleMutationFunction: MutationFunction<DummyData, DummyVariables> = ({ userId }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "dummyId",
          name: "dummy",
        });
        console.log(userId);
      }, 2000);
    });
  };

  const alertOverlay = useOverlay();
  const handleClickAlert = () => {
    alertOverlay.open(({ isOpen, close }) => (
      <AlertModal
        isOpen={isOpen}
        onClose={close}
        onDelete={exampleMutationFunction}
        variables={{ userId: id }}
      />
    ));
  };

  return (
    <>
      <div>여긴 메인(홈) 페이지</div>
      <div className="flex w-[10rem] flex-col gap-5">
        <button
          onClick={() => setId((prev) => prev + 1)}
          className="rounded-xl border-2 border-primary "
        >
          click
        </button>
        <button onClick={handleClickAlert} className="rounded-xl border-2 border-primary ">
          ALERT
        </button>
      </div>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
