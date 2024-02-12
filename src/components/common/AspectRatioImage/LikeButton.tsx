interface Props {
  onClick: () => void;
  isLike: boolean;
}

const LikeButton = ({ onClick, isLike }: Props) => {
  return (
    <div className="mt-1 cursor-pointer" onClick={onClick}>
      <svg
        width="35"
        height="35"
        viewBox="0 0 51 51"
        fill={isLike ? "#246FFF" : "none"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="25.5" cy="25.5" r="25.5" fill="white" />
        <path
          d="M35 21.9091C35 19.1979 32.7847 17 30.0521 17C28.0089 17 26.255 18.2287 25.5 19.9819C24.745 18.2287 22.9911 17 20.9479 17C18.2153 17 16 19.1979 16 21.9091C16 29.7861 25.5 35 25.5 35C25.5 35 35 29.7861 35 21.9091Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default LikeButton;
