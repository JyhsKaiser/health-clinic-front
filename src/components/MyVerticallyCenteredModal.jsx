import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            modalShow={props.modalShow}  // Use the modalShow prop to control visibility
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Privacity Policy
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Centered Modal</h5>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure id, sunt neque, reiciendis illum labore ex fugiat blanditiis quos fugit dolorem omnis cumque, harum officia recusandae et illo expedita eos itaque. Nostrum consequatur, sed dicta corrupti dolore eius deserunt libero velit esse, et ex perspiciatis quod harum? Consectetur, aliquam unde eum maiores ullam libero quam iusto similique. Temporibus, tenetur reiciendis error saepe eos esse, perferendis magnam quam quibusdam aspernatur facilis? Molestias nobis placeat, facere voluptatum perferendis perspiciatis iure. Assumenda hic minus natus dicta corrupti quasi, in veritatis pariatur repudiandae impedit maiores voluptate fugit inventore cum soluta enim officia consequatur laborum.
                </p>
            </Modal.Body>
            <Modal.Footer>
                {/* Llama a la función `onCancel` pasada por props */}
                <Button onClick={props.onCancel} style={{ background: "red" }}>Cancel</Button>
                {/* Llama a la función `onAgree` pasada por props */}
                <Button onClick={props.onAgree}>Are you agree?</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;