import { memo, useState } from 'react';
import OnloadProvider from '../../lib';
import H2 from '../components/h2';

const ComponentNeedToPreload = () => {
  const [percent, setPercent] = useState(0);
  const [info, setInfo] = useState('');
  return (
    <div className='my-4'>
      <OnloadProvider
        onStep={(e) => {
          const { total, loaded, url } = e;
          setPercent(Math.floor((loaded / total) * 100));
          setInfo(`target: ${url} was loaded.`);
        }}
        onload={(e) => {
          const { total, loaded } = e;
          setPercent(Math.floor((loaded / total) * 100));
          setInfo(`all target was loaded`);
        }}
      >
        <div className='w-full flex flex-row flex-wrap'>
          {Array.from(Array(12).keys()).map((e) => (
            <img key={e} src={`https://picsum.photos/id/${10 + e * 3 + e}/350/300`} />
          ))}
        </div>
      </OnloadProvider>
      <div className='w-full'>
        <progress className='progress progress-primary w-full' value={percent} max='100' />
        <div className='w-full text-primary'>{info}</div>
      </div>
    </div>
  );
};

const Landing = memo(() => {
  const [currentTarget, setCurrentTarget] = useState();
  return (
    <div className='w-full'>
      <H2>Demo</H2>
      <p className='my-4'>Any background-image of div and src image of img will be pre-load.</p>
      {currentTarget && <ComponentNeedToPreload />}
      <div className='btn-group'>
        <button onClick={() => setCurrentTarget(true)} className='btn'>
          load component
        </button>
      </div>
    </div>
  );
});
export default Landing;
