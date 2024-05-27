import { memo, useEffect } from 'react';

const A = memo(() => {
  useEffect(() => {}, []);
  return (
    <div>
      <img src={`https://picsum.photos/id/63/350/300`} />
    </div>
  );
});
export default A;
