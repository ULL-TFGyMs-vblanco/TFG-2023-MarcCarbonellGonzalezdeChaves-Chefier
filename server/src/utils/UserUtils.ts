import { User } from '../models/user';
import bcrypt from 'bcrypt';

// Utils for user routes
export default class UserUtils {
  // Function to build user document from register request
  public static buildUserDocument = async (request: any) => {
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
    const email = request.body.email;
    const userData = { username, email };
    if (request.body.image) userData['image'] = request.body.image;
    if (request.body.password) {
      const password = await bcrypt.hash(request.body.password, 10);
      userData['password'] = password;
    }
    const user = new User(userData);
    return user;
  };

  // Function to check if an update is valid
  public static isValidUpdate = (update: any) => {
    const allowedUpdates = [
      'likes',
      'saved',
      'recipes',
      'following',
      'followers',
    ];
    const updateEntries = Object.entries(update);
    const actualUpdates = updateEntries.map((entry) => {
      if (entry[0] === '$push' || entry[0] === '$pull') {
        if (typeof entry[1] === 'object' && entry[1] !== null) {
          return Object.keys(entry[1])[0];
        }
      }
      return entry[0];
    });
    return actualUpdates.every((update) => allowedUpdates.includes(update));
  };
}
