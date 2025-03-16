import { Link } from 'react-router-dom';
import { RouterPath } from '../../app/router/router.path';

export function ReturnHomeLink() {
  return (
    <Link to={RouterPath.Home} style={{ textDecoration: 'none', marginLeft: 10 }}>
      Return Home
    </Link>
  );
}
