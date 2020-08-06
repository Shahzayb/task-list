import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Button,
} from '@material-ui/core';
import { format } from 'timeago.js';
import useGutterAllChild from '../hooks/useGutterAllChild';
import {
  useMarkAsDoneMutation,
  useMarkAsOpenMutation,
} from '../react-query/todo-item';

function TodoItem({ todoItem }) {
  const gutterClx = useGutterAllChild({ spacing: 1 });
  const [
    markAsDoneMutation,
    markAsDoneMutationResult,
  ] = useMarkAsDoneMutation();
  const [
    markAsOpenMutation,
    markAsOpenMutationResult,
  ] = useMarkAsOpenMutation();
  return (
    <Container maxWidth="xs">
      <Paper>
        <Box p={1} className={gutterClx.root}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{todoItem.user.username}</Typography>
            <Typography
              style={{ fontSize: '10px' }}
              variant="overline"
              display="block"
            >
              {format(todoItem.created_at)}
            </Typography>
          </div>
          <Divider variant="fullWidth" />
          <Typography>description: {todoItem.description}</Typography>
          {todoItem.due_date && (
            <Typography>due date: {todoItem.due_date}</Typography>
          )}
          {todoItem.reminder_time && (
            <Typography>reminder: {todoItem.reminder_time}</Typography>
          )}
          <Divider />
          <Box>
            {todoItem.status === 'open' && (
              <Button
                onClick={() => {
                  markAsDoneMutation({
                    id: todoItem.id,
                    category: todoItem.category,
                  });
                }}
                size="small"
                variant="contained"
                color="primary"
              >
                Done
              </Button>
            )}
            {todoItem.status === 'done' && (
              <Button
                onClick={() => {
                  markAsOpenMutation({
                    id: todoItem.id,
                    category: todoItem.category,
                  });
                }}
                size="small"
                variant="contained"
                color="secondary"
              >
                open
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default TodoItem;
