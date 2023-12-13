import React from "react";
import { CustomFormModal } from "../../../../modules";
import { useForm } from 'react-hook-form'
import { ValidationForm, TextFieldWithValidator } from "../../../../modules/validatorComponent";
import { useTranslation } from "react-i18next";

const RoleForm = (props) => {
    const { isShowModal, handleShowModal, genericData, titleForm, handleUpdateItem } = props
    const { t, i18n } = useTranslation();

    const defaultValues = React.useMemo(
        () => ({
            id: genericData?.id || "",
            displayName: genericData?.displayName || "",
        }), [genericData]
    );

    const updateForm = useForm({defaultValues, shouldUnregister: false})

    React.useEffect(() => {
        updateForm.reset(defaultValues);
    }, [defaultValues]);

    const handleSubmit = async (formData) => {
        const isValid = await updateForm.trigger();
        if (isValid) {
            handleUpdateItem(formData)
        }
    }

    return (
        <>
            <CustomFormModal
                isOpen={isShowModal} 
                setBasicModal={(isModalOpen) => handleShowModal(isModalOpen)} 
                title={titleForm}
            >
                <ValidationForm 
                    formContext={updateForm}
                    onSubmit={(values) => handleSubmit(values)}
                    primaryButtonText={t('modal.primary_button_text')}
                >

                    <TextFieldWithValidator
                        name='displayName'
                        id='displayName'
                        label={t('displayName')}
                        innerRef={updateForm.register({ required: {value: true, message: `${t('user.Role.invalid_name')}`} })}
                        errors={updateForm.errors.displayName}
                        invalid={updateForm.errors.displayName && true}
                        value={updateForm.watch("displayName")}
                    />

                </ValidationForm>
            </CustomFormModal>
        </>
    )
}

export default RoleForm;