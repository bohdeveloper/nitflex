import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'

/**
 * Punto de entrada principal del frontend.
 *
 * - Obtiene el nodo raíz del DOM (div#root).
 * - Inicializa la aplicación React con React 18.
 * - Envuelve la aplicación con AuthProvider para
 *   proporcionar el contexto de autenticación globalmente.
 */
createRoot(document.getElementById('root')!).render(
  <>
    {/* Proveedor global de autenticación */}
    <AuthProvider>
      {/* Componente raíz de la aplicación */}
      <App />
    </AuthProvider>
  </>
)
