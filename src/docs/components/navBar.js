import { memo, useEffect } from 'react';
import config from '../config';

const NavBar = memo(() => {
  useEffect(() => {}, []);
  return (
    <div className='navbar bg-base-100'>
      <a href={config.url} className='btn btn-ghost normal-case text-xl'>
        {config.name}
      </a>
    </div>
  );
});
export default NavBar;
