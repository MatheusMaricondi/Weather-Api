import RoutesPage from '../src/routes/public_routes';
import { LoadingProvider } from './store/loadingContext';

function App() {
  return (
    <LoadingProvider>
      <RoutesPage />
    </LoadingProvider>
  );
}

export default App;
