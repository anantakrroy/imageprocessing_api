import sharp from "sharp";
import Info from "../interface/info";

/**
 * @param {string} filename
 *
 * @return {Promise<Object>}
 */


const dir = `thumbnails`;
const subDir = `grscaleImages`;

const grayscale = async (filename: string): Promise<Info> => {
  const promise = await sharp(`build/gallery/${filename}`)
    .grayscale()
    .toFile(`${dir}/${subDir}/grayscaled_${filename}`);
  return promise;
};

export default grayscale;
