import { User } from 'user-types';
import UserService from '@/services/UserService';
import { useSWRConfig } from 'swr';
import { useLoggedUser } from './useLoggedUser';

// Custom hook to handle following
export function useFollow(followed: User) {
  const { mutate } = useSWRConfig();
  const { user: follower, mutate: mutateFollower } = useLoggedUser();

  // Function to follow a user
  const follow = async () => {
    const updatedFollowers = [...followed.followers, follower._id];
    const updatedFollowing = [...follower.following, followed._id];
    await mutate(
      `/username/${followed.username}`,
      { ...followed, followers: updatedFollowers },
      false
    );
    await mutateFollower({ ...follower, following: updatedFollowing }, false);
    await UserService.updateUser(`/user/${followed._id}`, {
      followers: updatedFollowers,
    });
    await UserService.updateUser(`/user/${follower._id}`, {
      following: updatedFollowing,
    });
  };

  // Function to unfollow a user
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
    await mutateFollower({ ...follower, following: updatedFollowing }, false);
    await UserService.updateUser(`/user/${followed._id}`, {
      followers: updatedFollowers,
    });
    await UserService.updateUser(`/user/${follower._id}`, {
      following: updatedFollowing,
    });
  };

  return {
    follow,
    unfollow,
  };
}
