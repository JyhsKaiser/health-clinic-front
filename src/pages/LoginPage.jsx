import React from 'react'; // Asegúrate de importar React
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom'; // Eliminamos useLocation si no se usa

import styles from './styles/LoginPage.module.css';
import NavbarHome from '../components/NavBarComp.jsx'; // Asegúrate de que la ruta sea correcta
import AuthService from '../api/services/AuthService.js'; // Asegúrate de que la ruta sea correcta

import picLogin from './assets/Login/picLogin.png'; // Asegúrate de que la ruta sea correcta

/**
 * Componente LoginPage para manejar el formulario de inicio de sesión.
 * Utiliza React-Bootstrap para la UI y Axios (a través de AuthService) para la lógica de autenticación.
 */
const LoginPage = () => {
    // Inicializa el hook de navegación de react-router-dom
    const navigate = useNavigate();

    /**
     * Maneja el envío del formulario de inicio de sesión.
     * @param {Event} e - El evento del formulario.
     */
    const submit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)

        // Obtiene los valores del email y la contraseña del formulario
        const email = e.target.elements.formBasicEmail.value; // Usa el controlId como name
        const password = e.target.elements.formBasicPassword.value; // Usa el controlId como name

        console.log('Email:', email);
        console.log('Password:', password);

        try {
            // Llama al método login de AuthService con las credenciales
            // AuthService.login espera un objeto { email, password }
            const result = await AuthService.login({ email, password });

            // Verifica si el inicio de sesión fue exitoso
            if (result.success) {
                console.log('Inicio de sesión exitoso. Datos de usuario:', result.user);
                // Redirige al usuario a la ruta deseada después del login exitoso
                // En este caso, '/menupatient/schedule'
                navigate('/menupatient/schedule');
            } else {
                // Si el login no fue exitoso, muestra el error
                console.error('Error en el inicio de sesión:', result.error);
                // Aquí deberías integrar un sistema de notificación o modal para mostrar el error al usuario.
                // Por ejemplo: showCustomAlert('Error de inicio de sesión', result.error);
            }
        } catch (error) {
            // Captura cualquier error inesperado (ej. problemas de red, servidor no disponible)
            console.error('Error inesperado durante el inicio de sesión:', error);
            // También muestra un mensaje genérico de error al usuario.
            // Por ejemplo: showCustomAlert('Error', 'Ocurrió un error inesperado. Intenta de nuevo.');
        }
    };

    return (
        <>
            {/* Componente de la barra de navegación superior */}
            <NavbarHome />

            {/* Contenedor principal de la página de login */}
            <div className={styles.container}>
                {/* Formulario de inicio de sesión */}
                <Form className={styles.form} onSubmit={submit}>
                    {/* Contenedor para la imagen de perfil */}
                    <Container className={styles.imageContainer}>
                        <Row>
                            <Col xs={6} md={4}>
                                <Image src={picLogin} roundedCircle className={styles.image} />
                            </Col>
                        </Row>
                    </Container>

                    {/* Campo de Email */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" /> {/* Añadido name="email" */}
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    {/* Campo de Contraseña */}
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" /> {/* Añadido name="password" */}
                    </Form.Group>

                    {/* Checkbox "Check me out" */}
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>

                    {/* Botón de Login */}
                    <Nav>
                        <Button
                            variant="primary"
                            type="submit" // Importante: Este botón es el que envía el formulario
                            className={styles.submitButton}
                        >
                            Login
                        </Button>
                    </Nav>
                </Form>
            </div>
        </>
    );
};

export default LoginPage;
