import Plantilla from './components/layout/Plantilla'
// import { useAuth } from "./context/AuthContext";
// import { useMe } from "./hooks/useMe";
import './App.css'

function App() {
  // const { token, logout } = useAuth();
  // const usuario = useMe();
  return (
    <>
      <Plantilla />
    </>
    
    // <div>
    //   {token ? (
    //     <>
    //       <p>✅ Usuario autenticado</p>
    //       {usuario && <p>Email: {usuario.email}</p>}
    //       <button onClick={logout}>Cerrar sesión</button>
    //       <Plantilla />
    //     </>
    //   ) : (
    //     <>        
    //       <p>❌ Usuario no autenticado</p>
    //       <Plantilla />
    //     </>
    //   )}
    // </div>

  )
}

export default App
