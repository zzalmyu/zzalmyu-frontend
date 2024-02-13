import { Fragment } from "react";
import ZzalCard from "@/components/common/ZzalCard";

const App = () => {
  const handleClick = () => {
    console.log("보내기 및 좋아요 버튼 클릭!");
  };

  return (
    <Fragment>
      <div className="bg-primary text-copy-cta">hello react</div>
      <ZzalCard
        src="https://jjalbang.today/files/jjalbox/2022/12/20221221_63a1db57406ff.png"
        alt="zzal"
        locationUsed="HOME"
      >
        <ZzalCard.LikeButton onClick={handleClick} isLiked={true} />
        <ZzalCard.SendButton onClick={handleClick} />
      </ZzalCard>
    </Fragment>
  );
};

export default App;
