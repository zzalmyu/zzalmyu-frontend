import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";

interface Props {
  toastColor: string;
  toastMessage: string;
  includeButton: boolean;
  buttonMessage?: string;
  buttonRedirectPath?: string;
}

const Toast = ({
  toastColor = "primary",
  toastMessage,
  includeButton = false,
  buttonMessage,
  buttonRedirectPath,
}: Props) => {
  return (
    <div className="toast toast-end toast-top mt-14">
      <div role="alert" className="alert shadow-lg">
        <AlertCircle viewBox="0 0 24 24" className={`h-6 w-6 shrink-0 stroke-${toastColor}`} />
        <span>{toastMessage}</span>
        {includeButton && (
          <Link to={buttonRedirectPath}>
            <div>
              <button
                className={`btn btn-sm bg-${toastColor} text-white hover:bg-${toastColor} hover:opacity-75`}
              >
                {buttonMessage}
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Toast;
