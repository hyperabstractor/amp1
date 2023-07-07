import { z } from "zod";
import { db } from "~/config";
import { procedure, router } from "../utils";
import fs from "fs";

export default router({
  getImages: procedure.query(async () => {
    const images = fs.readdirSync("./public/uploads");
    const imagesWithUrl = images.map((image) => {
      return {
        url: `http://localhost:3003/uploads/${image}`,
        name: image,
      };
    });

    return imagesWithUrl;
  }),
});
