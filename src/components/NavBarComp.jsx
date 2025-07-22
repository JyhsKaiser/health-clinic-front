import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useLocation } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import style from './styles/NavBarComp.module.css';

function NavBarComp() {
    // const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? style.active : '';
    const isActiveSchedule = isActive('/login');
    const isActiveHistory = isActive('/register');

    return (
        <div className={style.navbar}>
            <Navbar expand="lg" className="bg-body-tertiary ">
                <Container>
                    <Navbar.Brand href="/"><h3 className={style.title} >Health Center</h3></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">

                        </Nav>
                        <Nav className='d-flex'>
                            {/* <Nav.Link href="/">Home</Nav.Link> */}
                            <Nav.Link as={NavLink} to="/login" className={`${style.link} ${isActiveSchedule}`}>
                                Login
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/register" className={`${style.link} ${isActiveHistory}`}>
                                Register
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </div>
    );
}

export default NavBarComp;