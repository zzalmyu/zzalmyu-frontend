import SendButton from "./SendButton";

interface Props {
  src: string;
}

const AspectRatioImage = ({ src }: Props) => {
  return (
    <div className="card card-compact mt-6 w-72 rounded-lg bg-base-100 shadow-xl">
      <SendButton />
      <figure>
        <img src={src} alt="zzal" className="h-full w-full rounded-lg object-cover" />
      </figure>
    </div>
  );
};

export default AspectRatioImage;
