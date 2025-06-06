import sharp from "sharp";
/**
 * 
 * @param {string} filename 
 * 
 * @returns {Promise<Object>} 
 */

const metadata = async(filename: string) => {
    const promise = await sharp(filename).metadata();
    // console.log(`Metadata >>>> ${promise.then(data => console.log(data))}`)
    return promise;
}

export default metadata;