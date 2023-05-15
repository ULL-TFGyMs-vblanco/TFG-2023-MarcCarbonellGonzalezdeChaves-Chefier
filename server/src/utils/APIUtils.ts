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

  public static isValidUserUpdate = (update: any) => {
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

  public static isValidRecipeUpdate = (update: any) => {
    const allowedUpdates = ['likes', 'saved', 'valorations'];
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

  public static getAggregateSearch = (searchTerms: string) => {
    const search = {
      index: 'default',
      compound: {
        filter: [] as object[],
      },
    };
    search.compound.filter.push({
      text: {
        query: searchTerms,
        path: {
          wildcard: '*',
        },
        fuzzy: { maxEdits: 2, prefixLength: 3 },
      },
    });
    return search;
  };

  public static getAggregateMatch = (filters: any) => {
    const match = { $or: [] as object[] };
    Object.keys(filters).forEach((filter) => {
      if (filter === 'cookTime' || filter === 'averageRating') {
        const limits = filters[filter].split('-').map((limit: string) => {
          return parseInt(limit);
        });
        const filterObject = {};
        filterObject[filter] = {
          $gte: limits[0],
          $lte: limits[1],
        };
        match.$or.push(filterObject);
      } else if (filter === 'tags') {
        const tags = {
          breakfast: 'Desayuno',
          lunch: 'Almuerzo',
          dinner: 'Cena',
          dessert: 'Postre',
          snack: 'Snack',
          drink: 'Bebida',
        };
        Object.keys(tags).forEach((tag) => {
          if (filters.tags.includes(tag)) {
            const filterObject = {};
            filterObject[`tags.${tag}`] = tags[tag];
            match.$or.push(filterObject);
          }
        });
      } else if (filter === 'difficulty') {
        const difficulties = {
          easy: 'Fácil',
          medium: 'Media',
          hard: 'Difícil',
        };
        Object.keys(difficulties).forEach((difficulty) => {
          if (filters.difficulty.includes(difficulty)) {
            const filterObject = {};
            filterObject[`difficulty`] = difficulties[difficulty];
            match.$or.push(filterObject);
          }
        });
      } else if (
        filter === 'likes' ||
        filter === 'saved' ||
        filter === 'following'
      ) {
        const filterObject = {};
        filterObject[filter] = {
          $in: [filters[filter]],
        };
        match.$or.push(filterObject);
      } else {
        const filterObject = {};
        filterObject[filter] = filters[filter];
        match.$or.push(filterObject);
      }
    });
    return match;
  };
}
