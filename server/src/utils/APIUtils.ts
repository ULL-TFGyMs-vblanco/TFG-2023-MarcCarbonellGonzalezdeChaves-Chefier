import { User } from '../models/user';
import bcrypt from 'bcrypt';
import ImageKit from 'imagekit';
import { UploadResponse } from 'imagekit/dist/libs/interfaces';

export default class APIUtils {
  public static setResponse = (response: any, status: number, body: any) => {
    response.status = status;
    response.body = body;
  };

  public static buildUserDocument = async (request: any) => {
    const email = request.body.email;

    // Google and Github users have image but don't have passwords
    if (request.body.image) {
      if (request.body.username.length > 20) {
        request.body.username = request.body.username.substring(0, 10).trim();
      }
      let username = request.body.username
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/ /g, '_');
      let existingUser = await User.findOne({
        username: username,
      });
      let suffix = 1;
      while (existingUser) {
        existingUser = await User.findOne({
          username: username + suffix,
        });
        suffix++;
        if (!existingUser) username += suffix - 1;
      }
      const image = request.body.image;
      const user = new User({ username, email, image });
      return user;

      // Credential users have password but don't have image
    } else {
      const username = request.body.username
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/ /g, '_');
      const password = await bcrypt.hash(request.body.password, 10);
      const user = new User({ username, email, password });
      return user;
    }
  };

  public static uploadImage = async (
    image: string,
    name: string,
    folder: string
  ) => {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      urlEndpoint: process.env.IMAGEKIT_ENDPOINT || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
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

  public static deleteImage = async (fileID: string) => {
    const imagekit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
      urlEndpoint: process.env.IMAGEKIT_ENDPOINT || '',
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
