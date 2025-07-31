import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import * as formik from 'formik';
import * as yup from 'yup';

import NavbarPatient from '../../components/NavBarPatient.jsx';
import styles from './styles/MenuPatientSchedule.module.css';
import ApiService from '../../api/services/ApiService.js';


// --- Datos simulados (sustituir por tus llamadas a API/DB) ---
const medicosPorEspecialidad = {
    '1': [
        { id: '1', name: 'Dr. Juan (Oncología)', office: 'Medical office A-101' },
        { id: '4', name: 'Dra. Laura (Oncología)', office: 'Medical office A-102' }
    ],
    '2': [
        { id: '2', name: 'Dr. Pepe (Pediatría)', office: 'Medical office B-205' }
    ],
    '3': [
        { id: '3', name: 'Dr. Lalo (Medicina General)', office: 'Medical office C-303' }
    ],
};

const occupiedHoursFromDB = {
    '2025-07-15': ['09:00', '11:00', '13:00'],
    '2025-07-16': ['08:00', '10:00'],
    '2025-07-21': ['10:00'],
};
// --- Fin datos simulados ---

const MenuPatientSchedule = () => {
    const { Formik } = formik;

    const [availableHours, setAvailableHours] = useState([]);
    // const [assignedOffice, setAssignedOffice] = useState(''); // Estado para la oficina asignada
    const [loadingHours, setLoadingHours] = useState(false);
    const [medicsForSelectedSpecialty, setMedicsForSelectedSpecialty] = useState([]);
    const [loadingMedics, setLoadingMedics] = useState(false);

    const [patientData, setPatientData] = useState({
        id: '',
        name: '',
        lastName: '',
        email: '',
    });

    const schema = yup.object().shape({
        specialty: yup.string()
            .oneOf(['1', '2', '3'], 'Please, choose a valid specialty') // Valida que el valor sea uno de los options válidos
            .required('Select a specialty'),
        medic: yup.string()
            .oneOf(['1', '2', '3', '4'], 'Please, choose a valid medic') // Valida que el valor sea uno de los options válidos
            .required('Select a doctor'),

        office: yup.string()
            .required('Office is required'),
        date: yup.date()
            .required('Select a date')
            .nullable() // Importante para date inputs que pueden iniciar vacíos
            .typeError('Por favor, introduce una fecha válida'),
        hour: yup.string()
            .required('Select an hour for the appointment')
            .matches(/^(0[7-9]|1[0-6]):00$/, 'Formato de hora incorrecto o fuera de rango (7 AM - 4 PM en punto).'),
        reason: yup.string().required('Please, enter a reason for the appointment'),
        additionalInfo: yup.string()
            .max(500, 'Additional information must be less than 500 characters'),
        clinicalAnalysis: yup
            .array() // Esperamos un array de archivos
            .min(1, 'Debes seleccionar al menos un archivo de análisis clínico.') // Mensaje si no se selecciona ninguno
            .max(3, 'Solo puedes subir un máximo de 5 archivos.') // Opcional: Límite máximo de archivos
            .nullable() // Permite que el valor inicial sea null o un array vacío
            .of( // Esto es para validar cada elemento dentro del array
                yup.mixed()
                    .test(
                        'fileSize',
                        'Algunos archivos son demasiado grandes. El tamaño máximo permitido es 5MB por archivo.',
                        (value) => {
                            // value aquí es un objeto File individual
                            return value && value.size <= 5 * 1024 * 1024; // 5 MB
                        }
                    )
                    .test(
                        'fileType',
                        'Algunos archivos tienen un tipo no permitido. Solo se aceptan PDF e imágenes (JPG, PNG).',
                        (value) => {
                            // value aquí es un objeto File individual
                            return value && ['application/pdf', 'image/jpeg', 'image/png'].includes(value.type);
                        }
                    )
            )
            // Opcional: una validación final para el array si quieres comprobar que *todos* los elementos pasen las pruebas
            .test(
                'allFilesValid',
                'Uno o más archivos seleccionados no cumplen los requisitos de tamaño o tipo.',
                (value) => {
                    // Si el array está vacío o no existe, asumimos que la validación .min() lo manejará.
                    if (!value || value.length === 0) return true;

                    // Comprueba si CADA archivo en el array pasa las pruebas de tamaño y tipo.
                    // Las pruebas individuales '.of()' ya marcan errores, pero esta es una capa extra
                    // si quieres un mensaje general si algún archivo falla.
                    return value.every(file =>
                        file.size <= 5 * 1024 * 1024 &&
                        ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)
                    );
                }
            ),

        terms: yup.bool().required().oneOf([true], 'terms must be accepted'),
    });

    // --- Lógica para generar y filtrar horas ---
    useEffect(() => {

        const fetchPatientData = async () => {
            const patientId = localStorage.getItem('patientId');
            const patientData = await ApiService.getPatientData(patientId); // Aqui traemos TODOS los datos de nuestro paciente
            localStorage.setItem('email', patientData.data.email);
            const patientName = patientData.data.name + ' ' + patientData.data.lastName;
            // console.log('Nombre del paciente:', patientName);
            localStorage.setItem('patientName', patientName);

            setPatientData({
                id: patientData.data.id,
                name: patientData.data.name,
                lastName: patientData.data.lastName,
                email: patientData.data.email,
            });
        };

        // Función para obtener horas disponibles basada en la fecha seleccionada
        // Simula una llamada a API/BD
        const fetchAvailableHours = async (selectedDate) => {
            setLoadingHours(true);
            // Simula un retardo de red
            // const response = await ApiClient.
            await new Promise(resolve => setTimeout(resolve, 500));

            const allPossibleHours = [];
            for (let hour = 7; hour <= 16; hour++) { // De 7 AM a 4 PM (16:00)
                allPossibleHours.push(`${String(hour).padStart(2, '0')}:00`);
            }

            // --- SIMULACIÓN DE DATOS OCUPADOS DE LA BASE DE DATOS ---
            // En un caso real, harías una llamada API a tu backend
            // que te devolvería las horas *ocupadas* para la `selectedDate`
            const occupiedHoursFromDB = {
                '2025-07-15': ['09:00', '11:00', '13:00'], // Horas ocupadas para el 15 de julio
                '2025-07-16': ['08:00', '10:00'], // Horas ocupadas para el 16 de julio
                // ... más fechas y sus horas ocupadas
            };

            const dateKey = selectedDate; // La fecha en formato YYYY-MM-DD
            const occupiedForSelectedDate = occupiedHoursFromDB[dateKey] || [];

            // Filtra las horas disponibles
            const filteredHours = allPossibleHours.filter(hour =>
                !occupiedForSelectedDate.includes(hour)
            );
            console.log('Horas disponibles:', filteredHours);
            setAvailableHours(filteredHours);
            setLoadingHours(false);
        };

        // Llamar a fetchAvailableHours cuando el componente se monte o cuando la fecha cambie
        // (inicialmente se puede llamar con una fecha predeterminada o vacía)
        // Para este ejemplo, lo haremos en el onChange del campo de fecha de Formik
        // y lo pasaremos al useEffect.
        fetchPatientData();
    }, []); // El useEffect se ejecutará solo una vez al montar,
    // pero la función `fetchAvailableHours` será llamada desde Formik.

    return (
        <>
            <NavbarPatient />

            <div className={styles.formikContainer}>
                <h1 className={styles.title}><FontAwesomeIcon icon={faCalendarDays} bounce size='2xl' />
                    Schedule an appointment</h1>
                <Formik
                    validationSchema={schema}
                    onSubmit={(values, { setSubmitting }) => {
                        // Lógica para enviar el formulario
                        console.log('Valores del formulario:', values);
                        alert('Formulario enviado! Consulta la consola para ver los valores.');
                        setSubmitting(false);
                    }}
                    initialValues={{
                        specialty: '',
                        medic: '',
                        office: '', // Asignación predeterminada de oficina
                        date: "", // Formatea la fecha actual como YYYY-MM-DD
                        hour: '',
                        reason: '',
                        terms: false,
                    }}
                >
                    {({ handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            {/* -------------------- FIRST ROW ----------------- */}
                            <Row className="mb-3">

                                {/* --------------- SPECIALTY FIELD ---------------- */}
                                <Form.Group as={Col} md="4" controlId="validationFormikSpecialty" className="position-relative">
                                    <FloatingLabel controlId="floatingSelectSpecialty" label="Specialty">
                                        <Form.Select
                                            aria-label="Select a specialty"
                                            name="specialty"
                                            value={values.specialty}
                                            onChange={async (e) => {
                                                handleChange(e); // Actualiza la especialidad en Formik
                                                const selectedSpecialtyId = e.target.value;

                                                // Restablece todos los campos dependientes
                                                setFieldValue('medic', '');
                                                setFieldValue('date', '');
                                                setFieldValue('hour', '');
                                                setFieldValue('office', ''); // <-- Resetea la oficina también
                                                setAvailableHours([]); // Limpia horas disponibles
                                                setMedicsForSelectedSpecialty([]); // Limpia médicos

                                                if (selectedSpecialtyId) {
                                                    setLoadingMedics(true);
                                                    await new Promise(resolve => setTimeout(resolve, 300)); // Simula API call
                                                    setMedicsForSelectedSpecialty(medicosPorEspecialidad[selectedSpecialtyId] || []);
                                                    setLoadingMedics(false);
                                                }
                                            }}
                                            onBlur={handleBlur}
                                            isInvalid={touched.specialty && !!errors.specialty}
                                            isValid={touched.specialty && !errors.specialty}
                                        >
                                            <option value="">Select a specialty</option>
                                            <option value="1">Oncología</option>
                                            <option value="2">Pediatría</option>
                                            <option value="3">Medicina General</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.specialty}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                {/* --------------- MEDIC FIELD ---------------- */}
                                <Form.Group as={Col} md="4" controlId="validationFormikMedic" className="position-relative">
                                    <FloatingLabel controlId="medicId" label="Doctor">
                                        <Form.Select
                                            aria-label="Select a doctor"
                                            name="medic"
                                            value={values.medic}
                                            onChange={async (e) => {
                                                handleChange(e); // Actualiza el médico en Formik
                                                const selectedMedicId = e.target.value;

                                                // Resetea fecha y hora
                                                setFieldValue('date', '');
                                                setFieldValue('hour', '');
                                                setAvailableHours([]);

                                                if (selectedMedicId) {
                                                    // Encuentra el médico seleccionado para obtener su consultorio
                                                    const medic = medicosPorEspecialidad[values.specialty]?.find(m => m.id === selectedMedicId);
                                                    if (medic && medic.office) {
                                                        setFieldValue('office', medic.office); // <-- Establece el valor del consultorio
                                                    } else {
                                                        setFieldValue('office', 'Unassigned medical office'); // Mensaje si no se encuentra
                                                    }
                                                } else {
                                                    setFieldValue('office', ''); // Limpia el campo de consultorio si no hay médico
                                                }
                                            }}
                                            onBlur={handleBlur}
                                            isInvalid={touched.medic && !!errors.medic}
                                            isValid={touched.medic && !errors.medic}
                                            disabled={!values.specialty || loadingMedics}
                                        >
                                            <option value="">
                                                {loadingMedics
                                                    ? 'Loading doctors...'
                                                    : values.specialty
                                                        ? 'Select a doctor'
                                                        : 'First choose a specialty'}
                                            </option>
                                            {medicsForSelectedSpecialty.map(medico => (
                                                <option key={medico.id} value={medico.id}>{medico.name}</option>
                                            ))}
                                        </Form.Select>
                                        {/* {loadingMedics && (
                                            <div style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)' }}>
                                                <Spinner animation="border" size="sm" />
                                            </div>
                                        )} */}
                                        <Form.Control.Feedback type="invalid">{errors.medic}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                {/* --------------- OFFICE FIELD (Ahora se llena dinámicamente) ---------------- */}
                                <Form.Group as={Col} md="4" controlId="validationFormikOffice" className="position-relative">
                                    <FloatingLabel controlId="officeInput" label="Assigned medical office">
                                        <Form.Control
                                            type="text"
                                            name="office" // <-- Es importante que tenga un 'name' para que Formik lo maneje
                                            value={values.office} // <-- Vinculado al estado de Formik
                                            disabled // <-- Sigue deshabilitado
                                            readOnly // <-- Propiedad para asegurar que no se edite
                                        // No necesita onChange/onBlur porque es de solo lectura y el valor se setea con setFieldValue
                                        // isInvalid={touched.office && !!errors.office} // Si quieres validación, deja estas líneas
                                        // isValid={touched.office && !errors.office}
                                        />
                                        {/* <Form.Control.Feedback type="invalid">{errors.office}</Form.Control.Feedback> */}
                                        {/* Si necesitas feedback de validación para este campo aunque sea disabled/readOnly */}
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            {/* -------------------- SECOND ROW ----------------------- */}
                            <Row className="mb-3">
                                {/* ---------------- CALENDAR ------------------ */}
                                <Form.Group as={Col} md="4" controlId="validationFormikDate" className="position-relative">
                                    <FloatingLabel controlId="dateId" label="Appointment  date">
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={values.date}
                                            onChange={async (e) => {
                                                handleChange(e); // Primero actualiza el valor de la fecha en Formik
                                                const selectedDate = e.target.value;

                                                // Siempre resetear la hora cuando la fecha cambia
                                                setFieldValue('hour', '');
                                                setAvailableHours([]); // Limpia las horas mostradas

                                                if (selectedDate) {
                                                    setLoadingHours(true);
                                                    await new Promise(resolve => setTimeout(resolve, 500)); // Simula retardo de API
                                                    const allPossibleHours = [];
                                                    for (let hour = 7; hour <= 16; hour++) {
                                                        allPossibleHours.push(`${String(hour).padStart(2, '0')}:00`);
                                                    }
                                                    const dateKey = selectedDate;
                                                    const occupiedForSelectedDate = occupiedHoursFromDB[dateKey] || [];
                                                    const filteredHours = allPossibleHours.filter(hour => !occupiedForSelectedDate.includes(hour));
                                                    setAvailableHours(filteredHours);
                                                    setLoadingHours(false);
                                                }
                                            }}
                                            onBlur={handleBlur}
                                            isInvalid={touched.date && !!errors.date}
                                            isValid={touched.date && !errors.date}
                                            disabled={!values.medic} // Deshabilitar si no se ha elegido médico
                                        />
                                    </FloatingLabel>
                                    <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                                </Form.Group>

                                {/* ----------------- AVAILABLE HOURS ------------------ */}
                                <Form.Group as={Col} md="4" controlId="availableHoursId" className="position-relative">
                                    <FloatingLabel controlId="availableHoursSelect" label="Available hours">
                                        <Form.Select
                                            name="hour"
                                            value={values.hour}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.hour && !!errors.hour}
                                            isValid={touched.hour && !errors.hour}
                                            disabled={loadingHours || !values.date} // Deshabilitar si está cargando o no se ha elegido fecha
                                        >
                                            <option value="">
                                                {loadingHours
                                                    ? 'Cargando horas...'
                                                    : values.date
                                                        ? 'Select an hour'
                                                        : 'First select a date'}
                                            </option>
                                            {availableHours.map(hour => (
                                                <option key={hour} value={hour}>
                                                    {hour}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        {/* {loadingHours && (
                                            <div style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)' }}>
                                                <Spinner animation="border" size="sm" />
                                            </div>
                                        )} */}
                                        <Form.Control.Feedback type="invalid">{errors.hour}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>

                                {/* ----------------- REASON FIELD ------------------ */}
                                <Form.Group as={Col} md="4" controlId="validationFormikReason" className="position-relative">
                                    <FloatingLabel controlId="reasonId" label="Reason for the Appointment">
                                        <Form.Select
                                            aria-label="Choose a reason"
                                            name="reason"
                                            value={values.reason}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.reason && !!errors.reason}
                                            isValid={touched.reason && !errors.reason}
                                        >
                                            <option value="">Choose a reason</option>
                                            <option value="1">Consulta de seguimiento</option>
                                            <option value="2">Primera consulta</option>
                                            <option value="3">Revisión de resultados</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">{errors.reason}</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            { /* -------------------- THIRD ROW ----------------------- */}
                            <Row>
                                {/* ----------------- ADDITIONAL INFORMATION FIELD ------------------ */}
                                <Form.Group as={Col} controlId="infoAddId" md='6'>

                                    <FloatingLabel controlId="addInforId" label="Additional information">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Leave a comment here"
                                            name="additionalInfo"
                                            value={values.additionalInfo}
                                            onChange={handleChange}
                                            // onBlur={handleBlur}
                                            isValid={touched.reason && !errors.reason}
                                            style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                {/* ---------------- CLINICAL ANALYSIS ------------------ */}
                                <Form.Group as={Col} controlId="formClinicalAnalysis" md='6'>
                                    <Form.Control
                                        type="file"
                                        multiple // Permite la selección de múltiples archivos
                                        name="clinicalAnalysis" // IMPORTANTE: El nombre debe coincidir con el esquema Yup e initialValues
                                        onChange={(event) => {
                                            const files = event.currentTarget.files;
                                            const fileArray = Array.from(files); // Convierte FileList a Array de File
                                            setFieldValue("clinicalAnalysis", fileArray); // Actualiza el estado de Formik con el array de archivos
                                            handleBlur(event); // Marca el campo como 'touched' para que la validación se active
                                        }}
                                        isInvalid={touched.clinicalAnalysis && !!errors.clinicalAnalysis}
                                    // isValid={touched.clinicalAnalysis && !errors.clinicalAnalysis}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.clinicalAnalysis}
                                    </Form.Control.Feedback>

                                </Form.Group>


                            </Row>
                            <div className={styles.buttonContainer}>
                                {/* ---------------- TERMS AND CONDITIONS ------------------ */}
                                <Form.Group className="position-relative mb-3">
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="Agree to terms and conditions"
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        feedbackType="invalid"
                                        id="validationFormik106"
                                        style={{ fontWeight: 'bold' }}
                                        feedbackTooltip

                                    />
                                </Form.Group>
                                {/* ---------------- SUBMIT BUTTON ------------------ */}
                                <Button type="submit" >Submit form</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default MenuPatientSchedule;