export interface ImageType {
  Id: string;
  Title: string;
  Image: string;
  Keywords: string[];
  UploadDate: Date;
}

export interface ImageTypeRequest {
  title: string;
  image: string;
  keywords: string[];
  uploadDate: Date;
}

interface ImageConstType {
  Id: string;
  Keywords: string[];
}

export const ImageConsts: ImageConstType[] = [
  {
    Id: "https://cdn.pixabay.com/photo/2012/07/26/20/55/barrels-52934_1280.jpg",
    Keywords: ["beer", "cat"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237_1280.jpg",
    Keywords: ["brewery"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2017/01/21/21/15/beer-1998293_1280.jpg",
    Keywords: [],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2016/07/15/09/05/factory-1518504_1280.jpg",
    Keywords: ["alcohol", "cat", "beer"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2013/11/01/10/40/beer-203855_1280.jpg",
    Keywords: ["microbrewery"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2017/03/22/18/37/beer-2166004_1280.jpg",
    Keywords: ["pint", "pint"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2015/10/14/09/07/beer-987345_1280.jpg",
    Keywords: ["bottle"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2017/06/23/17/49/beer-tap-2435408_1280.jpg",
    Keywords: ["hops", "hops", "hops"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2017/08/21/11/48/beer-2665077_1280.jpg",
    Keywords: ["alcohol"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2017/06/28/06/04/beer-2449887_1280.jpg",
    Keywords: ["hops"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2014/06/25/11/12/brewery-377019_1280.jpg",
    Keywords: ["beer", "bottle"],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2018/11/08/22/12/beer-3803425_1280.jpg",
    Keywords: [],
  },
  {
    Id: "https://cdn.pixabay.com/photo/2020/03/20/11/56/malt-4950433_1280.jpg",
    Keywords: ["cat"],
  },
];

export const getImageKeywords = (images: ImageType[]) => [
  ...new Set(
    images.reduce(
      (acc: string[], image: ImageConstType) => [...acc, ...image.Keywords],
      []
    )
  ),
];

export const Images: ImageType[] = ImageConsts.map((imageConst, index) => {
  return {
    Id: index.toString(),
    Title: `Image ${index}`,
    Image: imageConst.Id,
    Keywords: imageConst.Keywords,
    UploadDate: new Date(),
  };
});
