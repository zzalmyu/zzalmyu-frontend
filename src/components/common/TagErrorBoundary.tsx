import { FallbackProps } from "react-error-boundary";
import { RefreshCw } from "lucide-react";

const TagErrorBounndary = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <ul className="box-border flex w-[95%] items-center rounded-box border-2 bg-white p-3 shadow-xl outline-none">
      <button className="mr-2" onClick={resetErrorBoundary}>
        <RefreshCw size={20} />
      </button>
      <div>{error.message}</div>
    </ul>
  );
};

export default TagErrorBounndary;
