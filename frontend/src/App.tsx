import Plantilla from './components/layout/Plantilla';
import './App.css';

/**
 * Componente raíz de la aplicación.
 *
 * - Es el punto de entrada principal del frontend.
 * - Renderiza el componente Plantilla, que contiene
 *   toda la estructura general (layout, rutas, navegación).
 * - No contiene lógica propia; delega todo el control
 *   en los componentes de layout y contexto.
 */
function App() {
  return (
    <>
      {/* Plantilla principal de la aplicación */}
      <Plantilla />
    </>
  );
}

export default App;