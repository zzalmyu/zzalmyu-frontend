import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/tailwind";
import TagBadge from "./TagBadge";

interface Props {
  tags: string[];
  tagClassName?: string;
  onClick?: () => void;
  isClickable?: boolean;
  tagGap?: number;
}

const TagSlider = ({ tags, tagClassName, onClick, isClickable = true, tagGap = 5 }: Props) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

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
    <div className={"relative flex bg-none"}>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={tagGap}
        allowTouchMove={false}
        slideToClickedSlide={true}
        pagination={{
          type: "fraction",
        }}
        navigation={{ prevEl: navigationPrevRef.current, nextEl: navigationNextRef.current }}
        onBeforeInit={handleBeforeInit}
        className="h-auto w-full"
        onSlideChange={(event) => setMainImageIndex(event.activeIndex)}
      >
        <button
          className="absolute top-0 z-10 h-full bg-gradient-to-r from-background from-70% pr-7pxr disabled:hidden"
          onMouseDown={(event) => event.preventDefault()}
          ref={navigationPrevRef}
          aria-label="이전으로 이동"
        >
          <ChevronLeft strokeWidth={1.5} />
        </button>
        {tags.map((tagName, index) => (
          <SwiperSlide
            key={`${index}-${tagName}`}
            className={cn("w-fit cursor-pointer px-2 text-center text-text-primary", {
              "pr-20pxr": index === tags.length - 1,
            })}
          >
            <button onClick={onClick} className={cn({ "cursor-default": !onClick })}>
              <TagBadge
                content={tagName}
                className={cn("px-2 py-0.5 text-sm", tagClassName)}
                isClickable={isClickable}
              />
            </button>
          </SwiperSlide>
        ))}
        <button
          className="absolute right-0 top-0 z-10 h-full bg-gradient-to-l from-background from-70% pl-7pxr disabled:hidden"
          onMouseDown={(event) => event.preventDefault()}
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
