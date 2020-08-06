import React from 'react';
import { useGetInboxTodoItems } from '../react-query/todo-item';
import TodoItem from './TodoItem';
import FullWidthSpinner from './FullWidthSpinner';
import useGutterAllChild from '../hooks/useGutterAllChild';
import { Divider } from '@material-ui/core';

function InboxTodoItems() {
  const gutterClx = useGutterAllChild({ spacing: 3 });
  const inboxTodoItemsQuery = useGetInboxTodoItems();

  if (inboxTodoItemsQuery.isLoading) {
    return <FullWidthSpinner />;
  }
  if (inboxTodoItemsQuery.isError) {
    return <div>error</div>;
  }
  if (inboxTodoItemsQuery.data.length === 0) {
    return <div>no data found</div>;
  }

  return (
    <div className={gutterClx.root}>
      {inboxTodoItemsQuery.data
        .filter((todoItem) => todoItem.status === 'open')
        .map((todoItem) => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
        ))}
      <Divider />
      {inboxTodoItemsQuery.data
        .filter((todoItem) => todoItem.status === 'done')
        .map((todoItem) => (
          <TodoItem key={todoItem.id} todoItem={todoItem} />
        ))}
    </div>
  );
}

export default InboxTodoItems;
