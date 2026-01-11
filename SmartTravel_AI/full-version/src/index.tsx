import { createRoot } from 'react-dom/client';

// styles
import './index.css';

// project-imports
import App from './App';
import { ConfigProvider } from 'contexts/ConfigContext';
import { TripProvider } from 'contexts/TripContext';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ConfigProvider>
    <TripProvider>
      <App />
    </TripProvider>
  </ConfigProvider>
);

reportWebVitals();
