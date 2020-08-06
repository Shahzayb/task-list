import React from 'react';
import { useGetSharedTodoItems } from '../react-query/todo-item';
import TodoItem from './TodoItem';
import FullWidthSpinner from './FullWidthSpinner';
import useGutterAllChild from '../hooks/useGutterAllChild';
import { Divider } from '@material-ui/core';

function SharedTodoItems() {
  const gutterClx = useGutterAllChild({ spacing: 3 });
  const sharedTodoItemsQuery = useGetSharedTodoItems();

  if (sharedTodoItemsQuery.isLoading) {
    return <FullWidthSpinner />;
  }
  if (sharedTodoItemsQuery.isError) {
    return <div>error</div>;
  }
  if (sharedTodoItemsQuery.data.length === 0) {
    return <div>no data found</div>;
  }

  return (
    <div className={gutterClx.root}>
      {sharedTodoItemsQuery.data
        .filter((todoItem) => todoItem.status === 'open')
        .map((todoItem) => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
        ))}
      <Divider />
      {sharedTodoItemsQuery.data
        .filter((todoItem) => todoItem.status === 'done')
        .map((todoItem) => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
        ))}
    </div>
  );
}

export default SharedTodoItems;
