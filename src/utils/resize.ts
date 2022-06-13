import sharp from "sharp";
import Info from "../interface/info";

// resize to specific width and height
/**
 * @param {number} width
 * @param {number} height
 * @param {string} filename
 *
 * @return {Promise<Object>}
 */

const resize = async (
  filename: string,
  width: number,
  height: number
): Promise<Info> => {
  const promise = await sharp(`assets/${filename}`)
    .resize({
      width: width,
      height: height,
    })
    .toFile(`./thumbs/${filename}_${width}x${height}`);
  return promise;
};

export default resize;
