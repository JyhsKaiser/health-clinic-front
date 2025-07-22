import React, { useState } from 'react';

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

const Registerpage = () => {

    const [modalShow, setModalShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // Nuevo estado para el checkbox

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

    const sendRequest = (e) => {
        e.preventDefault(); // Previene el envío del formulario por defecto
        if (!isChecked) {
            setModalShow(true); // Abre el modal si el checkbox no está marcado
        } else {
            // Aquí puedes manejar el envío del formulario, por ejemplo, hacer una petición a la API
            console.log("Formulario enviado");
        }
    }

    return (
        <>
            <NavbarHome />
            <div className={styles.container}>
                <Form className={styles.form}>
                    <Container className={styles.imageContainer}>
                        <Row>

                            <Col xs={6} md={4}>
                                <Image src={picLogin} roundedCircle className={styles.image} />
                            </Col>

                        </Row>
                    </Container>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                        <Form.Label>Confirm your password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="By registering, you accept our privacy policy."
                            checked={isChecked} // Controla el estado del checkbox
                            onChange={handleCheckboxChange} // Nuevo manejador para el checkbox
                        />
                    </Form.Group>



                    <Button
                        variant="primary"
                        className={styles.submitButton}
                        onClick={sendRequest}
                    >
                        Submit
                    </Button>

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)} // Permite cerrar el modal con el botón de cerrar (x) o haciendo clic fuera
                        onAgree={handleAgree}   // Pasa la función para "Are you agree?"
                        onCancel={handleCancel} // Pasa la función para "Cancel"
                    />
                </Form>
            </div>
        </>
    );
}
export default Registerpage;