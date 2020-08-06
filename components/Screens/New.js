import React from 'react';
import Navbar from '../Navbar';
import NewTodoItem from '../Forms/NewTodoItem';
import { Container, Paper, Typography, Box } from '@material-ui/core';
import { useGetAllUsers } from '../../react-query/user';
import FullWidthSpinner from '../FullWidthSpinner';

function Index() {
  const usersQuery = useGetAllUsers();
  console.log('usersQuery', usersQuery);

  if (usersQuery.isLoading) {
    return <FullWidthSpinner />;
  }

  if (usersQuery.isError) {
    return <div>error</div>;
  }

  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: '6rem' }} maxWidth="sm">
        <Paper>
          <Box p={1}>
            <Box pb={2}>
              <Typography component="h1" variant="h4">
                Add new item
              </Typography>
            </Box>
            <NewTodoItem users={usersQuery.data} />
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default Index;
