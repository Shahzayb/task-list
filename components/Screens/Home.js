import withRouteProtection from '../../hoc/withRouteProtection';
import Navbar from '../Navbar';

function Index() {
  return (
    <div>
      <Navbar />
      hello
    </div>
  );
}

export default withRouteProtection(Index, 'AUTHENTICATED_ONLY');
