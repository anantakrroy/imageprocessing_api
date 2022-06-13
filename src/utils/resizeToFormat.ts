import sharp, { AvailableFormatInfo, FormatEnum } from "sharp";
import Info from "../interface/info";

// resize to specific width and height
/**
 * @param {number} width
 * @param {number} height
 * @param {string} filename
 *
 * @return {Promise<Object>}
 */

const resizeToFormat = async (
  filename: string,
  width: number,
  height: number,
  format: string
): Promise<Info> => {
  const promise = await sharp(`assets/${filename}`)
    .toFormat(format)
    .resize({
      width: width,
      height: height,
    })
    .toFile(`./thumbs/${filename}`);
  return promise;
};

export default resizeToFormat;
