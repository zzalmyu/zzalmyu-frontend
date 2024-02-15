import ImageController from "./ImageMenuBar";
import TagNavigator from "./TagNavigator";
import ZzalCard from "@/components/common/ZzalCard";
import Modal from "@/components/common/Modal";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ImageDetailModal = ({ isOpen, onClose }: Props) => {
  const src = "https://blog.kakaocdn.net/dn/bI2bwB/btsEP4W1m9P/os7ZrAK0fYhgOgBSKIiktk/img.png";
  const alt = "짤이미지";
  const tags = [
    "일이삼사오육칠팔구십",
    "일이삼사오육칠팔구십",
    "일이삼사오육칠팔구십",
    "음식",
    "여행",
    "운동",
    "영화",
    "음악",
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Body>
        <TagNavigator tags={tags} />
        <div className="my-10 flex justify-center">
          <div className="relative flex">
            <ZzalCard src={src} alt={alt} />
            <ImageController />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageDetailModal;