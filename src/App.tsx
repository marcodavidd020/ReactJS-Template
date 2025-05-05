import AppProviders from './app/providers/AppProviders';
import AppRouter from './app/routes/AppRouter';
import './styles/base.css';
import './styles/theme.css';

/**
 * Componente principal de la aplicación
 * 
 * Envuelve la aplicación con los providers necesarios
 * y establece el router principal
 */
function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
