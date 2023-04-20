import copy from 'copy-text-to-clipboard';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';
import prettier from 'prettier/esm/standalone.mjs';
import prettierPlugins from 'prettier/esm/parser-babel.mjs';
import './index.less';

const Installation = ({ children, language = 'jsx', code }) => {
  const text = useMemo(() => {
    if (code) return code;
    if (children instanceof Array) {
      const hasComponent = children.filter((child) => child instanceof Object);
      if (hasComponent.length === 0) return children.join('');
      return children
        .map((child) => {
          if (child instanceof Object) {
            return ReactDOMServer.renderToString(children);
          }
          return child;
        })
        .join('\n');
    } else if (children instanceof Object)
      return prettier.format(ReactDOMServer.renderToString(children), {
        parser: 'babel',
        plugins: [prettierPlugins],
      });
    return children;
  }, [children]);

  return (
    <div className='installation w-full relative prose max-w-none my-2'>
      <Highlight {...defaultProps} code={text} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, position: 'relative', overflowX: 'hidden' }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
            <div
              className='copy'
              onClick={() => {
                if (copy(text)) {
                  alert(`copy '${text}' to clipboard`);
                }
              }}
            >
              <svg
                fill='none'
                stroke='currentColor'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
                className='w-6 h-6'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184'
                />
              </svg>
            </div>
          </pre>
        )}
      </Highlight>
    </div>
  );
};
export default Installation;
