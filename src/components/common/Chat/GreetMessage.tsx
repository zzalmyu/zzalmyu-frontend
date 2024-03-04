interface Props {
  message: string;
}

const GreetMessage = ({ message }: Props) => {
  return (
    <div className="mx-auto my-5pxr rounded-full bg-gray-300 px-2 py-1 text-center text-sm font-semibold text-neutral">
      🤚 {message}
    </div>
  );
};

export default GreetMessage;
