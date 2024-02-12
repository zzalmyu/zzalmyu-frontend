interface Props {
  onClick: () => void;
}

const SendButton = ({ onClick }: Props) => {
  return (
    <div className="mt-1 cursor-pointer" onClick={onClick}>
      <svg
        width="35"
        height="35"
        viewBox="0 0 51 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25.5" cy="25.5" r="25.5" fill="#246FFF" />
        <path
          d="M19.1484 26L16 16C23.5313 18.1408 30.6333 21.5228 37 26C30.6337 30.4771 23.5321 33.8591 16.0012 36L19.1484 26ZM19.1484 26H27.7946H19.1484Z"
          fill="white"
        />
        <path
          d="M19.1484 26L16 16C23.5313 18.1408 30.6333 21.5228 37 26C30.6337 30.4771 23.5321 33.8591 16.0012 36L19.1484 26ZM19.1484 26H27.7946"
          stroke="#11419E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default SendButton;
