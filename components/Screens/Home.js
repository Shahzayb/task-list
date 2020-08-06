import withRouteProtection from '../../hoc/withRouteProtection';
import Navbar from '../Navbar';
import TabPanel, { a11yProps } from '../TabPanel';
import { Paper, Box, Tabs, Tab, Container } from '@material-ui/core';
import InboxTodoItems from '../InboxTodoItems';
import SharedTodoItems from '../SharedTodoItems';

function Index() {
  const [category, setCategory] = React.useState('inbox');
  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: '6rem' }} maxWidth="md">
        <Paper>
          <Box paddingX={1}>
            <Tabs
              value={category}
              onChange={(event, value) => {
                setCategory(value);
              }}
              textColor="secondary"
            >
              <Tab
                value="inbox"
                label="Inbox"
                {...a11yProps('inbox', 'category')}
              />

              <Tab
                value="shared"
                label="Shared"
                {...a11yProps('shared', 'category')}
              />
            </Tabs>
          </Box>
        </Paper>
        <Box my={2}>
          <TabPanel value={category} index="inbox" name="category">
            <InboxTodoItems />
          </TabPanel>
          <TabPanel value={category} index="shared" name="category">
            <SharedTodoItems />
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default withRouteProtection(Index, 'AUTHENTICATED_ONLY');
