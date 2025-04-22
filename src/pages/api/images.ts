// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ImageTypeDto } from "../../lib/data";
import { getImages, addImage, filterImages, removeImage } from "../../lib/data";

/**
 * @swagger
 * /api/images:
 *   get:
 *     description: Returns a list of images
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to filter images
 *     responses:
 *       200:
 *         description: A list of images
 *       400:
 *         description: Invalid keyword
 *   post:
 *     description: Adds a new image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Image added successfully
 *       400:
 *         description: Missing title, image, or keywords
 *   delete:
 *     description: Deletes an image
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the image to delete
 *     responses:
 *       200:
 *         description: Image deleted successfully
 *       404:
 *         description: Image not found
 *   all:
 *     description: Method not allowed
 *     responses:
 *       405:
 *         description: Method not allowed
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { keyword } = req.query;
    const images = getImages();
    if (keyword) {
      if (typeof keyword !== "string") {
        res.status(400).json({ error: "Invalid keyword" });
        return;
      }
      const filteredImages = filterImages(keyword);
      res.status(200).json(filteredImages);
    }
    res.status(200).json(images);
  } else if (req.method === "POST") {
    const { title, image, keywords, uploadDate } = req.body as {
      title?: string;
      image?: string;
      keywords?: string[];
      uploadDate?: Date;
    };

    if (!title || !image || !keywords || !uploadDate) {
      res
        .status(400)
        .json({ error: "Missing title, image, keywords or upload date" });
      return;
    }

    const images = getImages();
    const id = "data_id_" + (images.length + 1);
    const newImage: ImageTypeDto = {
      id,
      title,
      image,
      keywords,
      uploadDate,
    };
    addImage(newImage);
    res.status(201).json(newImage);
  } else if (req.method === "DELETE") {
    const { query } = req;
    const id: string = query.id as string;
    const imageFound = removeImage(id);
    res.status(imageFound ? 200 : 404).end();
  } else {
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
