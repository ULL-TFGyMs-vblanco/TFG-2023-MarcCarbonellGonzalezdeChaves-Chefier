import axios from 'axios';

export default class ImagekitUtils {
  public static uploadImage = async (image: string) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'posts-images');
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/duwhgqlfk/upload',
        formData
      );
      return res.data['secure_url'];
    } catch (err: any) {
      throw new Error(JSON.stringify(err.response.data.error));
    }
  };

  public static deleteImage = async (publicID: string) => {
    console.log(publicID);
  };
}
