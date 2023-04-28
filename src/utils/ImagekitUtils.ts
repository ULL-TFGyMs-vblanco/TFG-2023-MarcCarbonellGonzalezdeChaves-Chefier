export default class ImagekitUtils {
  public static uploadImage = async (
    image: string,
    name: string,
    folder: string
  ) => {
    const cloudinary = require('cloudinary').v2;
    const cloudinaryInstance = new cloudinary.Cloudinary({
      cloud_name: 'duwhgqlfk',
      api_key: '426374489172323',
      api_secret: 'MvvbP0SRiUgKuZg0wj7mRRHytjY',
    });
    return cloudinaryInstance.uploader
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

  public static deleteImage = async (publicID: string) => {
    const cloudinary = require('cloudinary').v2;
    const cloudinaryInstance = new cloudinary.Cloudinary({
      cloud_name: 'duwhgqlfk',
      api_key: '426374489172323',
      api_secret: 'MvvbP0SRiUgKuZg0wj7mRRHytjY',
    });
    cloudinaryInstance.uploader.destroy(publicID, (error: any, result: any) => {
      if (error) {
        return error;
      }
      return result;
    });
  };
}
