import React, { useEffect } from 'react'; // Asegúrate de importar useEffect
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"; 
import { getUserData } from './api/login';
import CreateLogin from './components/auth/CreateLogin';
import HomeAdmin from './components/layout/HomeAdmin';
import HomeEmpleado from './components/layout/HomeEmple';
import { PrivateRoute } from './components/utils/PrivateRoute';
import { useAuthStore } from './hooks/useAuthStore';
import ShowAdminSugerencias from './components/sugerencias/ShowAdmin';
import ShowSugerencias from './components/sugerencias/showSugerencia';
import ShowMenuAdmin from './components/menu/ShowAdmin';
import ShowMenuEmple from './components/menu/ShowEmpleado';
import VentasComponent from './components/ventas/ShowVentas';


function App(){
  const { isAuth, token, currentUser } = useAuthStore();

  const clearAuth = useAuthStore(
    (state) => state.clearAuth
  );

  const setCurrentUser = useAuthStore(
    (state) => state.setCurrentUser
  );

  const { data: current, isError, isSuccess } = useQuery({
    queryKey: ["current"],
    queryFn: getUserData,
  });

  useEffect(() => {
    if (isError) {
      clearAuth();
    }
    if (isSuccess) {
      setCurrentUser(current, true);
    }
  }, [current, isSuccess, isError]);

  return(
    <div className="App">
      <BrowserRouter>
      
      {isAuth && !!token ? (
        <div>
          {currentUser.Rol === "admin" ? (
            <Routes>
              <Route element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/" element={<HomeAdmin />} />
              <Route path="/sugerencias" element={<ShowAdminSugerencias/>} />
              <Route path="/menus" element={<ShowMenuAdmin/>} />
              <Route path="/ventas" element={<VentasComponent/>} />
              <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route element={<PrivateRoute isAuth={isAuth} />}>
              <Route path="/" element={<HomeEmpleado />} />
              <Route path="/sugerencias" element={<ShowSugerencias/>} />
              <Route path="/menus" element={<ShowMenuEmple/>} />
              <Route path="/ventas" element={<VentasComponent/>} />
              <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          )}
        </div>
      ) : (
        <Routes>
          <Route path='/' element={<CreateLogin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
      </BrowserRouter>
    </div>
  )
}

export default App;
