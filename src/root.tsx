import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import OnloadProvider from '.';

const ComponentNeedToPreload = () => {
  const [percent, setPercent] = useState(0);
  const [info, setInfo] = useState('');
  const [isTailwindReady, setIsTailwindReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsTailwindReady(true);
    }, 1000);
  }, []);
  return (
    <div className='my-4'>
      {isTailwindReady && (
        <OnloadProvider
          hideBeforeLoaded={true}
          onStart={(e) => {
            console.log(e);
          }}
          onStep={(e) => {
            console.log(e);

            const { total, loaded, url } = e;
            setPercent(Math.floor((loaded / total) * 100));
            setInfo(`target: ${url} was loaded.`);
          }}
          onload={(e) => {
            console.log(e);
            const { total, loaded } = e;
            setPercent(Math.floor((loaded / total) * 100) || 100);
            setInfo(`all target was loaded`);
          }}
        >
          <div className='flex w-full flex-row flex-wrap items-center justify-center'>
            {Array.from(Array(16).keys()).map((e) => (
              <div
                key={e}
                // src={`https://picsum.photos/id/${10 + e * 3 + e}/350/300`}
                // className='m-2'
                className={`m-2 h-[300px] w-[350px] rounded-lg bg-gray-300 before:inline-block before:h-full before:w-full before:animate-pulse before:bg-red-400 before:content-[''] before:bg-[url(${`https://picsum.photos/id/${10 + e * 3 + e}/350/300`})] before:bg-cover before:bg-center`}
              />
            ))}
          </div>
        </OnloadProvider>
      )}
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
