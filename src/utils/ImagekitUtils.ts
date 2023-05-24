import axios from 'axios';

// Utils for uploading and deleting images from Imagekit
export default class ImagekitUtils {
  // Upload an image to Imagekit
  public static uploadImage = async (image: any) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'posts-images');
    formData.append('cloud_name', 'duwhgqlfk');
    try {
      const res = await axios({
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/duwhgqlfk/image/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data['secure_url'];
    } catch (err: any) {
      throw new Error(JSON.stringify(err.response.data.error));
    }
  };

  // Delete an image from Imagekit
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
