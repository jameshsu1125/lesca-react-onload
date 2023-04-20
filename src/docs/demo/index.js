import { memo, useEffect } from 'react';
import H2 from '../components/h2';
import Installation from '../components/installation';
import config from '../config';
import QrCode from '../components/qrcode';

const Landing = memo(({ children }) => {
  useEffect(() => {}, []);
  return (
    <div className='w-full'>
      {children}
      <H2>usage</H2>
      <Installation>
        import {config.exportName} from '${config.name}'
      </Installation>
      <Installation>
        <div>
          <span>ad</span>
        </div>
      </Installation>
      <div className='btn-group'>
        <button className='btn'>Button</button>
        <button className='btn'>Button</button>
        <button className='btn'>Button</button>
      </div>
    </div>
  );
});
export default Landing;
