import { useMutation, useQuery } from 'react-query';
import {
  createTodoItem,
  getInboxTodoItems,
  getSharedTodoItems,
} from '../fetch-api/todo-item';

export function useCreateTodoItemMutation() {
  return useMutation(createTodoItem);
}

export function useGetInboxTodoItems() {
  return useQuery('inbox', getInboxTodoItems);
}

export function useGetSharedTodoItems() {
  return useQuery('shared', getSharedTodoItems);
}
