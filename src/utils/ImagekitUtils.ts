import axios from 'axios';

export default class ImagekitUtils {
  public static uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/duwhgqlfk/upload',
        formData
      );
      return res.data['secure_url'];
    } catch (err: any) {
      throw new Error(err.response.data.error);
    }
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
