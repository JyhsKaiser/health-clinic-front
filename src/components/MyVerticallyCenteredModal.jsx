import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            modalshow={props.modalshow}  // Use the modalShow prop to control visibility
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>{props.subtitle}</h5>
                <p>
                    {props.text}
                </p>
            </Modal.Body>
            <Modal.Footer>
                {/* Llama a la función `onCancel` pasada por props */}
                <Button onClick={props.onCancel} style={{ background: "red" }}>Cancel</Button>
                {/* Llama a la función `onAgree` pasada por props */}
                <Button onClick={props.onSubmit}>I'm agree</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;