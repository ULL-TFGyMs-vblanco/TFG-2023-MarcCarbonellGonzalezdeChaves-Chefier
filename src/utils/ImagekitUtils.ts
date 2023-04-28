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
      throw new Error(JSON.stringify(err));
    }
  };

  public static deleteImage = async (publicID: string) => {
    console.log(publicID);
  };
}
