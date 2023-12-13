import { React } from 'react'
import { Modal, ModalHeader, ModalBody} from 'reactstrap'

const CustomFormModal = (props) => {
    const { isOpen, children, setBasicModal, title, size } = props;
    return (
        <>
            <Modal 
                isOpen={isOpen} 
                toggle={null}
                className={`modal-dialog-centered ${size}`}
            >
                <ModalHeader toggle={() => setBasicModal(!isOpen)}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </Modal>
        </>
    );
}

export default CustomFormModal;
