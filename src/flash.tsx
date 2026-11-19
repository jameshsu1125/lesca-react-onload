import { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import OnloadProvider from '.';

/**
 * 顯示閃爍測試頁：
 * 容器背景是紅色，圖片還沒畫出來的那幾個 frame 會露出紅色 → 就是「閃一下」。
 * 圖片在瀏覽器內即時產生（blob URL），不需要網路，每次執行都用全新網址，避免吃到解碼快取。
 */
const SIZES = {
  small: { w: 800, h: 600, label: '小圖 800×600' },
  big: { w: 6000, h: 4000, label: '大圖 6000×4000（約 24MP）' },
} as const;
type SizeKey = keyof typeof SIZES;

const makeBlob = async (w: number, h: number) => {
  const noise = document.createElement('canvas');
  noise.width = 300;
  noise.height = 200;
  const nctx = noise.getContext('2d')!;
  const data = nctx.createImageData(300, 200);
  for (let i = 0; i < data.data.length; i += 4) {
    data.data[i] = Math.random() * 255;
    data.data[i + 1] = Math.random() * 255;
    data.data[i + 2] = Math.random() * 255;
    data.data[i + 3] = 255;
  }
  nctx.putImageData(data, 0, 0);
  const big = document.createElement('canvas');
  big.width = w;
  big.height = h;
  big.getContext('2d')!.drawImage(noise, 0, 0, w, h);
  return new Promise<Blob>((resolve) => big.toBlob((b) => resolve(b!), 'image/jpeg', 0.9));
};

const frame = () => new Promise((r) => requestAnimationFrame(r));

/** 顯示後立刻量測：如果此時 decode() 還要花很久，代表顯示當下圖片尚未解碼完成 → 會空白 */
const measureDecode = async (root: HTMLElement | null) => {
  const img = root?.querySelector('img');
  if (!img) return 0;
  const t = performance.now();
  await img.decode().catch(() => {});
  return performance.now() - t;
};

const App = () => {
  const [size, setSize] = useState<SizeKey>('big');
  const [count, setCount] = useState(3);
  const [urls, setUrls] = useState<string[] | null>(null);
  const [mode, setMode] = useState<'naive' | 'provider'>('provider');
  const [runId, setRunId] = useState(0);
  const [log, setLog] = useState('尚未執行');
  const blobs = useRef<Partial<Record<SizeKey, Blob>>>({});
  const stage = useRef<HTMLDivElement>(null);

  const prepare = async () => {
    setUrls(null);
    setLog('產生圖片中…');
    const { w, h } = SIZES[size];
    blobs.current[size] ??= await makeBlob(w, h);
    // 每次都建立新的 blob URL，避免瀏覽器重用先前的解碼結果
    return Array.from({ length: count }, () => URL.createObjectURL(blobs.current[size]!));
  };

  const runNaive = async () => {
    const list = await prepare();
    setMode('naive');
    setLog('舊方式：Image.onload 之後直接顯示…');
    const t0 = performance.now();
    await Promise.all(
      list.map(
        (url) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.onload = () => resolve();
            image.src = url;
          }),
      ),
    );
    setUrls(list);
    await frame();
    const ms = await measureDecode(stage.current);
    setLog(
      `舊方式：下載 ${Math.round(performance.now() - t0)}ms；顯示當下第一張還要解碼 ${ms.toFixed(0)}ms` +
        `（超過 16ms 約等於閃 ${Math.ceil(ms / 16.7)} 個 frame）`,
    );
  };

  const runProvider = async () => {
    const list = await prepare();
    setMode('provider');
    setLog('OnloadProvider 載入中…');
    setRunId((n) => n + 1);
    setUrls(list);
  };

  return (
    <div>
      <h2>OnloadProvider 顯示閃爍測試</h2>
      <p>
        容器背景是<strong>紅色</strong>。圖片尚未畫出的瞬間會露出紅色（閃一下）。
        兩種方式請各按幾次比較。
      </p>
      <div className='row'>
        <select value={size} onChange={(e) => setSize(e.target.value as SizeKey)}>
          {Object.entries(SIZES).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
        <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
          {[1, 3, 6].map((n) => (
            <option key={n} value={n}>
              {n} 張
            </option>
          ))}
        </select>
      </div>
      <div className='row'>
        <button onClick={runNaive}>A. 舊方式（onload 後直接顯示）</button>
        <button onClick={runProvider}>B. OnloadProvider（目前版本）</button>
      </div>
      <pre>{log}</pre>
      <div className='stage' ref={stage}>
        {urls &&
          (mode === 'naive' ? (
            <div>
              {urls.map((u) => (
                <img key={u} src={u} />
              ))}
            </div>
          ) : (
            <OnloadProvider
              key={runId}
              onStep={({ loaded, total }) => setLog(`OnloadProvider 載入中 ${loaded}/${total}`)}
              onload={async ({ total, failed }) => {
                await frame();
                const ms = await measureDecode(stage.current);
                setLog(
                  `OnloadProvider：全部完成（${total} 張，失敗 ${failed?.length ?? 0}）；` +
                    `顯示當下第一張還要解碼 ${ms.toFixed(0)}ms`,
                );
              }}
            >
              <div>
                {urls.map((u) => (
                  <img key={u} src={u} />
                ))}
              </div>
            </OnloadProvider>
          ))}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
