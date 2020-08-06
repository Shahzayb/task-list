import { useQuery } from 'react-query';
import { getAllUsers } from '../fetch-api/user';

export function useGetAllUsers() {
  return useQuery('all_users', getAllUsers);
}
