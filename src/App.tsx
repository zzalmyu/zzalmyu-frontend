import { Fragment } from "react";
import AspectRatioImage from "@/components/common/AspectRatioImage/AspectRatioImage";

const App = () => {
  return (
    <Fragment>
      <div className="bg-primary text-copy-cta">hello react</div>
      <AspectRatioImage src="https://jjalbang.today/files/jjalbox/2015/03/95_55169fb3a1f8b_1940.jpg">
        <AspectRatioImage.LikeButton />
        <AspectRatioImage.SendButton />
      </AspectRatioImage>
      <AspectRatioImage src="https://jjalbang.today/files/jjalbox/2022/12/20221221_63a1db57406ff.png">
        <AspectRatioImage.LikeButton />
        <AspectRatioImage.SendButton />
      </AspectRatioImage>
    </Fragment>
  );
};

export default App;
