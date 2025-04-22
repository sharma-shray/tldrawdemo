import { ImageTypeDto } from "../lib/data";

export const getAllImagesAction = async (): Promise<
  ImageTypeDto[] | undefined
> => {
  try {
    const response = await fetch("/api/images");
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const images = await response.json();
    console.log("All images:", images);
    return images;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

export const filterImagesAction = async (
  keyword: string
): Promise<ImageTypeDto[] | undefined> => {
  try {
    const response = await fetch(`/api/images?keyword=${keyword}`);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }
    const filteredImages = await response.json();
    console.log("Filtered images:", filteredImages);
    return filteredImages;
  } catch (error) {
    console.error("Error filtering images:", error);
  }
};

export const addImageAction = async (
  title: string,
  image: string,
  keywords: string[],
  uploadDate: Date
): Promise<ImageTypeDto | undefined> => {
  try {
    const response = await fetch("/api/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image, keywords, uploadDate }),
    });
    if (!response.ok) {
      throw new Error("Failed to post image");
    }
    const result = await response.json();
    console.log("Image posted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error posting image:", error);
  }
};
