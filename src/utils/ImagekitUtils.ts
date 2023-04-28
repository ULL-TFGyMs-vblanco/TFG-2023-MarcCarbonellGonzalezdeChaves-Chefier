import ImageKit from 'imagekit';
import ImageKitJs from 'imagekit-javascript';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';

export default class ImagekitUtils {
  public static uploadImage = async (
    image: File,
    name: string,
    folder: string
  ) => {
    const imagekit = new ImageKitJs({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: 'https://ik.imagekit.io/czvxqgafa/',
      authenticationEndpoint:
        'https://chefier-backend-git-develop-tfg-marccarbonell.vercel.app/api/imagekit/auth',
    });
    return imagekit
      .upload({
        file: image,
        fileName: name,
        folder: folder,
        useUniqueFileName: true,
      })
      .then((result: UploadResponse) => {
        return result;
      })
      .catch(() => {
        throw new Error(JSON.stringify(image));
      });
  };

  public static deleteImage = async (fileID: string) => {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      urlEndpoint: 'https://ik.imagekit.io/czvxqgafa/',
    });
    return imagekit
      .deleteFile(fileID)
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      });
  };
}
