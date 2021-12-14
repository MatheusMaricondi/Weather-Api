import RoutesPage from '../src/routes/public_routes';
import './App.css';
import { StateContextProvider } from './context/state';

const App = () => {
  return (
    <StateContextProvider>
      <RoutesPage />
    </StateContextProvider>
  );
}

export default App;
