import { User } from '../models/user';
import bcrypt from 'bcrypt';

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
}
