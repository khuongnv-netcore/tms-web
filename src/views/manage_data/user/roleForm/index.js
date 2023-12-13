import React from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { CustomFormModal } from "../../../../modules";
import { useForm } from 'react-hook-form'
import { ValidationForm, TextFieldWithValidator, SelectWithValidator } from "../../../../modules/validatorComponent";
import { useTranslation } from "react-i18next";
import { common } from "../../../../constants";

const RoleForm = (props) => {
    const { isShowModal, handleShowModal, roleData, title, handleUpdateRole } = props
    const { t, i18n } = useTranslation();

    const defaultValues = React.useMemo(
        () => ({
            displayName: roleData?.displayName || "",
            roleType: roleData?.roleType || "User",
        }), [roleData]
    );

    const roleForm = useForm({defaultValues, shouldUnregister: false})

    React.useEffect(() => {
        roleForm.reset(defaultValues);
    }, [defaultValues]);

    const handleSubmit = async (formData) => {
        const isValid = await roleForm.trigger();
        if (isValid) {
            handleUpdateRole(formData)
        }
    }

    return (
        <>
            <CustomFormModal
                isOpen={isShowModal} 
                setBasicModal={(isModalOpen) => handleShowModal(isModalOpen)} 
                title={title}
            >
                <ValidationForm 
                    formContext={roleForm}
                    onSubmit={(values) => handleSubmit(values)}
                    primaryButtonText={t('modal.primary_button_text')}
                >
                    <SelectWithValidator 
                        name='roleType'
                        id='roleType'
                        label={t('user.Role.form_type_list')}
                        defaultvalues={roleForm.getValues("roleType")}
                        value={roleForm.watch("roleType")}
                        onChange={(e) => roleForm.setValue("roleType", e.target.value) }
                        options={common.RoleType}
                        errors={roleForm.errors.roleType}
                        invalid={roleForm.errors.roleType && true}
                        innerRef={roleForm.register({ required: { value: true, message: `${t('user.Role.invalid_role_type')}` }})}
                    />

                    <TextFieldWithValidator
                        name='displayName'
                        id='displayName'
                        label={t('user.Role.form_name')}
                        innerRef={roleForm.register({ required: {value: true, message: `${t('user.Role.invalid_name')}`} })}
                        errors={roleForm.errors.displayName}
                        invalid={roleForm.errors.displayName && true}
                        value={roleForm.watch("displayName")}
                    />

                </ValidationForm>
            </CustomFormModal>
        </>
    )
}

export default RoleForm;
