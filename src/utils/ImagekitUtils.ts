import axios from 'axios';

export default class ImagekitUtils {
  public static uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'posts-images');
    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/duwhgqlfk/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      console.log(res.json());
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
