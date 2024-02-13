import { Fragment } from "react";
import AspectRatioImage from "@/components/common/AspectRatioImage";

const App = () => {
  const handleClick = () => {
    console.log("보내기 및 좋아요 버튼 클릭!");
  };

  return (
    <Fragment>
      <div className="bg-primary text-copy-cta">hello react</div>
      <AspectRatioImage
        src="https://jjalbang.today/files/jjalbox/2022/12/20221221_63a1db57406ff.png"
        locationUsed="HOME"
      >
        <AspectRatioImage.LikeButton onClick={handleClick} isLiked={true} />
        <AspectRatioImage.SendButton onClick={handleClick} />
      </AspectRatioImage>
    </Fragment>
  );
};

export default App;
