import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import OnloadProvider from '.';

const ComponentNeedToPreload = () => {
  const [percent, setPercent] = useState(0);
  const [info, setInfo] = useState('');
  return (
    <div className='my-4'>
      <OnloadProvider
        hideBeforeLoaded={false}
        onStep={(e: any) => {
          const { total, loaded, url } = e;
          setPercent(Math.floor((loaded / total) * 100));
          setInfo(`target: ${url} was loaded.`);
        }}
        onload={(e: any) => {
          const { total, loaded } = e;
          setPercent(Math.floor((loaded / total) * 100) || 100);
          setInfo(`all target was loaded`);
        }}
      >
        <div className='flex w-full flex-row flex-wrap items-center justify-center'>
          {Array.from(Array(16).keys()).map((e) => (
            <img
              key={e}
              src={`https://picsum.photos/id/${10 + e * 3 + e}/350/300`}
              className='m-2'
            />
          ))}
        </div>
      </OnloadProvider>
      <div className='w-full'>
        <progress className='progress progress-primary w-full' value={percent} max='100' />
        <div className='text-primary w-full'>{info}</div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentTarget, setCurrentTarget] = useState(false);
  return (
    <div className='flex w-full justify-center'>
      <div className='w-full max-w-4xl p-20'>
        {currentTarget && <ComponentNeedToPreload />}
        <button onClick={() => setCurrentTarget(true)} className='btn'>
          load component
        </button>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
