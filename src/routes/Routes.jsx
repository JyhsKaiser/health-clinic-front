import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa estos

import NavBar from '../components/NavBarComp.jsx'; // Asegúrate de que la ruta sea correcta

import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import MenuPage from '../pages/MenuPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';


function RoutesApp() {
    return (
        <BrowserRouter>
            <NavBar />
            {/* Definimos las rutas de nuestra aplicacion */}
            <Routes>
                {/* Ruta inicial de carga (Home Page) */}
                <Route path="/" element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/menu' element={<MenuPage />} />
                {/* <Route path='/productos/:category' element={<h1>Products List</h1>} /> */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;