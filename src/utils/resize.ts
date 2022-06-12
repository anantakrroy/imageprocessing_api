import sharp from "sharp";

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
): Promise<{format: string, width: number, height: number}> => {
  const promise =  await sharp(`assets/${filename}`).resize({
    width: width,
    height: height,
  }).toFile(`./thumbs/${filename}`);
  return promise;
};

export default resize;
