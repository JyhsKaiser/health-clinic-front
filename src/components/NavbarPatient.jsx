import React from 'react'; // Necesitas React para usar hooks
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaUserAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';


import style from './styles/NavbarPatient.module.css';

function NavbarPatient() {
    // Obtener la ubicación actual para aplicar la clase activa
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? style.active : '';
    // Puedes usar isActive para aplicar estilos condicionales a los enlaces si es necesario
    // Por ejemplo, si quieres aplicar una clase activa a los enlaces:
    const isActiveSchedule = isActive('/menupatient/schedule');
    const isActiveHistory = isActive('/menupatient/medicalhistory');
    return (
        <div className={style.navbar}>
            <Navbar expand="lg" className="bg-body-tertiary ">
                <Container>
                    <Navbar.Brand ><h3 className={style.title} >Health Center</h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                        </Nav>

                        <Nav className='d-flex'>
                            {/* <Nav.Link href="/">Home</Nav.Link> */}
                            <Nav.Link
                                as={NavLink} // Importante: usa as={NavLink}
                                to="/menupatient/schedule"
                                className={`${style.link} ${isActiveSchedule}`}
                            // NavLink automáticamente añade la clase 'active'
                            // Puedes personalizar la clase activa si es necesario con activeClassName (aunque está obsoleto en v6, Bootstrap lo maneja bien)
                            // O usar isActive si necesitas lógica más compleja
                            >
                                Schedule an appointment
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/menupatient/medicalhistory"
                                className={`${style.link} ${isActiveHistory}`}>
                                Appointment history
                            </Nav.Link>
                        </Nav>

                        <Nav className="me-auto">
                        </Nav>
                        <div className={style.userSection}>
                            <FontAwesomeIcon icon={faUser} className={style.iconUser} />
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Jovani H. Sánchez"
                                menuVariant="dark"
                                className={style.dropdown}
                            >


                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/">
                                    Log out
                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    as={NavLink}
                                    to="/patient/profile">
                                    Profile
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </div >
    );
}

export default NavbarPatient;