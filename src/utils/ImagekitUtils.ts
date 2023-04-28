import axios from 'axios';

export default class ImagekitUtils {
  public static uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'posts-images');
    formData.append('cloud_name', 'duwhgqlfk');
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/duwhgqlfk/image/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return res.data['secure_url'];
    } catch (err: any) {
      throw new Error(JSON.stringify(err.response.data.error));
    }
  };

  public static deleteImage = async (publicID: string) => {
    try {
      await axios.post(
        `https://api.cloudinary.com/v1_1/duwhgqlfk/${publicID}/destroy`
      );
    } catch (err: any) {
      throw new Error(JSON.stringify(err.response.data.error));
    }
  };
}
