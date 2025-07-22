import Table from 'react-bootstrap/Table';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import NavbarPatient from '../../components/NavBarPatient.jsx';
import styles from './styles/MenuPatientHistory.module.css';
import TablePatients from './components/TableAppointmentHistory.jsx';


const MenuPatientHistory = () => {


    const appointments = [
        { id: 1, specialty: 'Cardiology', doctor: 'Dr. Smith', doctorsOffice: 'Room 101', date: '2023-10-01', hour: '10:00 AM', reason: 'Checkup' },
        { id: 2, specialty: 'Dermatology', doctor: 'Dr. Brown', doctorsOffice: 'Room 102', date: '2023-10-02', hour: '11:00 AM', reason: 'Skin rash' },
        { id: 3, specialty: 'Pediatrics', doctor: 'Dr. Green', doctorsOffice: 'Room 103', date: '2023-10-03', hour: '12:00 PM', reason: 'Vaccination' },
    ];

    const handleDelete = (id) => {
        console.log(`Delete appointment with id: ${id}`);
    };

    const handleEdit = (id) => {
        console.log(`Edit appointment with id: ${id}`);
    };

    return (
        <>

            <NavbarPatient />

            <div className={styles.container}>
                <div className={styles.searchContainer}>
                    <FloatingLabel controlId="dateId" label="Appointment  date">
                        <Form.Control
                            type="date"
                            placeholder="Select date"
                            className={styles.inputDate}
                        />
                    </FloatingLabel>
                    <Button variant="primary">Find an appointment</Button>
                </div>
                <TablePatients
                    appointments={appointments}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    styles={styles}
                />
            </div>
        </>
    );
}

export default MenuPatientHistory;
