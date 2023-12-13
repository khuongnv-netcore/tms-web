import { useTranslation } from "react-i18next";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";


const CustomConfirmModal = (props) => {
    const { isOpen, setBasicModal, title, modalContent, onPrimaryButtonClick, onSecondaryButtonClick } = props;
    const { t, i18n } = useTranslation();

    return (
        <>
            <Modal isOpen={isOpen} backdrop={true} toggle={null}>
                <ModalHeader toggle={() => setBasicModal(!isOpen)}>{title}</ModalHeader>
                <ModalBody>
                    { modalContent }
                </ModalBody>
                <ModalFooter>
                    <Button.Ripple 
                        color='primary'
                        onClick={() => onPrimaryButtonClick()}
                    >
                        {t('confirm_modal.confirm_button')}
                    </Button.Ripple>
                    <Button.Ripple 
                        color='secondary'
                        onClick={() => onSecondaryButtonClick()}
                    >
                        {t('confirm_modal.cancel_button')}
                    </Button.Ripple>
                </ModalFooter>
            </Modal>
        </>
    )

}

export default CustomConfirmModal;
