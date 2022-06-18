import sharp from "sharp";
import Info from "../interface/info";

const dir = `thumbs`;
const subDir = `blurredImages`;

const blur = async (filename: string, sigma: number): Promise<Info> => {
  const promise = await sharp("assets/" + filename)
    .blur(sigma)
    .toFile(`${dir}/${subDir}/flipped_${filename}`);
  return promise;
};

export default blur;
