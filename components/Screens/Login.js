import React from 'react';
import withRouteProtection from '../../hoc/withRouteProtection';
import Login from '../Forms/Login';

function Index() {
  return <Login />;
}

export default withRouteProtection(Index, 'UNAUTHENTICATED_ONLY');
