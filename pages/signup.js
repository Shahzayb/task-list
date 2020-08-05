import React from 'react';
import withRouteProtection from '../hoc/withRouteProtection';
import Register from '../components/Forms/Register';

function Index() {
  return <Register />;
}

export default withRouteProtection(Index, 'UNAUTHENTICATED_ONLY');
