import { useMutation } from 'react-query';
import { createTodoItem } from '../fetch-api/todo-item';

export function useCreateTodoItemMutation() {
  return useMutation(createTodoItem);
}
