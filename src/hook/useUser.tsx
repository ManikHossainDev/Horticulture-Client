'use client';
import { useAppSelector } from '@/redux/hooks';
const useUser = () => {
  const user = useAppSelector((state) => state.auth.user);
  return {
    isUser: !!user,
    user,
  };
};

export default useUser;
