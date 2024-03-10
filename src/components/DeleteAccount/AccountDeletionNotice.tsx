import { Folder, Heart, MessageCircle, Wand } from "lucide-react";

const AccountDeletionNotice = () => {
  const deletionNotices = [
    {
      icon: <Folder aria-label="폴더 아이콘" />,
      text: "짤을 업로드하지 못하고, 업로드할 짤들을 조회하지 못하게 됩니다",
    },
    {
      icon: <Heart aria-label="좋아요 아이콘" />,
      text: "짤에 좋아요를 추가하지 못하고, 좋아요한 짤들을 조회하지 못하게 됩니다",
    },
    {
      icon: <MessageCircle aria-label="메세지 아이콘" />,
      text: "다른 사용자들에게 짤 메세지를 전송하지 못하게 됩니다",
    },
    {
      icon: <Wand aria-label="지팡이 아이콘" />,
      text: "회원님만을 위한 추천 짤 목록을 받지 못하게 됩니다",
    },
  ];

  return (
    <div>
      {deletionNotices.map(({ icon, text }, index) => (
        <div>
          <div key={index} className="flex flex-row gap-4">
            {icon}
            <span className="font-bold">{text}</span>
          </div>
          {index !== deletionNotices.length - 1 && <div className="divider divider-neutral"></div>}
        </div>
      ))}
    </div>
  );
};

export default AccountDeletionNotice;
