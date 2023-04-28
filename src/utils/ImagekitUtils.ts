/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

export default class ImagekitUtils {
  public static uploadImage = async (
    image: string,
    name: string,
    folder: string
  ) => {
    const cloudinary = require('cloudinary').v2;
    return cloudinary.uploader
      .upload(image, {
        public_id: name,
        folder: folder,
      })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        return error;
      });
  };

  public static deleteImage = async (assetID: string) => {
    const cloudinary = require('cloudinary').v2;
    cloudinary.uploader.destroy(assetID, (error: any, result: any) => {
      if (error) {
        return error;
      }
      return result;
    });
  };
}
