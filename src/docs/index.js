import { memo, useMemo, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './components/navBar';
import Demo from './demo';
import { Context, initialState, reducer } from './setting';
import './styles.less';

const Pages = memo(() => {
  return (
    <div className='w-full flex justify-center'>
      <div className='max-w-3xl w-full p-5'>
        <Demo />
      </div>
    </div>
  );
});

const App = () => {
  const [state, setState] = useReducer(reducer, initialState);
  const value = useMemo(() => [state, setState], [state]);
  return (
    <div className='w-full min-h-screen bg-base-300'>
      <Context.Provider {...{ value }}>
        <NavBar />
        <Pages />
      </Context.Provider>
    </div>
  );
};

createRoot(document.getElementById('app')).render(<App />);
