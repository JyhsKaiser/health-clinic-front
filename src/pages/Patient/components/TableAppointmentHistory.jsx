
const TablePatients = ({ appointments, onDelete, onEdit, styles }) => {
    return (
        <div className={styles.tableContainer}>
            <table className={`table table-striped ${styles.table}`}>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th></th>
                        {/* Oculta Specialty en pantallas muy pequeñas (<576px) */}
                        <th className="d-none d-sm-table-cell">Specialty</th>
                        <th>Doctor</th>
                        {/* Oculta Doctor's Office en pantallas pequeñas y muy pequeñas (<768px) */}
                        <th className="d-none d-md-table-cell">Doctor's Office</th>
                        <th>Date</th>
                        {/* Oculta Hour en pantallas muy pequeñas (<576px) */}
                        <th className="d-none d-sm-table-cell">Hour</th>
                        {/* Oculta Reason en pantallas pequeñas y muy pequeñas (<768px) */}
                        <th className="d-none d-md-table-cell">Reason</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment.id}>
                            {/* <td>{appointment.id}</td> */}
                            <td></td>
                            <td className="d-none d-sm-table-cell">{appointment.specialty}</td>
                            <td>{appointment.doctor}</td>
                            <td className="d-none d-md-table-cell">{appointment.doctorsOffice}</td>
                            <td>{appointment.date}</td>
                            <td className="d-none d-sm-table-cell">{appointment.hour}</td>
                            <td className="d-none d-md-table-cell">{appointment.reason}</td>
                            <td>
                                <button onClick={() => onEdit(appointment.id)} className="btn btn-primary me-2">Edit</button>
                                <button onClick={() => onDelete(appointment.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablePatients;