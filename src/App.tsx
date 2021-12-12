import RoutesPage from '../src/routes/public_routes';
import GlobalContext from './context';

function App() {
  return (
    <GlobalContext>
      <RoutesPage />
    </GlobalContext>
  );
}

export default App;
