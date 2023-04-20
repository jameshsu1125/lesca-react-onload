import Qrcode from 'lesca-react-qrcode';
import { memo } from 'react';
import './index.less';

const QrCode = memo(() => (
  <div className='my-5'>
    <Qrcode content={window.location.href} />
  </div>
));
export default QrCode;
