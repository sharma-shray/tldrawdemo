import { ImageTypeDto } from "@/lib/data";
import { ImageType, ImageTypeRequest } from "./ImageConsts";

export const GetAllImages = async (): Promise<ImageType[]> => {
  const res = await fetch("http://localhost:3000/api/images");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data: ImageTypeDto[] = await res.json();
  const result: ImageType[] = data.map((image: ImageTypeDto) => {
    const deserializeImage: ImageType = {
      Id: image.id,
      Title: image.title,
      Image: image.image,
      Keywords: image.keywords,
      UploadDate: image.uploadDate,
    };
    return deserializeImage;
  });
  return result;
};

export const AddImage = async (image: ImageTypeRequest) => {
  const res = await fetch("http://localhost:3000/api/images", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(image),
  });
  const data = await res.json();
  return data;
};
