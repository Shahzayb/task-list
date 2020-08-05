import React from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';

function withRouteProtection(Component, protectionType = 'AUTHENTICATED_ONLY') {
  return (props) => {
    const { authenticated } = useAuth();
    const router = useRouter();
    React.useEffect(() => {
      if (protectionType === 'AUTHENTICATED_ONLY' && !authenticated) {
        router.push(`/login`);
      } else if (protectionType === 'UNAUTHENTICATED_ONLY' && authenticated) {
        router.replace('/');
      }
    }, [authenticated, router]);
    return <Component {...props} />;
  };
}

export default withRouteProtection;
