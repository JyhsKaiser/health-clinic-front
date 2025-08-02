import React, { useState, useEffect } from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button.js';


import NavbarPatient from './NavBarPatient.jsx';
import styles from './styles/PatientProfileComp.module.css';
import ApiService from '../api/services/ApiService.js';

const PatientProfileComp = () => {

    const [patientData, setPatientData] = useState({}); // Estado para los datos del paciente

    useEffect(() => {
        // Aquí puedes hacer la llamada a la API para obtener los datos del paciente
        const fetchPatientData = async () => {
            try {
                const patientId = localStorage.getItem('patientId');
                const data = await ApiService.getPatientData(patientId);
                setPatientData(data);
            } catch (error) {
                console.error('Error al obtener los datos del paciente:', error);
            }
        };

        fetchPatientData();
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

    console.log('Nombre del paciente con useState:', patientData.data.name);

    return (
        <>
            <NavbarPatient />
            <Container className={styles.container}>
                <Container>
                    <h4>Contact Information</h4>
                    <hr className={styles.bar} />
                </Container>
                <Row xs={1} md={2} lg={4}>  {/* xs, md, lg: sirve para determinar el numero de espacios en los elementos de acuerdo al tamaño de la pantalla*/}
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Phone"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>
                    </Col>
                    <Col>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>

                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Address"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>
                    </Col>
                </Row>

                <Container>
                    <h4>Phenotype</h4>
                    <hr className={styles.bar} />
                </Container>
                <Row xs={1} md={2} lg={3}>  {/* xs, md, lg: sirve para determinar el numero de espacios en los elementos de acuerdo al tamaño de la pantalla*/}
                    <Col>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Sex"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Weight"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingSelect"
                            label="Blood type"
                            className="mb-3"
                        >
                            <Form.Select aria-label="Floating label select example" disabled>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Age"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Height"
                            className="mb-3"

                        >
                            <Form.Control type="text" placeholder="name@example.com" disabled />
                        </FloatingLabel>
                    </Col>
                </Row >

                <div className={styles.buttons}>
                    <Button variant="primary" className={`mb-3 ${styles.button}`} >
                        Edit Profile
                    </Button>


                    <Button variant="success" className={`mb-3 ${styles.button}`} disabled>
                        Save Profile
                    </Button>

                </div>

            </Container >
        </>
    );
}

export default PatientProfileComp;