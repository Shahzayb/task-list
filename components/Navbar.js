import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Link from './Link';
import { useAuth } from '../context/auth-context';

function Navbar(props) {
  const { logout, authenticated } = useAuth();

  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link underline="none" color="inherit" href="/" title="home">
          <Typography variant="h6" style={{ paddingRight: '1rem' }}>
            Task List
          </Typography>
        </Link>

        <div>
          {authenticated && (
            <Button
              onClick={() => {
                logout();
              }}
              variant="outlined"
              color="inherit"
            >
              Logout
            </Button>
          )}
          {!authenticated && (
            <Button>
              <Link href="/login" color="inherit" underline="none"></Link>
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
