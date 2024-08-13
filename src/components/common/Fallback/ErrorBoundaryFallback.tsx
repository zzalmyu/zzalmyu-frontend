"use client";

import { ErrorBoundaryFallbackProps } from "@suspensive/react";

const ErrorBoundaryFallback = ({ reset }: ErrorBoundaryFallbackProps) => (
  <div className="flex h-full flex-1 flex-col items-center text-lg">
    <div role="alert" className=" alert flex flex-col items-center">
      <div className="font-bold">잠시 후 다시 시도해주세요</div>
      <p className="text-center text-sm">
        해당 요청을 처리하는데 <br /> 실패했습니다
      </p>
      <button className="btn btn-outline btn-wide" onClick={reset}>
        다시 시도
      </button>
    </div>
  </div>
);

export default ErrorBoundaryFallback;
