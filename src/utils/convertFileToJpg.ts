export const convertFileToJpg = async (file: File): Promise<File> => {
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일이 아닙니다.");
  }

  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d");

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      canvasContext?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("JPG 파일 변환에 실패했습니다."));
            return;
          }

          const jpgFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          resolve(jpgFile);
        },
        "image/jpeg",
        1,
      );
    };

    img.onerror = () => {
      reject(new Error("이미지 로딩 실패했습니다."));
    };

    img.src = URL.createObjectURL(file);
  });
};
