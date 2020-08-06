import React from 'react';
import { Container, Paper, Typography, Box, Divider } from '@material-ui/core';
import { format } from 'timeago.js';
import useGutterAllChild from '../hooks/useGutterAllChild';

function TodoItem({ todoItem }) {
  const gutterClx = useGutterAllChild({ spacing: 1 });
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
        </Box>
      </Paper>
    </Container>
  );
}

export default TodoItem;
