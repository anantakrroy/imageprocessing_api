import sharp from "sharp";

/**
 * 
 * @param {string} filename 
 * @returns {Object} 
 */

const metadata = async(filename: string) => {
    const data = await sharp(filename).metadata();
    return data;
}

export default metadata;