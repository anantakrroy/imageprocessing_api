import sharp from "sharp";
import Info from "../interface/info";

/**
 * @param {string} filename
 * @param {number} sigma
 *
 * @return {Promise<Object>}
 */

const dir = `thumbnails`;
const subDir = `blurredImages`;

const blur = async (filename: string, sigma: number): Promise<Info> => {
  const promise = await sharp(`build/gallery/${filename}`)
    .blur(sigma)
    .toFile(`${dir}/${subDir}/blurred_${filename}`);
  return promise;
};

export default blur;
