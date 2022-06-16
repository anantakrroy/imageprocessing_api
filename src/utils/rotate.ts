import sharp from "sharp";
import Info from "../interface/info";

const dir = `thumbs`;
const subDir = `rotatedImages`;

const rotate = async (filename: string, angle: number): Promise<Info> => {
  const promise = await sharp("assets/" + filename)
    .rotate(angle)
    .toFile(`${dir}/${subDir}/rotated_${angle}_${filename}`);
  return promise;
};

export default rotate;
