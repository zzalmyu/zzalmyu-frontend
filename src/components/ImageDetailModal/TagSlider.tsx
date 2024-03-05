import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { TagDetail } from "@/types/tag";
import TagBadge from "../common/TagBadge";

interface Props {
  tags: TagDetail[];
  textSize?: string;
  className?: string;
  onClick?: () => void;
}

const TagSlider = ({ tags, textSize = "xs", className, onClick }: Props) => {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  const arrowButtonClasses = "absolute top-0 z-10 h-full from-background from-70%";

  useEffect(() => {
    SwiperCore.use([Navigation]);
  }, []);

  const handleBeforeInit = (swiper: SwiperCore) => {
    const swiperNavigation = swiper.params.navigation;
    if (swiperNavigation && typeof swiperNavigation !== "boolean" && swiper.navigation) {
      swiperNavigation.prevEl = navigationPrevRef.current;
      swiperNavigation.nextEl = navigationNextRef.current;
      swiper.activeIndex = mainImageIndex;
      swiper.navigation.update();
    }
  };

  return (
    <div className={`relative flex w-full bg-background px-20pxr py-10pxr ${className}`}>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={27}
        pagination={{
          type: "fraction",
        }}
        navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
        onBeforeInit={handleBeforeInit}
        className="h-auto w-full"
        onSlideChange={(event) => setMainImageIndex(event.activeIndex)}
        onReachBeginning={() => {
          setShowPrevButton(false);
        }}
        onReachEnd={() => {
          setShowNextButton(false);
        }}
        onFromEdge={() => {
          setShowPrevButton(true);
          setShowNextButton(true);
        }}
      >
        {tags.map(({ name, id }) => (
          <SwiperSlide key={id} className="w-fit cursor-pointer text-center text-text-primary">
            <button onClick={onClick}>
              <TagBadge content={name} className={`bg-primary px-2 py-1 text-${textSize}`} />
            </button>
          </SwiperSlide>
        ))}

        <button
          className={cn(arrowButtonClasses, "bg-gradient-to-r pr-7pxr", {
            hidden: !showPrevButton,
          })}
          ref={navigationPrevRef}
          aria-label="이전으로 이동"
        >
          <ChevronLeft strokeWidth={1.5} />
        </button>

        <button
          className={cn(arrowButtonClasses, "right-0 bg-gradient-to-l pl-7pxr", {
            hidden: !showNextButton,
          })}
          ref={navigationNextRef}
          aria-label="다음으로 이동"
        >
          <ChevronRight strokeWidth={1.5} />
        </button>
      </Swiper>
    </div>
  );
};

export default TagSlider;
