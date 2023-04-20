import { Suspense, lazy, memo, useContext, useMemo, useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import Installation from './components/installation';
import NavBar from './components/navBar';
import { ACTION, Context, PAGE, initialState, reducer } from './setting';
import './styles.less';
import config from './config';
import H2 from './components/h2';

const Pages = memo(() => {
  const [context] = useContext(Context);
  const page = context[ACTION.page];

  const Page = useMemo(() => {
    const [target] = Object.values(PAGE).filter((data) => data === page);
    const Element = lazy(() => import(`.${target}/`));
    if (target) {
      return (
        <Suspense fallback=''>
          <H2>installation</H2>
          <Installation language='sh'>{`npm i ${config.name}`}</Installation>
          <Element />
        </Suspense>
      );
    }
    return '';
  }, [page]);

  return (
    <div className='w-full flex justify-center'>
      <div className='max-w-3xl w-full p-5'>{Page}</div>
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
