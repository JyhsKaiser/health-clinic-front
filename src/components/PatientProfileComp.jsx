import React, { useState, useEffect } from 'react';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button.js';
import * as yup from 'yup';


import NavbarPatient from './NavBarPatient.jsx';
import styles from './styles/PatientProfileComp.module.css';
import ApiService from '../api/services/ApiService.js';

const PatientProfileComp = () => {

    // 1. Un solo estado para los datos del paciente que vienen de la API
    const [patientData, setPatientData] = useState(null);

    // 2. Un solo estado para los datos del formulario que se pueden editar
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',

        bloodType: '',
        phone: '',
        address: '',
        gender: '',
        weight: '',
        age: '',
        height: '',
        enabled: false,
    });

    // 3. Estados para la lógica de la UI
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingOnce, setIsEditingOnce] = useState(false);
    const [errors, setErrors] = useState({}); // Nuevo estado para los errores de validación

    // 4. useEffect para cargar los datos y poblar el formulario
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const patientId = localStorage.getItem('patientId');
                const response = await ApiService.getPatientData(patientId);

                // 5. Verificamos que la respuesta sea válida
                if (response && response.data) {
                    setPatientData(response.data);
                    // 6. Usamos los datos de la API para inicializar el estado del formulario
                    setFormData({
                        patientId: patientId,
                        name: response.data.name || '',
                        lastName: response.data.lastName || '',
                        email: response.data.email || '',
                        bloodType: response.data.bloodType || '',
                        phone: response.data.phone || '',
                        address: response.data.address || '',
                        gender: response.data.gender || '',
                        weight: response.data.weight || '',
                        age: response.data.age || '',
                        height: response.data.height || '',
                        enabled: response.data.enabled !== undefined ? response.data.enabled : false,
                    });
                }
            } catch (error) {
                console.error('Error al obtener los datos del paciente:', error);
            }
        };

        fetchPatientData();
    }, []);

    // 7. Manejador de cambios para actualizar el estado del formulario
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Limpiamos el error del campo actual al escribir
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: null,
        }));
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditProfile = () => {
        if (formData.enabled) {
            setIsEditing(!isEditing);
            return;
        } else {
            setIsEditingOnce(!isEditingOnce);
            setIsEditing(!isEditing);
        }
        if (isEditing) {
            setErrors({});
        }
    };



    // Si los datos del paciente aún se están cargando
    if (!patientData) {
        return <p>Cargando datos del paciente...</p>;
    }

    // 1. Define el esquema de validación con Yup fuera del componente
    // Esto previene que se re-defina en cada render
    const validationSchema = yup.object().shape({
        bloodType: yup.string().required('El tipo de sangre es obligatorio'),
        phone: yup.string()
            .matches(/^[0-9]{10}$/, "El teléfono debe ser un número de 10 dígitos")
            .required('El teléfono es obligatorio'),
        address: yup.string().required('La dirección es obligatoria'),
        gender: yup.string().required('El sexo es obligatorio'),
        weight: yup.number()
            .typeError('El peso debe ser un número')
            .positive('El peso debe ser un número positivo')
            .required('El peso es obligatorio'),
        age: yup.number()
            .typeError('La edad debe ser un número')
            .positive('La edad debe ser un número positivo')
            .required('La edad es obligatoria'),
        height: yup.number()
            .typeError('La altura debe ser un número')
            .positive('La altura debe ser un número positivo')
            .required('La altura es obligatoria'),
    });
    const handleSaveProfile = async () => {
        try {
            // Validamos los datos con el esquema de Yup
            await validationSchema.validate(formData, { abortEarly: false });

            // Si la validación es exitosa, limpiamos los errores
            setErrors({});

            // Actualiza el estado enabled en formData antes de guardar
            const updatedFormData = { ...formData, enabled: true };

            // const patientId = localStorage.getItem('patientId');
            // console.log('Datos del paciente a actualizar:', updatedFormData);
            await ApiService.patchPatientData(updatedFormData);

            setIsEditing(false);
            setIsEditingOnce(false);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const newErrors = {};
                error.inner.forEach(err => {
                    newErrors[err.path] = err.message;
                });
                setErrors(newErrors); // Actualizamos el estado de errores
            } else {
                console.error('Error al guardar los datos del paciente:', error);
            }
        }
    };

    return (
        <>
            <NavbarPatient />
            <Container className={styles.container}>
                <Container>
                    <h4>Contact Information</h4>
                    <hr className={styles.bar} />
                </Container>
                <Row xs={1} md={1} lg={2}>  {/* xs, md, lg: sirve para determinar el numero de espacios en los elementos de acuerdo al tamaño de la pantalla*/}
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3"

                        >
                            <Form.Control
                                type="text"
                                // placeholder="name@example.com"
                                disabled
                                value={`${formData.name} ${formData.lastName}`}

                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Phone"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name='phone'
                                placeholder="name@example.com"
                                disabled={!isEditing}
                                value={formData.phone}
                                onChange={handleInputChange}
                                isInvalid={!!errors.phone} // Indica si el campo es inválido
                            />
                            {errors.phone && <Form.Text className="text-danger">{errors.phone}</Form.Text>}

                        </FloatingLabel>
                    </Col>
                    <Col>

                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-3"

                        >
                            <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                disabled
                                value={formData.email}
                            />
                        </FloatingLabel>

                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Address"
                            className="mb-3"

                        >
                            <Form.Control
                                type="text"
                                name='address'
                                placeholder="name@example.com"
                                disabled={!isEditing}
                                value={formData.address}
                                onChange={handleInputChange}
                                isInvalid={!!errors.address}
                            />
                            {errors.address && <Form.Text className="text-danger">{errors.address}</Form.Text>}
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
                            <Form.Select
                                aria-label="Floating label select example"
                                disabled={!isEditingOnce}
                                value={formData.gender}
                                name='gender'
                                onChange={handleInputChange}
                                isInvalid={!!errors.gender}
                            >
                                <option value="">Select sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                            {errors.gender && <Form.Text className="text-danger">{errors.gender}</Form.Text>}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Weight (kg)"
                            className="mb-3"

                        >
                            <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                disabled={!isEditing}
                                value={formData.weight}
                                name='weight'
                                onChange={handleInputChange}
                                isInvalid={!!errors.weight}
                            />
                            {errors.weight && <Form.Text className="text-danger">{errors.weight}</Form.Text>}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingSelect"
                            label="Blood type"
                            className="mb-3"
                        >
                            <Form.Select
                                aria-label="Floating label select example"
                                disabled={!isEditingOnce}
                                value={formData.bloodType}
                                name='bloodType'
                                onChange={handleInputChange}
                                isInvalid={!!errors.bloodType}
                            >
                                <option value="">Select blood type</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                            </Form.Select>
                            {errors.bloodType && <Form.Text className="text-danger">{errors.bloodType}</Form.Text>}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Age"
                            className="mb-3"

                        >
                            <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                disabled={!isEditing}
                                value={formData.age}
                                name='age'
                                onChange={handleInputChange}
                                isInvalid={!!errors.age}
                            />
                            {errors.age && <Form.Text className="text-danger">{errors.age}</Form.Text>}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Height (cm)"
                            className="mb-3"

                        >
                            <Form.Control
                                type="text"
                                placeholder="name@example.com"
                                disabled={!isEditing}
                                value={formData.height}
                                name='height'
                                onChange={handleInputChange}
                                isInvalid={!!errors.height}
                            />
                            {errors.height && <Form.Text className="text-danger">{errors.height}</Form.Text>}
                        </FloatingLabel>
                    </Col>
                </Row >

                <div className={styles.buttons}>
                    <Button variant="primary" className={`mb-3 ${styles.button}`} onClick={handleEditProfile}>
                        Edit Profile
                    </Button>


                    <Button variant="success" className={`mb-3 ${styles.button}`} disabled={!isEditing} onClick={handleSaveProfile}>
                        Save Profile
                    </Button>

                </div>

            </Container >
        </>
    );
}

export default PatientProfileComp;