import { useMutation, useQuery, queryCache } from 'react-query';
import {
  createTodoItem,
  getInboxTodoItems,
  getSharedTodoItems,
  markAsDone,
  markAsOpen,
} from '../fetch-api/todo-item';

export function useCreateTodoItemMutation() {
  return useMutation(createTodoItem, {
    onSuccess() {
      queryCache.refetchQueries('inbox', { force: true });
      queryCache.refetchQueries('shared', { force: true });
    },
  });
}

export function useGetInboxTodoItems() {
  return useQuery('inbox', getInboxTodoItems);
}

export function useGetSharedTodoItems() {
  return useQuery('shared', getSharedTodoItems);
}

export function useMarkAsDoneMutation() {
  return useMutation(markAsDone, {
    onMutate: ({ category, id }) => {
      const previousCategoryData = queryCache.getQueryData(category);

      if (previousCategoryData) {
        queryCache.setQueryData(category, (old) => {
          old.forEach((todoItem) => {
            if (todoItem.id === id) {
              todoItem.status = 'done';
            }
          });
          return old;
        });
      }

      return () => queryCache.setQueryData(category, previousCategoryData);
    },
    onError: (err, vars, rollback) => rollback(),
  });
}

export function useMarkAsOpenMutation() {
  return useMutation(markAsOpen, {
    onMutate: ({ category, id }) => {
      const previousCategoryData = queryCache.getQueryData(category);

      if (previousCategoryData) {
        queryCache.setQueryData(category, (old) => {
          old.forEach((todoItem) => {
            if (todoItem.id === id) {
              todoItem.status = 'open';
            }
          });
          return old;
        });
      }

      return () => queryCache.setQueryData(category, previousCategoryData);
    },
    onError: (err, vars, rollback) => rollback(),
  });
}
