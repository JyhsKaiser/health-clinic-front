import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa estos

import NavBar from '../components/NavBarComp.jsx'; // Asegúrate de que la ruta sea correcta

import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import MenuPatient from '../pages/Patient/MenuPatientSchedule.jsx';
import MenuPatientHistory from '../pages/Patient/MenuPatientHistory.jsx';
import PatientProfile from '../components/PatientProfileComp.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';


function RoutesApp() {
    return (
        <BrowserRouter>
            {/* <NavBar /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />

                <Route path='/menupatient/schedule' element={<MenuPatient />} />
                <Route path='/menupatient/medicalhistory' element={<MenuPatientHistory />} />
                <Route path='/patient/profile' element={<PatientProfile />} />
                {/* <Route path='/productos/:category' element={<h1>Products List</h1>} /> */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;