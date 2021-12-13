import RoutesPage from '../src/routes/public_routes';
import { StateContextProvider } from './context/state';

function App() {
  return (
    <StateContextProvider>
      <RoutesPage />
    </StateContextProvider>
  );
}

export default App;
