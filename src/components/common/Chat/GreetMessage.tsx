interface Props {
  nickname: string;
}

const GreetMessage = ({ nickname }: Props) => {
  return (
    <div className="mx-auto my-5pxr rounded-full bg-gray-300 px-2 py-1 text-center text-sm font-semibold text-neutral">
      🤚 {nickname} 님이 입장하셨습니다
    </div>
  );
};

export default GreetMessage;
