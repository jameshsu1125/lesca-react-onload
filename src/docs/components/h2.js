import { memo, useEffect } from 'react';
import './index.less';

const H2 = memo(({ children }) => {
  useEffect(() => {}, []);
  return (
    <div className='border-l-8 pl-3 border-primary-focus my-5 text-2xl capitalize'>{children}</div>
  );
});
export default H2;
