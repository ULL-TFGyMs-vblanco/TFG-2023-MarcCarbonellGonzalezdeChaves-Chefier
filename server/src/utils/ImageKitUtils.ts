import ImageKit from 'imagekit';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';

// Utils for ImageKit
export default class ImageKitUtils {
  // Function to upload image to ImageKit
  public static uploadImage = async (
    image: string,
    name: string,
    folder: string
  ) => {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
      urlEndpoint: process.env.IMAGEKIT_ENDPOINT as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    });
    return imagekit
      .upload({
        file: image,
        fileName: name.replace(/ /g, '_'),
        folder: folder,
        useUniqueFileName: true,
      })
      .then((result: UploadResponse) => {
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  // Function to delete image from ImageKit
  public static deleteImage = async (fileID: string) => {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      urlEndpoint: process.env.IMAGEKIT_ENDPOINT as string,
    });
    return imagekit
      .deleteFile(fileID)
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
}
