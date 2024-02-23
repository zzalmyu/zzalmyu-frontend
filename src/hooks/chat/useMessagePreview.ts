import { useSetAtom } from "jotai";
import { $isPeekOpen, $previewImage } from "@/store/chat";

const useMessagePreview = () => {
  const setIsPeekOpen = useSetAtom($isPeekOpen);
  const setPreviewImage = useSetAtom($previewImage);

  const setMessagePreview = (imageSrc: string) => {
    setPreviewImage(imageSrc);
    setIsPeekOpen(true);
  };
  const deleteMessagePreview = () => {
    setIsPeekOpen(false);
    setPreviewImage("");
  };

  return { setMessagePreview, deleteMessagePreview };
};

export default useMessagePreview;
