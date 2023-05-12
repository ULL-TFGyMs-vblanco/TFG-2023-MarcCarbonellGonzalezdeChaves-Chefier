import { User } from 'user-types';
import UserService from '@/services/UserService';
import { useSWRConfig } from 'swr';

// Custom hook to handle recipe 'liking'
export function useFollow(follower: User, followed: User) {
  const { mutate } = useSWRConfig();

  const follow = async () => {
    const updatedFollowers = [...followed.followers, follower._id];
    const updatedFollowing = [...follower.following, followed._id];
    await mutate(
      `/username/${followed.username}`,
      { ...followed, followers: updatedFollowers },
      false
    );
    await mutate(
      `/username/${follower.username}`,
      { ...follower, following: updatedFollowing },
      false
    );
    await UserService.updateUser(`/username/${followed.username}`, {
      followers: updatedFollowers,
    });
    await UserService.updateUser(`/username/${follower.username}`, {
      following: updatedFollowing,
    });
  };

  const unfollow = async () => {
    const updatedFollowers = followed.followers.filter(
      (id: string) => id !== follower._id
    );
    const updatedFollowing = follower.following.filter(
      (id: string) => id !== followed._id
    );
    await mutate(
      `/username/${followed.username}`,
      { ...followed, followers: updatedFollowers },
      false
    );
    await mutate(
      `/username/${follower.username}`,
      { ...follower, following: updatedFollowing },
      false
    );
    await UserService.updateUser(`/username/${followed.username}`, {
      followers: updatedFollowers,
    });
    await UserService.updateUser(`/username/${follower.username}`, {
      following: updatedFollowing,
    });
  };

  return {
    follow,
    unfollow,
  };
}
