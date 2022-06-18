import sharp from "sharp";
import Info from "../interface/info";

const dir = `thumbs`;
const subDir = `flippedImages`;

const flip = async (filename: string): Promise<Info> => {
  const promise = await sharp("assets/" + filename)
    .flip()
    .toFile(`${dir}/${subDir}/flipped_${filename}`);
  return promise;
};

export default flip;
