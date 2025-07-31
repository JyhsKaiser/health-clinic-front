import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Eliminamos useLocation si no se usa


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';

import styles from './styles/RegisterPage.module.css';
import picLogin from './assets/Register/picLogin.png';
import MyVerticallyCenteredModal from '../components/MyVerticallyCenteredModal';
import NavbarHome from '../components/NavBarComp.jsx';
import AuthService from '../api/services/AuthService.js'; // Asegúrate de que la ruta sea correcta

const Registerpage = () => {
    const navigate = useNavigate();

    // --- 1. Estados para los campos del formulario (Inputs Controlados) ---
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // --- 2. Estados para la UI y Feedback al Usuario ---
    const [modalShow, setModalShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // Estado para el checkbox de política de privacidad
    const [loading, setLoading] = useState(false); // Estado para indicar carga (petición en curso)
    const [formErrors, setFormErrors] = useState({}); // Estado para errores de validación del cliente
    const [apiError, setApiError] = useState(''); // Estado para errores devueltos por la API
    const [successMessage, setSuccessMessage] = useState(''); // Estado para mensaje de éxito



    // Función para manejar el "Are you agree?" en el modal
    const handleAgree = () => {
        setIsChecked(true); // Marca el checkbox
        setModalShow(false); // Cierra el modal
    };

    // Función para manejar el "Cancel" en el modal
    const handleCancel = () => {
        setIsChecked(false); // Desmarca el checkbox
        setModalShow(false); // Cierra el modal
    };
    // Esta función maneja cuando el usuario interactúa directamente con el checkbox
    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setModalShow(true); // Abre el modal si se intenta marcar
        } else {
            setIsChecked(false); // Desmarca si se desmarca manualmente
        }
    };
    // --- 5. Función de Validación del Formulario (Cliente) ---
    const validateForm = () => {
        const errors = {};
        if (!name.trim()) errors.name = 'El nombre es obligatorio.';
        if (!lastName.trim()) errors.lastName = 'El apellido es obligatorio.';
        if (!email.trim()) errors.email = 'El correo electrónico es obligatorio.';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'El formato del correo electrónico es inválido.'; // Validación de formato de email
        if (!password) errors.password = 'La contraseña es obligatoria.';
        else if (password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres.'; // Mínimo 6 caracteres
        if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
        if (!isChecked) errors.terms = 'Debes aceptar la política de privacidad.'; // Validar checkbox

        setFormErrors(errors); // Actualiza el estado de errores
        return Object.keys(errors).length === 0; // Retorna true si no hay errores
    };

    // --- 6. Función de Envío del Formulario (handleSubmit) ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el envío del formulario por defecto del navegador

        setApiError(''); // Limpia errores de API anteriores
        setSuccessMessage(''); // Limpia mensajes de éxito anteriores
        setFormErrors({}); // Limpia errores de validación anteriores

        // Realiza la validación del cliente
        if (!validateForm()) {
            return; // Detiene el envío si la validación falla
        }

        setLoading(true); // Activa el estado de carga

        try {
            // Llama a tu servicio de autenticación para registrar al usuario
            const result = await AuthService.register({
                name,
                lastName,
                email,
                password,
                // Asegúrate de que tu backend no necesite 'confirmPassword'
                // Si tu backend necesita el rol, agrégalo aquí (ej. role: 'PATIENT')
            });

            if (result.success) {
                setSuccessMessage(result.message || '¡Registro exitoso! Ahora puedes iniciar sesión.');
                // Opcional: Limpiar el formulario después del éxito
                setName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setIsChecked(false);
                // Redirigir al usuario a la página de login después de un breve retraso
                setTimeout(() => {
                    navigate('/login'); // Asegúrate de tener react-router-dom configurado
                }, 2000); // Redirige después de 2 segundos
            } else {
                // Muestra el error devuelto por la API
                setApiError(result.error || 'El registro falló. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error de API en el registro:', error);
            // Muestra un mensaje de error genérico si hay un error inesperado de red/API
            setApiError('Ocurrió un error inesperado durante el registro. Por favor, verifica tu conexión.');
        } finally {
            setLoading(false); // Desactiva el estado de carga
        }
    };

    return (
        <>
            <NavbarHome />
            <div className={styles.container}>
                <Form className={styles.form} onSubmit={handleSubmit}>
                    <Container className={styles.imageContainer}>
                        <Row>

                            <Col xs={6} md={4}>
                                <Image src={picLogin} roundedCircle className={styles.image} />
                            </Col>

                        </Row>
                    </Container>
                    {/* --- Campos del Formulario (con Inputs Controlados y Validación) --- */}
                    <Form.Group className={`mb-3`} >
                        <Row xs={1} md={2} lg={2} >
                            <Col className={` ${styles.col} `}>
                                <Form.Label >Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className={styles.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.name}
                                </Form.Control.Feedback>
                            </Col>
                            <Col className={` ${styles.col}`}>
                                <Form.Label >Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                    className={styles.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.lastName}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-3 " controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!formErrors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.email}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!formErrors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="passwordConfirm">
                        <Form.Label>Confirm your password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            isInvalid={!!formErrors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="By registering, you accept our privacy policy."
                            checked={isChecked} // Controla el estado del checkbox
                            onChange={handleCheckboxChange} // Nuevo manejador para el checkbox
                            isInvalid={!!formErrors.terms} // Muestra error si no está marcado

                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.terms}
                        </Form.Control.Feedback>

                    </Form.Group>

                    {/* --- Mensajes de Error y Éxito --- */}
                    {apiError && <p style={{ color: 'red' }} className="mt-3">{apiError}</p>}
                    {successMessage && <p style={{ color: 'green' }} className="mt-3">{successMessage}</p>}

                    <Button
                        variant="primary"
                        type='submit'
                        className={styles.submitButton}
                        disabled={loading} // Deshabilita el botón durante la carga

                    >
                        {/* Submit */}
                        {loading ? 'Registering...' : 'Register'}

                    </Button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)} // Permite cerrar el modal con el botón de cerrar (x) o haciendo clic fuera
                        onAgree={handleAgree}   // Pasa la función para "Are you agree?"
                        onCancel={handleCancel} // Pasa la función para "Cancel"
                    />
                </Form>
            </div >
        </>
    );
}
export default Registerpage;