import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './app';
import './index.css';

const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  root.render(
    <>
      <App />
      <Toaster position="top-right" />
    </>
  );
} else {
  throw new Error('Could not find root element');
}
