import sharp from "sharp";
import Info from "../interface/info";

/**
 * @param {number} width
 * @param {number} height
 * @param {string} filename
 *
 * @return {Promise<Object>}
 */

const dir = "build";
const subDir = "thumbnails/resizedImages";

const resize = async (
  filename: string,
  width: number,
  height: number
): Promise<Info> => {
  const promise = await sharp(`build/gallery/${filename}`)
    .resize({
      width: width,
      height: height,
    })
    .toFile(`./${dir}/${subDir}/${width}x${height}_${filename}`);
  return promise;
};

export default resize;
